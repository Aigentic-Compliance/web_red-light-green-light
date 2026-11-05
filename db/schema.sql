CREATE TABLE IF NOT EXISTS scrolls (
  id INTEGER PRIMARY KEY,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 4),
  tier_name TEXT NOT NULL,
  title TEXT NOT NULL,
  rules JSONB NOT NULL,
  examples JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL PRIMARY KEY,
  scroll_id INTEGER NOT NULL REFERENCES scrolls(id) ON DELETE CASCADE,
  statement TEXT NOT NULL,
  answer BOOLEAN NOT NULL,
  explanation TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  UNIQUE (scroll_id, statement)
);

CREATE INDEX IF NOT EXISTS questions_scroll_difficulty_idx
  ON questions (scroll_id, difficulty);

CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 4),
  assigned_scroll_ids JSONB NOT NULL,
  question_ids JSONB NOT NULL,
  current_stage INTEGER NOT NULL DEFAULT 0 CHECK (current_stage BETWEEN 0 AND 4),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'eliminated', 'victory')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
