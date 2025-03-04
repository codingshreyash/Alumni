/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp)
      - `location` (text)
      - `image_url` (text, nullable)
  
  2. Security
    - Enable RLS on `events` table
    - Add policies for:
      - Authenticated users can read events
      - Admins can create, update, and delete events
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
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );

-- Admins can update events
CREATE POLICY "Admins can update events"
  ON events
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );

-- Admins can delete events
CREATE POLICY "Admins can delete events"
  ON events
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );