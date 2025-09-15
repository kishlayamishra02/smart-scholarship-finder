-- Add missing columns to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS age text,
ADD COLUMN IF NOT EXISTS income_level text,
ADD COLUMN IF NOT EXISTS community_service text,
ADD COLUMN IF NOT EXISTS password_hash text;

-- Remove the password column from the interface since passwords should be handled by Supabase Auth