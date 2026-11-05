import { neon } from '@neondatabase/serverless';
import { json, readJson } from '../_http.js';

const sql = neon(process.env.POSTGRES_URL);
export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });

  try {
    const body = await readJson(req);
    const stage = Number(body.stage);
    const answer = body.answer;
    if (!body.sessionId || !Number.isInteger(stage) || stage < 0 || stage > 4 || (answer !== null && !['True', 'False'].includes(answer))) {
      return json(res, 400, { error: 'A valid sessionId, stage, and answer are required.' });
    }

    const rows = await sql`
      SELECT
        s.current_stage,
        s.status,
        q.answer,
        q.explanation
      FROM game_sessions s
      JOIN questions q ON q.id = ((s.question_ids ->> ${stage}::int)::bigint)
      WHERE s.id = ${body.sessionId}::uuid
    `;
    if (rows.length === 0) return json(res, 404, { error: 'Game session not found.' });
    const session = rows[0];
    if (session.status !== 'active' || session.current_stage !== stage) {
      return json(res, 409, { error: 'This game stage is no longer active.' });
    }

    const correct = answer !== null && session.answer === (answer === 'True');
    const status = correct && stage === 4 ? 'victory' : (correct ? 'active' : 'eliminated');
    await sql`
      UPDATE game_sessions
      SET status = ${status},
          current_stage = ${correct ? Math.min(stage + 1, 4) : stage},
          updated_at = NOW()
      WHERE id = ${body.sessionId}::uuid
    `;

    return json(res, 200, {
      correct,
      status,
      explanation: session.explanation,
      correctAnswer: session.answer ? 'True' : 'False',
    });
  } catch (error) {
    console.error('Unable to validate answer.', error);
    return json(res, 500, { error: 'Unable to validate answer.' });
  }
}
