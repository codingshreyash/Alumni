import { create } from 'zustand';
import { updateProfile as updateUserProfile } from '../lib/supabaseClient';

interface ProfileState {
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  updateProfile: (userId: string, data: any) => Promise<void>;
  setCurrentStep: (step: number) => void;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  currentStep: 1,
  isLoading: false,
  error: null,
  
  updateProfile: async (userId: string, data: any) => {
    try {
      set({ isLoading: true, error: null });
      
      await updateUserProfile(userId, data);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  setCurrentStep: (step: number) => set({ currentStep: step }),
  
  clearError: () => set({ error: null }),
}));