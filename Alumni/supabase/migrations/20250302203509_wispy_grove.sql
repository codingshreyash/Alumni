/*
  # Create connection requests table

  1. New Tables
    - `connection_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `requester_id` (uuid, references profiles)
      - `alumni_id` (uuid, references profiles)
      - `status` (text, check constraint: 'pending', 'accepted', 'declined')
      - `message` (text, nullable)
  
  2. Security
    - Enable RLS on `connection_requests` table
    - Add policies for users to read their own connection requests
    - Add policies for users to create connection requests
    - Add policies for alumni to update connection requests
    - Add policies for admins to read all connection requests
*/

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

-- Set up Row Level Security
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own connection requests (as requester or alumni)
CREATE POLICY "Users can read own connection requests"
  ON connection_requests
  FOR SELECT
  USING (
    auth.uid() = requester_id OR 
    auth.uid() = alumni_id
  );

-- Users can create connection requests
CREATE POLICY "Users can create connection requests"
  ON connection_requests
  FOR INSERT
  WITH CHECK (
    auth.uid() = requester_id AND
    requester_id != alumni_id
  );

-- Alumni can update connection requests
CREATE POLICY "Alumni can update connection requests"
  ON connection_requests
  FOR UPDATE
  USING (
    auth.uid() = alumni_id
  );

-- Admins can read all connection requests
CREATE POLICY "Admins can read all connection requests"
  ON connection_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );