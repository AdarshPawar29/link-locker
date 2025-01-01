/*
  # Initial Schema Setup for LinkLocker

  1. New Tables
    - `profiles`
      - User profile information
      - Linked to auth.users
    - `lockers`
      - Collection of links
      - Owned by users
    - `links`
      - Individual links within lockers
    - `tags`
      - Tags for organizing links
    - `link_tags`
      - Junction table for link-tag relationships
    - `locker_members`
      - Manages shared access to lockers

  2. Security
    - Enable RLS on all tables
    - Policies for secure access control
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  updated_at timestamptz DEFAULT now()
);

-- Create lockers table
CREATE TABLE IF NOT EXISTS lockers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  description text,
  preview_image text,
  locker_id uuid REFERENCES lockers(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed timestamptz,
  click_count integer DEFAULT 0
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create link_tags junction table
CREATE TABLE IF NOT EXISTS link_tags (
  link_id uuid REFERENCES links(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (link_id, tag_id)
);

-- Create locker_members table for sharing
CREATE TABLE IF NOT EXISTS locker_members (
  locker_id uuid REFERENCES lockers(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text CHECK (role IN ('viewer', 'editor', 'admin')) DEFAULT 'viewer',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (locker_id, user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE locker_members ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies for lockers
CREATE POLICY "Lockers are viewable by owner and members"
  ON lockers FOR SELECT
  USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM locker_members
      WHERE locker_id = lockers.id AND user_id = auth.uid()
    ) OR
    is_public = true
  );

CREATE POLICY "Lockers are insertable by authenticated users"
  ON lockers FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Lockers are updatable by owner and admin members"
  ON lockers FOR UPDATE
  USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM locker_members
      WHERE locker_id = lockers.id 
      AND user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Policies for links
CREATE POLICY "Links are viewable by locker members"
  ON links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lockers l
      LEFT JOIN locker_members lm ON l.id = lm.locker_id
      WHERE l.id = links.locker_id
      AND (l.owner_id = auth.uid() OR lm.user_id = auth.uid() OR l.is_public = true)
    )
  );

CREATE POLICY "Links are insertable by locker members with edit rights"
  ON links FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM lockers l
      LEFT JOIN locker_members lm ON l.id = lm.locker_id
      WHERE l.id = locker_id
      AND (
        l.owner_id = auth.uid() OR
        (lm.user_id = auth.uid() AND lm.role IN ('editor', 'admin'))
      )
    )
  );

-- Function to update link access stats
CREATE OR REPLACE FUNCTION update_link_access()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE links
  SET click_count = click_count + 1,
      last_accessed = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating link access stats
CREATE TRIGGER update_link_access_trigger
  AFTER UPDATE OF last_accessed ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_link_access();