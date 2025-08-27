import { create } from 'zustand';
import { userAPI } from '../services/api';
import { User, AlumniFilters, PaginatedResponse } from '../types';

interface AlumniState {
  alumni: User[];
  filteredAlumni: User[];
  selectedAlumnus: User | null;
  filters: AlumniFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  
  // Actions
  fetchAlumni: (page?: number) => Promise<void>;
  fetchAlumnusById: (id: number) => Promise<void>;
  applyFilters: (filters: AlumniFilters) => void;
  clearFilters: () => void;
  searchAlumni: (searchTerm: string) => void;
  setSelectedAlumnus: (alumnus: User | null) => void;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
}

export const useAlumniStore = create<AlumniState>((set, get) => ({
  alumni: [],
  filteredAlumni: [],
  selectedAlumnus: null,
  filters: {},
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 20,
  
  fetchAlumni: async (page = 1) => {
    try {
      set({ isLoading: true, error: null, currentPage: page });
      
      const skip = (page - 1) * get().pageSize;
      const response: PaginatedResponse<User> = await userAPI.getUsers(skip, get().pageSize);
      
      // Filter to show only visible profiles
      const visibleAlumni = response.data.filter(user => user.profile_visible);
      
      set({ 
        alumni: visibleAlumni,
        filteredAlumni: visibleAlumni,
        totalCount: response.count
      });
      
      // Apply any existing filters
      const currentFilters = get().filters;
      if (Object.keys(currentFilters).length > 0) {
        get().applyFilters(currentFilters);
      }
    } catch (error: any) {
      set({ error: error.response?.data?.detail || 'Failed to fetch alumni' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchAlumnusById: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      
      const alumnus = await userAPI.getUserById(id);
      set({ selectedAlumnus: alumnus });
    } catch (error: any) {
      set({ error: error.response?.data?.detail || 'Failed to fetch alumnus details' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  applyFilters: (filters: AlumniFilters) => {
    const { alumni } = get();
    
    let filtered = [...alumni];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(alumnus => 
        alumnus.full_name.toLowerCase().includes(searchLower) ||
        alumnus.email.toLowerCase().includes(searchLower) ||
        alumnus.current_company?.toLowerCase().includes(searchLower) ||
        alumnus.current_role?.toLowerCase().includes(searchLower) ||
        alumnus.bio?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(alumnus => 
        alumnus.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Apply graduation year filter
    if (filters.graduation_year) {
      filtered = filtered.filter(alumnus => 
        alumnus.graduation_year === filters.graduation_year
      );
    }
    
    // Apply company filter
    if (filters.company) {
      filtered = filtered.filter(alumnus => 
        alumnus.current_company?.toLowerCase().includes(filters.company!.toLowerCase())
      );
    }
    
    // Apply availability filters
    if (filters.open_to_coffee_chats !== undefined) {
      filtered = filtered.filter(alumnus => 
        alumnus.open_to_coffee_chats === filters.open_to_coffee_chats
      );
    }
    
    if (filters.open_to_mentorship !== undefined) {
      filtered = filtered.filter(alumnus => 
        alumnus.open_to_mentorship === filters.open_to_mentorship
      );
    }
    
    if (filters.available_for_referrals !== undefined) {
      filtered = filtered.filter(alumnus => 
        alumnus.available_for_referrals === filters.available_for_referrals
      );
    }
    
    if (filters.is_alumni !== undefined) {
      filtered = filtered.filter(alumnus => 
        alumnus.is_alumni === filters.is_alumni
      );
    }
    
    set({ filteredAlumni: filtered, filters });
  },
  
  clearFilters: () => {
    const { alumni } = get();
    set({ filteredAlumni: alumni, filters: {} });
  },
  
  searchAlumni: (searchTerm: string) => {
    const currentFilters = get().filters;
    get().applyFilters({ ...currentFilters, search: searchTerm });
  },
  
  setSelectedAlumnus: (alumnus: User | null) => {
    set({ selectedAlumnus: alumnus });
  },
  
  setPageSize: (size: number) => {
    set({ pageSize: size });
    get().fetchAlumni(1); // Reset to first page when changing page size
  },
  
  setCurrentPage: (page: number) => {
    get().fetchAlumni(page);
  },
  
  clearError: () => set({ error: null }),
}));