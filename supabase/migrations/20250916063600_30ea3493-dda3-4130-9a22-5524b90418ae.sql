-- Clean up duplicate profiles and add unique constraint
-- First, keep only the latest profile for each user
DELETE FROM user_profiles 
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id 
  FROM user_profiles 
  ORDER BY user_id, created_at DESC
);

-- Add unique constraint to prevent future duplicates
ALTER TABLE user_profiles 
ADD CONSTRAINT unique_user_profile 
UNIQUE (user_id);