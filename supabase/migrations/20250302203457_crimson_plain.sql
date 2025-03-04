/*
  # Create profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
      - `email` (text, unique)
      - `full_name` (text)
      - `location` (text, nullable)
      - `majors` (text array, nullable)
      - `internships` (text array, nullable)
      - `interviews_passed` (text array, nullable)
      - `graduation_year` (integer, nullable)
      - `linkedin_url` (text, nullable)
      - `personal_website` (text, nullable)
      - `current_company` (text, nullable)
      - `current_role` (text, nullable)
      - `profile_image` (text, nullable)
      - `open_to_coffee_chats` (boolean, default false)
      - `open_to_mentorship` (boolean, default false)
      - `available_for_referrals` (boolean, default false)
      - `additional_notes` (text, nullable)
      - `is_alumni` (boolean, default false)
      - `is_admin` (boolean, default false)
      - `profile_completed` (boolean, default false)
      - `profile_visible` (boolean, default false)
  
  2. Security
    - Enable RLS on `profiles` table
    - Add policies for users to read/update their own profiles
    - Add policies for authenticated users to read visible profiles
    - Add policies for admins to read/update all profiles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  location TEXT,
  majors TEXT[],
  internships TEXT[],
  interviews_passed TEXT[],
  graduation_year INTEGER,
  linkedin_url TEXT,
  personal_website TEXT,
  current_company TEXT,
  current_role TEXT,
  profile_image TEXT,
  open_to_coffee_chats BOOLEAN DEFAULT false NOT NULL,
  open_to_mentorship BOOLEAN DEFAULT false NOT NULL,
  available_for_referrals BOOLEAN DEFAULT false NOT NULL,
  additional_notes TEXT,
  is_alumni BOOLEAN DEFAULT false NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  profile_completed BOOLEAN DEFAULT false NOT NULL,
  profile_visible BOOLEAN DEFAULT false NOT NULL
);

-- Set up Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own profile
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Authenticated users can read visible profiles
CREATE POLICY "Authenticated users can read visible profiles"
  ON profiles
  FOR SELECT
  USING (profile_visible = true OR auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profile updates
CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();