/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `title` (text)
      - `description` (text)
      - `date` (timestamptz)
      - `location` (text)
      - `image_url` (text, nullable)
  
  2. Security
    - Enable RLS on `events` table
    - Add policies for authenticated users to read events
    - Add policies for admins to create/update/delete events
*/

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

-- Set up Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Authenticated users can read events
CREATE POLICY "Authenticated users can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Admins can create events
CREATE POLICY "Admins can create events"
  ON events
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can update events
CREATE POLICY "Admins can update events"
  ON events
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can delete events
CREATE POLICY "Admins can delete events"
  ON events
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );