import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { 
  supabase, 
  signIn as supabaseSignIn, 
  signUp as supabaseSignUp, 
  signOut as supabaseSignOut,
  getCurrentUser,
  getProfile as fetchProfile
} from '../lib/supabaseClient';

interface AuthState {
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<void>;
  clearError: () => void;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,
  
  signUp: async (email: string, password: string, fullName: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const user = await supabaseSignUp(email, password, fullName);
      set({ user });
      
      // Show success message for email verification if needed
      // In this case, we're not requiring email verification
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const user = await supabaseSignIn(email, password);
      set({ user });
      
      // Get profile
      if (user) {
        await get().getProfile();
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      
      await supabaseSignOut();
      set({ user: null, profile: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  getProfile: async () => {
    try {
      const { user } = get();
      
      if (!user) return;
      
      set({ isLoading: true, error: null });
      
      const profile = await fetchProfile(user.id);
      set({ profile });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  checkSession: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Check if we have a session
      const user = await getCurrentUser();
      
      // Only update user if we actually got one back
      if (user) {
        set({ user });
        await get().getProfile();
      }
    } catch (error: any) {
      // Don't set error for session checks
      console.error('Session check error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  clearError: () => set({ error: null }),
}));

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    useAuthStore.getState().checkSession();
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null, profile: null });
  }
});