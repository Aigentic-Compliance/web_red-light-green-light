import { neon } from '@neondatabase/serverless';
import { randomUUID } from 'node:crypto';
import { json, readJson } from '../_http.js';

const sql = neon(process.env.POSTGRES_URL);
const difficultyRank = { Easy: 1, Medium: 2, Hard: 3 };

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function selectLadder(questions) {
  const unused = new Set(questions.map((question) => question.id));
  const pick = (difficulty, fallback = []) => {
    const pool = shuffle(questions.filter(
      (question) => unused.has(question.id) && question.difficulty === difficulty,
    ));
    const fallbackPool = shuffle(questions.filter((question) => (
      unused.has(question.id) && fallback.includes(question.difficulty)
    )));
    const selected = pool[0] || fallbackPool[0];
    if (!selected) throw new Error('Not enough eligible questions for a five-stage ladder.');
    unused.delete(selected.id);
    return selected;
  };

  const ladder = [
    pick('Easy', ['Medium', 'Hard']),
    pick('Medium', ['Easy', 'Hard']),
    pick('Medium', ['Easy', 'Hard']),
    pick('Medium', ['Hard', 'Easy']),
    pick('Hard', ['Medium', 'Easy']),
  ];
  return ladder.sort((a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });

  try {
    const body = await readJson(req);
    const tier = Number(body.tier);
    if (!Number.isInteger(tier) || tier < 1 || tier > 4) {
      return json(res, 400, { error: 'Tier must be an integer from 1 to 4.' });
    }

    const { rows: scrollRows } = await sql`
      SELECT id, tier, tier_name, title, rules, examples
      FROM scrolls
      WHERE tier = ${tier}
      ORDER BY RANDOM()
      LIMIT 3
    `;
    if (scrollRows.length < 3) return json(res, 503, { error: 'Not enough missions are configured.' });

    const ids = scrollRows.map((scroll) => scroll.id);
    const { rows: questionRows } = await sql`
      SELECT id, scroll_id, statement, difficulty
      FROM questions
      WHERE scroll_id = ANY(${ids}::int[])
      ORDER BY RANDOM()
    `;
    const ladder = selectLadder(questionRows);
    const sessionId = randomUUID();

    await sql`
      INSERT INTO game_sessions (id, tier, assigned_scroll_ids, question_ids)
      VALUES (
        ${sessionId},
        ${tier},
        ${JSON.stringify(ids)}::jsonb,
        ${JSON.stringify(ladder.map((question) => question.id))}::jsonb
      )
    `;

    return json(res, 200, {
      sessionId,
      missions: scrollRows,
      ladder: ladder.map((question, index) => ({
        stage: index,
        questionId: question.id,
        statement: question.statement,
        difficulty: question.difficulty,
        missionSlot: ids.indexOf(question.scroll_id) + 1,
      })),
    });
  } catch (error) {
    console.error('Unable to start game session.', error);
    return json(res, 500, { error: 'Unable to start a game session.' });
  }
}
