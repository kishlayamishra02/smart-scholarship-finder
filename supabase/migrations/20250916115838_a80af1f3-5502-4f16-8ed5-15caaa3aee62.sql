-- First, delete duplicate applications, keeping only the earliest one for each user-scholarship combination
DELETE FROM applications 
WHERE id NOT IN (
    SELECT DISTINCT ON (user_id, scholarship_id) id
    FROM applications 
    ORDER BY user_id, scholarship_id, created_at ASC
);

-- Now add the unique constraint to prevent future duplicates
ALTER TABLE applications 
ADD CONSTRAINT applications_user_scholarship_unique 
UNIQUE (user_id, scholarship_id);