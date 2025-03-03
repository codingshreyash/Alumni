import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Get environment variables with fallbacks to prevent URL construction errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have valid environment variables in development
if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  // Validate Pitt email
  if (!email.endsWith('@pitt.edu')) {
    throw new Error('Only @pitt.edu email addresses are allowed to register');
  }
  
  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  
  if (data.user) {
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: email,
        full_name: fullName,
        is_alumni: false,
        is_admin: false,
        profile_completed: false,
        profile_visible: false,
        open_to_coffee_chats: false,
        open_to_mentorship: false,
        available_for_referrals: false,
      });
      
    if (profileError) throw profileError;
    
    return data.user;
  }
  
  return null;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

export const updateProfile = async (userId: string, profileData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Connection requests helpers
export const createConnectionRequest = async (requesterId: string, alumniId: string, message: string) => {
  const { data, error } = await supabase
    .from('connection_requests')
    .insert({
      requester_id: requesterId,
      alumni_id: alumniId,
      message,
      status: 'pending',
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

export const getConnectionRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from('connection_requests')
    .select(`
      *,
      requester:profiles!connection_requests_requester_id_fkey(id, full_name, email, profile_image),
      alumni:profiles!connection_requests_alumni_id_fkey(id, full_name, email, profile_image)
    `)
    .or(`requester_id.eq.${userId},alumni_id.eq.${userId}`);
  
  if (error) throw error;
  
  return data;
};

export const updateConnectionStatus = async (connectionId: string, status: 'accepted' | 'declined') => {
  const { data, error } = await supabase
    .from('connection_requests')
    .update({ status })
    .eq('id', connectionId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Alumni helpers
export const getAlumni = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_alumni', true)
    .eq('profile_visible', true);
  
  if (error) throw error;
  
  return data;
};

export const getAlumnusById = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .eq('is_alumni', true)
    .eq('profile_visible', true)
    .single();
  
  if (error) throw error;
  
  return data;
};

// Events helpers
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) throw error;
  
  return data;
};

// Company processes helpers
export const getCompanyProcesses = async () => {
  const { data, error } = await supabase
    .from('company_processes')
    .select(`
      *,
      positions:interview_positions(
        id,
        title,
        rounds:interview_rounds(
          id,
          round_name,
          description,
          difficulty,
          tips:interview_tips(
            id,
            tip
          )
        )
      )
    `);
  
  if (error) throw error;
  
  return data;
};

export const addCompanyProcess = async (companyName: string, logoUrl: string, userId: string) => {
  // First, check if company already exists
  const { data: existingCompany, error: checkError } = await supabase
    .from('company_processes')
    .select('id')
    .eq('company_name', companyName)
    .single();
  
  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 is "no rows returned" which is expected if company doesn't exist
    throw checkError;
  }
  
  if (existingCompany) {
    return existingCompany;
  }
  
  // Create new company
  const { data, error } = await supabase
    .from('company_processes')
    .insert({
      company_name: companyName,
      logo_url: logoUrl,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

export const addInterviewPosition = async (companyId: string, title: string) => {
  // Check if position already exists
  const { data: existingPosition, error: checkError } = await supabase
    .from('interview_positions')
    .select('id')
    .eq('company_id', companyId)
    .eq('title', title)
    .single();
  
  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }
  
  if (existingPosition) {
    return existingPosition;
  }
  
  // Create new position
  const { data, error } = await supabase
    .from('interview_positions')
    .insert({
      company_id: companyId,
      title,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

export const addInterviewRound = async (
  positionId: string, 
  roundName: string, 
  description: string, 
  difficulty: 'Easy' | 'Medium' | 'Hard',
  userId: string
) => {
  const { data, error } = await supabase
    .from('interview_rounds')
    .insert({
      position_id: positionId,
      round_name: roundName,
      description,
      difficulty,
      created_by: userId,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

export const addInterviewTip = async (roundId: string, tip: string, userId: string) => {
  const { data, error } = await supabase
    .from('interview_tips')
    .insert({
      round_id: roundId,
      tip,
      created_by: userId,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};