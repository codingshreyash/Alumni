/*
  # Seed sample data

  1. Sample Data
    - Sample alumni profiles
    - Sample events
    - Sample company interview processes
  
  2. Purpose
    - Provide realistic data for testing and demonstration
    - Show the structure and relationships between tables
*/

-- Sample alumni profiles
INSERT INTO profiles (id, email, full_name, location, majors, internships, interviews_passed, graduation_year, 
                     linkedin_url, personal_website, current_company, current_position, profile_image,
                     open_to_coffee_chats, open_to_mentorship, available_for_referrals, 
                     additional_notes, is_alumni, is_admin, profile_completed, profile_visible)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'emily.chen@pitt.edu', 'Emily Chen', 'San Francisco, CA', 
   ARRAY['Computer Science', 'Mathematics'], 
   ARRAY['Google', 'Microsoft', 'Stripe'], 
   ARRAY['Google', 'Microsoft', 'Stripe', 'Airbnb', 'Uber'], 
   2022, 'https://linkedin.com/in/example', 'https://emilychen.dev', 'Google', 'Software Engineer',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
   true, true, true, 
   'Happy to help with interview prep and resume reviews. Specialized in distributed systems and machine learning applications.',
   true, false, true, true),
   
  ('00000000-0000-0000-0000-000000000002', 'michael.rodriguez@pitt.edu', 'Michael Rodriguez', 'New York, NY', 
   ARRAY['Computer Science'], 
   ARRAY['Amazon', 'Facebook', 'Bloomberg'], 
   ARRAY['Amazon', 'Facebook', 'Bloomberg', 'Goldman Sachs', 'JPMorgan'], 
   2021, 'https://linkedin.com/in/example', null, 'Amazon', 'Senior Software Development Engineer',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
   true, false, true, 
   'Experienced in backend development and cloud infrastructure. Can provide guidance on AWS certifications and career growth in cloud computing.',
   true, false, true, true),
   
  ('00000000-0000-0000-0000-000000000003', 'aisha.johnson@pitt.edu', 'Aisha Johnson', 'Pittsburgh, PA', 
   ARRAY['Information Science', 'Human-Computer Interaction'], 
   ARRAY['Apple', 'Twitter', 'Duolingo'], 
   ARRAY['Apple', 'Twitter', 'Duolingo', 'Spotify', 'Pinterest'], 
   2020, 'https://linkedin.com/in/example', null, 'Apple', 'UX Engineer',
   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
   false, true, false, 
   'Interested in connecting with students focused on UX/UI design and frontend development. Can provide portfolio reviews and interview preparation for design roles.',
   true, false, true, true),
   
  ('00000000-0000-0000-0000-000000000004', 'sofia.martinez@pitt.edu', 'Sofia Martinez', 'Seattle, WA', 
   ARRAY['Computer Engineering', 'Electrical Engineering'], 
   ARRAY['Microsoft', 'Intel', 'NVIDIA'], 
   ARRAY['Microsoft', 'Intel', 'NVIDIA', 'AMD', 'Qualcomm'], 
   2023, 'https://linkedin.com/in/example', 'https://sofiamartinez.tech', 'Microsoft', 'Hardware Engineer',
   'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
   true, true, false, 
   'Specialized in hardware-software integration and embedded systems. Happy to discuss career paths that bridge hardware and software engineering.',
   true, false, true, true),
   
  ('00000000-0000-0000-0000-000000000005', 'james.kim@pitt.edu', 'James Kim', 'Austin, TX', 
   ARRAY['Computer Science', 'Data Science'], 
   ARRAY['IBM', 'Dell', 'Oracle'], 
   ARRAY['IBM', 'Dell', 'Oracle', 'Salesforce', 'VMware'], 
   2022, 'https://linkedin.com/in/example', null, 'IBM', 'Data Scientist',
   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
   false, false, true, 
   'Currently working on exciting projects in AI and machine learning. Can provide guidance on breaking into data science roles and necessary skills for the field.',
   true, false, true, true);

-- Sample events
INSERT INTO events (title, description, date, location, image_url)
VALUES
  ('PittCSC Alumni Networking Night', 
   'Join us for an evening of networking with PittCSC alumni working at top tech companies. This is a great opportunity to make connections, get career advice, and learn about different career paths in the tech industry.',
   NOW() + INTERVAL '30 days', 
   'William Pitt Union, University of Pittsburgh',
   'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'),
   
  ('Technical Interview Workshop', 
   'Prepare for technical interviews with this hands-on workshop led by PittCSC alumni who have successfully interviewed at FAANG companies. We will cover common interview questions, problem-solving strategies, and tips for success.',
   NOW() + INTERVAL '14 days', 
   'Sennott Square 5313, University of Pittsburgh',
   'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'),
   
  ('Resume Review Session', 
   'Get your resume reviewed by PittCSC alumni and recruiters from top tech companies. Bring a printed copy of your resume and receive personalized feedback to help you stand out to employers.',
   NOW() + INTERVAL '7 days', 
   'Virtual Event (Zoom)',
   'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'),
   
  ('Women in Tech Panel', 
   'Join us for a panel discussion with successful women in tech who graduated from Pitt. Learn about their experiences, challenges, and advice for navigating the tech industry as a woman.',
   NOW() + INTERVAL '21 days', 
   'Cathedral of Learning 332, University of Pittsburgh',
   'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80');

-- Sample company processes
INSERT INTO company_processes (company_name, logo_url)
VALUES
  ('Google', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'),
  ('Microsoft', 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31'),
  ('Amazon', 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png'),
  ('Apple', 'https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg'),
  ('Meta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png');

-- Get company IDs
DO $$
DECLARE
  google_id UUID;
  microsoft_id UUID;
  amazon_id UUID;
  apple_id UUID;
  meta_id UUID;
  
  swe_google_id UUID;
  pm_google_id UUID;
  swe_microsoft_id UUID;
  sde_amazon_id UUID;
  swe_apple_id UUID;
  swe_meta_id UUID;
BEGIN
  -- Get company IDs
  SELECT id INTO google_id FROM company_processes WHERE company_name = 'Google';
  SELECT id INTO microsoft_id FROM company_processes WHERE company_name = 'Microsoft';
  SELECT id INTO amazon_id FROM company_processes WHERE company_name = 'Amazon';
  SELECT id INTO apple_id FROM company_processes WHERE company_name = 'Apple';
  SELECT id INTO meta_id FROM company_processes WHERE company_name = 'Meta';
  
  -- Insert positions
  INSERT INTO interview_positions (company_id, title)
  VALUES 
    (google_id, 'Software Engineer'),
    (google_id, 'Product Manager'),
    (microsoft_id, 'Software Engineer'),
    (amazon_id, 'Software Development Engineer'),
    (apple_id, 'Software Engineer'),
    (meta_id, 'Software Engineer')
  RETURNING id, company_id, title INTO swe_google_id, google_id, 'Software Engineer';
  
  SELECT id INTO pm_google_id FROM interview_positions WHERE company_id = google_id AND title = 'Product Manager';
  SELECT id INTO swe_microsoft_id FROM interview_positions WHERE company_id = microsoft_id AND title = 'Software Engineer';
  SELECT id INTO sde_amazon_id FROM interview_positions WHERE company_id = amazon_id AND title = 'Software Development Engineer';
  SELECT id INTO swe_apple_id FROM interview_positions WHERE company_id = apple_id AND title = 'Software Engineer';
  SELECT id INTO swe_meta_id FROM interview_positions WHERE company_id = meta_id AND title = 'Software Engineer';
  
  -- Insert rounds for Google SWE
  WITH rounds AS (
    INSERT INTO interview_rounds (position_id, round_name, description, difficulty)
    VALUES
      (swe_google_id, 'Phone Screen', 'A 45-minute technical interview with a Google engineer, focusing on data structures and algorithms.', 'Medium'),
      (swe_google_id, 'Onsite - Coding', '4-5 interviews, each 45 minutes long, focusing on coding, algorithms, and system design.', 'Hard'),
      (swe_google_id, 'Onsite - System Design', 'Design a scalable system architecture for a given problem.', 'Hard')
    RETURNING id
  )
  INSERT INTO interview_tips (round_id, tip)
  SELECT id, tip FROM rounds, unnest(ARRAY[
    'Practice coding on a whiteboard or Google Doc',
    'Review basic data structures (arrays, linked lists, trees, graphs)',
    'Be prepared to discuss time and space complexity',
    'Practice LeetCode medium/hard problems',
    'Be vocal about your thought process',
    'Ask clarifying questions before diving into solutions',
    'Understand distributed systems concepts',
    'Practice designing real-world systems (e.g., URL shortener, social media feed)',
    'Consider scalability, reliability, and performance'
  ]) AS tip;
  
  -- Insert rounds for Google PM
  WITH rounds AS (
    INSERT INTO interview_rounds (position_id, round_name, description, difficulty)
    VALUES
      (pm_google_id, 'Phone Screen', 'A 30-minute interview focusing on your background and product sense.', 'Medium'),
      (pm_google_id, 'Onsite - Product Case', 'Design a product solution for a given problem.', 'Hard')
    RETURNING id
  )
  INSERT INTO interview_tips (round_id, tip)
  SELECT id, tip FROM rounds, unnest(ARRAY[
    'Prepare your "tell me about yourself" story',
    'Have examples of products you admire and why',
    'Be ready to discuss product metrics',
    'Structure your approach: problem definition, user needs, solutions, metrics',
    'Consider business goals and technical feasibility',
    'Be prepared to defend your decisions'
  ]) AS tip;
  
  -- Insert rounds for Microsoft SWE
  WITH rounds AS (
    INSERT INTO interview_rounds (position_id, round_name, description, difficulty)
    VALUES
      (swe_microsoft_id, 'Phone Screen', 'A 30-minute technical interview focusing on coding and problem-solving.', 'Medium'),
      (swe_microsoft_id, 'Onsite - Technical', '4 interviews, each 45-60 minutes, covering coding, system design, and behavioral questions.', 'Medium')
    RETURNING id
  )
  INSERT INTO interview_tips (round_id, tip)
  SELECT id, tip FROM rounds, unnest(ARRAY[
    'Review basic algorithms and data structures',
    'Practice coding in your preferred language',
    'Be prepared to explain your approach',
    'Practice coding on a whiteboard',
    'Review object-oriented design principles',
    'Prepare examples of past projects and challenges'
  ]) AS tip;
  
  -- Insert rounds for Amazon SDE
  WITH rounds AS (
    INSERT INTO interview_rounds (position_id, round_name, description, difficulty)
    VALUES
      (sde_amazon_id, 'Online Assessment', 'Coding assessment with 1-2 algorithmic problems to solve within a time limit.', 'Medium'),
      (sde_amazon_id, 'Phone Screen', 'A 45-minute technical interview with coding and behavioral questions.', 'Medium'),
      (sde_amazon_id, 'Onsite - Loop', '4-5 interviews focusing on coding, system design, and behavioral questions based on Amazon''s leadership principles.', 'Hard')
    RETURNING id
  )
  INSERT INTO interview_tips (round_id, tip)
  SELECT id, tip FROM rounds, unnest(ARRAY[
    'Practice timed coding challenges',
    'Focus on efficiency and correctness',
    'Test your solution with multiple test cases',
    'Be prepared to code in a shared document',
    'Review Amazon''s leadership principles',
    'Have STAR method examples ready',
    'Study Amazon''s leadership principles thoroughly',
    'Prepare specific examples for each principle',
    'Practice system design for scalable services'
  ]) AS tip;
  
  -- Insert rounds for Apple SWE
  WITH rounds AS (
    INSERT INTO interview_rounds (position_id, round_name, description, difficulty)
    VALUES
      (swe_apple_id, 'Phone Screen', 'Technical discussion about your background and basic technical questions.', 'Medium'),
      (swe_apple_id, 'Technical Phone Interview', 'Coding and problem-solving questions related to the role.', 'Medium'),
      (swe_apple_id, 'Onsite', '5-6 interviews with team members, focusing on technical skills, problem-solving, and cultural fit.', 'Hard')
    RETURNING id
  )
  INSERT INTO interview_tips (round_id, tip)
  SELECT id, tip FROM rounds, unnest(ARRAY[
    'Review your resume and be prepared to discuss all projects in detail',
    'Research the specific team you are applying for',
    'Be ready to discuss Apple products you use',
    'Practice coding problems',
    'Be familiar with the technologies mentioned in the job description',
    'Prepare questions about the team and role',
    'Be prepared for whiteboar d coding',
    'Expect questions about your approach to problem-solving',
    'Show passion for Apple products and mission'
  ]) AS tip;
  
  -- Insert rounds for Meta SWE
  WITH rounds AS (
    INSERT INTO interview_rounds (position_id, round_name, description, difficulty)
    VALUES
      (swe_meta_id, 'Initial Screen', 'A 45-minute technical interview focusing on coding and problem-solving.', 'Medium'),
      (swe_meta_id, 'Onsite - Coding', '2 coding interviews, each 45 minutes, focusing on algorithms and data structures.', 'Hard'),
      (swe_meta_id, 'Onsite - System Design', 'Design a scalable system for a given problem.', 'Hard'),
      (swe_meta_id, 'Onsite - Behavioral', 'Questions about your past experiences and how you handle various situations.', 'Medium')
    RETURNING id
  )
  INSERT INTO interview_tips (round_id, tip)
  SELECT id, tip FROM rounds, unnest(ARRAY[
    'Practice coding problems on LeetCode',
    'Be comfortable with algorithms and data structures',
    'Explain your thought process clearly',
    'Practice medium to hard LeetCode problems',
    'Be prepared to optimize your solutions',
    'Consider edge cases in your solutions',
    'Study distributed systems concepts',
    'Understand Meta scale challenges',
    'Practice designing social media features',
    'Prepare examples using the STAR method',
    'Research Meta values and culture',
    'Have questions ready about the team and role'
  ]) AS tip;
END $$;