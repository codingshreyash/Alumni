import { create } from 'zustand';
import { 
  getConnectionRequests, 
  createConnectionRequest as createRequest, 
  updateConnectionStatus as updateStatus 
} from '../lib/supabaseClient';

interface ConnectionState {
  connections: any[];
  isLoading: boolean;
  error: string | null;
  fetchConnections: (userId: string) => Promise<void>;
  createConnectionRequest: (requesterId: string, alumniId: string, message: string) => Promise<void>;
  updateConnectionStatus: (connectionId: string, status: 'accepted' | 'declined') => Promise<void>;
  clearError: () => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  connections: [],
  isLoading: false,
  error: null,
  
  fetchConnections: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const connections = await getConnectionRequests(userId);
      set({ connections });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  createConnectionRequest: async (requesterId: string, alumniId: string, message: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await createRequest(requesterId, alumniId, message);
      
      // Refresh connections
      const connections = await getConnectionRequests(requesterId);
      set({ connections });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateConnectionStatus: async (connectionId: string, status: 'accepted' | 'declined') => {
    try {
      set({ isLoading: true, error: null });
      
      await updateStatus(connectionId, status);
      
      // Update the connection in the state
      set((state) => ({
        connections: state.connections.map((conn) =>
          conn.id === connectionId ? { ...conn, status } : conn
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  clearError: () => set({ error: null }),
}));