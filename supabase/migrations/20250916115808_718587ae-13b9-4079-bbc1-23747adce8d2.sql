-- Add unique constraint to prevent duplicate applications
ALTER TABLE applications 
ADD CONSTRAINT applications_user_scholarship_unique 
UNIQUE (user_id, scholarship_id);