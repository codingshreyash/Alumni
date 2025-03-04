/*
  # Create company interview processes tables

  1. New Tables
    - `company_processes`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `company_name` (text, unique)
      - `logo_url` (text, nullable)
    
    - `interview_positions`
      - `id` (uuid, primary key)
      - `company_id` (uuid, references company_processes)
      - `title` (text)
      - `created_at` (timestamptz, default now())
    
    - `interview_rounds`
      - `id` (uuid, primary key)
      - `position_id` (uuid, references interview_positions)
      - `round_name` (text)
      - `description` (text)
      - `difficulty` (text, check constraint: 'Easy', 'Medium', 'Hard')
      - `created_at` (timestamptz, default now())
      - `created_by` (uuid, references profiles)
    
    - `interview_tips`
      - `id` (uuid, primary key)
      - `round_id` (uuid, references interview_rounds)
      - `tip` (text)
      - `created_at` (timestamptz, default now())
      - `created_by` (uuid, references profiles)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for anyone to read company processes data
    - Add policies for authenticated users to create company processes data
    - Add policies for users to update their own contributions or admins to update any
*/

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

-- Enable Row Level Security on all tables
ALTER TABLE company_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_tips ENABLE ROW LEVEL SECURITY;

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