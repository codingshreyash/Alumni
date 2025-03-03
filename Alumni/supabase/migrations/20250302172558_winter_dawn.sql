/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - User profiles with authentication data
      - Stores user information, preferences, and role flags
    - `connection_requests`
      - Tracks connection requests between students and alumni
    - `events`
      - Stores community events information
    - `company_processes`
      - Stores interview process information for companies
    - `interview_rounds`
      - Stores details about interview rounds for company processes
    - `interview_tips`
      - Stores tips for specific interview rounds

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-specific policies
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

-- Create connection_requests table
CREATE TABLE IF NOT EXISTS connection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  alumni_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  message TEXT,
  
  -- Prevent duplicate connection requests
  CONSTRAINT unique_connection_request UNIQUE (requester_id, alumni_id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT
);

-- Create company_processes table
CREATE TABLE IF NOT EXISTS company_processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  company_name TEXT NOT NULL,
  logo_url TEXT,
  UNIQUE(company_name)
);

-- Create interview_positions table
CREATE TABLE IF NOT EXISTS interview_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES company_processes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(company_id, title)
);

-- Create interview_rounds table
CREATE TABLE IF NOT EXISTS interview_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position_id UUID NOT NULL REFERENCES interview_positions(id) ON DELETE CASCADE,
  round_name TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Medium',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Create interview_tips table
CREATE TABLE IF NOT EXISTS interview_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id UUID NOT NULL REFERENCES interview_rounds(id) ON DELETE CASCADE,
  tip TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
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

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_tips ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Authenticated users can read visible profiles"
  ON profiles
  FOR SELECT
  USING (profile_visible = true OR auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Connection requests policies
CREATE POLICY "Users can read their own connection requests"
  ON connection_requests
  FOR SELECT
  USING (
    auth.uid() = requester_id OR 
    auth.uid() = alumni_id
  );

CREATE POLICY "Users can create connection requests"
  ON connection_requests
  FOR INSERT
  WITH CHECK (
    auth.uid() = requester_id AND
    requester_id != alumni_id
  );

CREATE POLICY "Alumni can update connection requests"
  ON connection_requests
  FOR UPDATE
  USING (
    auth.uid() = alumni_id
  );

CREATE POLICY "Admins can read all connection requests"
  ON connection_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Events policies
CREATE POLICY "Authenticated users can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create events"
  ON events
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can update events"
  ON events
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can delete events"
  ON events
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Company processes policies
CREATE POLICY "Anyone can read company processes"
  ON company_processes
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create company processes"
  ON company_processes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update company processes"
  ON company_processes
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Interview positions policies
CREATE POLICY "Anyone can read interview positions"
  ON interview_positions
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create interview positions"
  ON interview_positions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update interview positions"
  ON interview_positions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Interview rounds policies
CREATE POLICY "Anyone can read interview rounds"
  ON interview_rounds
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create interview rounds"
  ON interview_rounds
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own interview rounds or admins can update any"
  ON interview_rounds
  FOR UPDATE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Interview tips policies
CREATE POLICY "Anyone can read interview tips"
  ON interview_tips
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create interview tips"
  ON interview_tips
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own interview tips or admins can update any"
  ON interview_tips
  FOR UPDATE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );