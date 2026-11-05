import { readFile } from 'node:fs/promises';
import { sql } from '../db/client.mjs';

const sourcePath = new URL('../mockups/all_scrolls.json', import.meta.url);
const scrolls = JSON.parse(await readFile(sourcePath, 'utf8'));

for (const scroll of scrolls) {
  await sql`
    INSERT INTO scrolls (id, tier, tier_name, title, rules, examples)
    VALUES (
      ${scroll.scroll_number},
      ${scroll.tier},
      ${scroll.tierName},
      ${scroll.title},
      ${JSON.stringify(scroll.rules)}::jsonb,
      ${JSON.stringify(scroll.examples)}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      tier = EXCLUDED.tier,
      tier_name = EXCLUDED.tier_name,
      title = EXCLUDED.title,
      rules = EXCLUDED.rules,
      examples = EXCLUDED.examples
  `;

  for (const question of scroll.questions) {
    if (!['Easy', 'Medium', 'Hard'].includes(question.difficulty)) continue;
    await sql`
      INSERT INTO questions (scroll_id, statement, answer, explanation, difficulty)
      VALUES (
        ${scroll.scroll_number},
        ${question.statement},
        ${question.answer === 'True'},
        ${question.explanation},
        ${question.difficulty}
      )
      ON CONFLICT (scroll_id, statement) DO UPDATE SET
        answer = EXCLUDED.answer,
        explanation = EXCLUDED.explanation,
        difficulty = EXCLUDED.difficulty
    `;
  }
}

console.log(`Seeded ${scrolls.length} scrolls.`);
