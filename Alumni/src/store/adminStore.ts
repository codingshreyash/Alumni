import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AdminState {
  users: any[];
  pendingAlumni: any[];
  analytics: {
    totalUsers: number;
    totalAlumni: number;
    totalConnections: number;
    acceptanceRate: number;
  };
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchPendingAlumni: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  approveAlumni: (userId: string) => Promise<void>;
  rejectAlumni: (userId: string) => Promise<void>;
  updateUserRole: (userId: string, isAdmin: boolean) => Promise<void>;
  clearError: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  pendingAlumni: [],
  analytics: {
    totalUsers: 0,
    totalAlumni: 0,
    totalConnections: 0,
    acceptanceRate: 0,
  },
  isLoading: false,
  error: null,
  
  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      set({ users: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchPendingAlumni: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Fetch users who have requested alumni status but haven't been approved
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_alumni', false)
        .eq('profile_completed', true);
      
      if (error) throw error;
      
      set({ pendingAlumni: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchAnalytics: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Get total users
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id');
      
      if (usersError) throw usersError;
      
      // Get total alumni
      const { data: alumni, error: alumniError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_alumni', true);
      
      if (alumniError) throw alumniError;
      
      // Get total connections
      const { data: connections, error: connectionsError } = await supabase
        .from('connection_requests')
        .select('id, status');
      
      if (connectionsError) throw connectionsError;
      
      // Calculate acceptance rate
      const acceptedConnections = connections?.filter(c => c.status === 'accepted').length || 0;
      const totalConnections = connections?.length || 0;
      const acceptanceRate = totalConnections > 0 ? (acceptedConnections / totalConnections) * 100 : 0;
      
      set({
        analytics: {
          totalUsers: users?.length || 0,
          totalAlumni: alumni?.length || 0,
          totalConnections: totalConnections,
          acceptanceRate: acceptanceRate,
        },
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  approveAlumni: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_alumni: true })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Refresh pending alumni list
      await set.getState().fetchPendingAlumni();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  rejectAlumni: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // We don't delete the user, just keep them as a non-alumni
      // This could be enhanced with a "rejected" status if needed
      
      // Refresh pending alumni list
      await set.getState().fetchPendingAlumni();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateUserRole: async (userId: string, isAdmin: boolean) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Refresh users list
      await set.getState().fetchUsers();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  clearError: () => set({ error: null }),
}));