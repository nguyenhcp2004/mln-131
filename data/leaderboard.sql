-- Leaderboard table
CREATE TABLE IF NOT EXISTS public.leaderboard (
  device_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  duration INT NOT NULL DEFAULT 0,
  correct_answers INT NOT NULL DEFAULT 0,
  wrong_answers INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster sorting
CREATE INDEX IF NOT EXISTS idx_leaderboard_score_duration 
ON public.leaderboard (score DESC, duration ASC);

-- Enable Row Level Security
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read leaderboard
CREATE POLICY "Anyone can view leaderboard"
ON public.leaderboard
FOR SELECT
USING (true);

-- Policy: Anyone can insert their score
CREATE POLICY "Anyone can insert score"
ON public.leaderboard
FOR INSERT
WITH CHECK (true);

-- Policy: Anyone can update their own score
CREATE POLICY "Anyone can update their score"
ON public.leaderboard
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Function to calculate score
-- Score = (correct_answers * 100) - (wrong_answers * 10) - (duration in seconds / 10)
-- Higher score is better
CREATE OR REPLACE FUNCTION calculate_game_score(
  p_correct INT,
  p_wrong INT,
  p_duration INT
)
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (p_correct * 100) - (p_wrong * 10) - (p_duration / 10);
END;
$$;

-- Function to upsert leaderboard entry (insert or update if better)
CREATE OR REPLACE FUNCTION upsert_leaderboard_entry(
  p_device_id TEXT,
  p_name TEXT,
  p_correct INT,
  p_wrong INT,
  p_duration INT
)
RETURNS TABLE(
  device_id TEXT,
  name TEXT,
  score INT,
  duration INT,
  correct_answers INT,
  wrong_answers INT,
  is_new_record BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_new_score INT;
  v_existing_score INT;
  v_existing_duration INT;
  v_is_new_record BOOLEAN := false;
BEGIN
  -- Calculate new score
  v_new_score := calculate_game_score(p_correct, p_wrong, p_duration);
  
  -- Check if entry exists
  SELECT l.score, l.duration INTO v_existing_score, v_existing_duration
  FROM public.leaderboard l
  WHERE l.device_id = p_device_id;
  
  IF v_existing_score IS NULL THEN
    -- New entry
    INSERT INTO public.leaderboard (device_id, name, score, duration, correct_answers, wrong_answers)
    VALUES (p_device_id, p_name, v_new_score, p_duration, p_correct, p_wrong);
    v_is_new_record := true;
  ELSIF v_new_score > v_existing_score OR (v_new_score = v_existing_score AND p_duration < v_existing_duration) THEN
    -- Better score or same score but faster time
    UPDATE public.leaderboard l
    SET 
      name = p_name,
      score = v_new_score,
      duration = p_duration,
      correct_answers = p_correct,
      wrong_answers = p_wrong,
      updated_at = NOW()
    WHERE l.device_id = p_device_id;
    v_is_new_record := true;
  END IF;
  
  -- Return the current record
  RETURN QUERY
  SELECT 
    l.device_id,
    l.name,
    l.score,
    l.duration,
    l.correct_answers,
    l.wrong_answers,
    v_is_new_record
  FROM public.leaderboard l
  WHERE l.device_id = p_device_id;
END;
$$;
