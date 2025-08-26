import { create } from 'zustand';
import { connectionAPI } from '../services/api';

interface ConnectionState {
  acceptedRequests: any[];
  requestsMade: any[];
  isLoading: boolean;
  error: string | null;
  fetchAcceptedRequests: (userId: number) => Promise<void>;
  fetchRequestsMade: (userId: number) => Promise<void>;
  createConnectionRequest: (requesterId: number, requestedId: number, message: string) => Promise<void>;
  acceptConnectionRequest: (requestId: number) => Promise<void>;
  declineConnectionRequest: (requestId: number) => Promise<void>;
  clearError: () => void;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  acceptedRequests: [],
  requestsMade: [],
  isLoading: false,
  error: null,
  
  fetchAcceptedRequests: async (userId: number) => {
    try {
      set({ isLoading: true, error: null });
      
      const acceptedRequests = await connectionAPI.getAcceptedRequests(userId);
      set({ acceptedRequests });
    } catch (error: any) {
      set({ error: error.response?.data?.detail || error.message || 'Failed to fetch accepted requests' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchRequestsMade: async (userId: number) => {
    try {
      set({ isLoading: true, error: null });
      
      const requestsMade = await connectionAPI.getRequestsMade(userId);
      set({ requestsMade });
    } catch (error: any) {
      set({ error: error.response?.data?.detail || error.message || 'Failed to fetch requests made' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  createConnectionRequest: async (requesterId: number, requestedId: number, message: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await connectionAPI.createConnectionRequest(requesterId, requestedId, message);
      
      // Refresh requests made
      await get().fetchRequestsMade(requesterId);
    } catch (error: any) {
      set({ error: error.response?.data?.detail || error.message || 'Failed to create connection request' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  acceptConnectionRequest: async (requestId: number) => {
    try {
      set({ isLoading: true, error: null });
      
      await connectionAPI.acceptConnectionRequest(requestId);
      
      // Note: We'd need userId to refresh, but we'll handle this in the component
      // by passing the userId and calling both fetch functions
    } catch (error: any) {
      set({ error: error.response?.data?.detail || error.message || 'Failed to accept connection request' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  declineConnectionRequest: async (requestId: number) => {
    try {
      set({ isLoading: true, error: null });
      
      await connectionAPI.declineConnectionRequest(requestId);
      
      // Note: We'd need userId to refresh, but we'll handle this in the component
    } catch (error: any) {
      set({ error: error.response?.data?.detail || error.message || 'Failed to decline connection request' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  clearError: () => set({ error: null }),
}));