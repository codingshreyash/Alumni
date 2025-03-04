import { create } from 'zustand';
import { getAlumni } from '../lib/supabaseClient';

interface AlumniState {
  alumni: any[];
  filteredAlumni: any[];
  filters: {
    location: string | null;
    majors: string[] | null;
    internships: string[] | null;
    graduationYear: number | null;
    openToCoffeeChats: boolean | null;
    openToMentorship: boolean | null;
    availableForReferrals: boolean | null;
    searchResults?: any[] | null;
  };
  isLoading: boolean;
  error: string | null;
  fetchAlumni: () => Promise<void>;
  applyFilters: (filters: any) => void;
  clearFilters: () => void;
  clearError: () => void;
}

export const useAlumniStore = create<AlumniState>((set, get) => ({
  alumni: [],
  filteredAlumni: [],
  filters: {
    location: null,
    majors: null,
    internships: null,
    graduationYear: null,
    openToCoffeeChats: null,
    openToMentorship: null,
    availableForReferrals: null,
  },
  isLoading: false,
  error: null,
  
  fetchAlumni: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // For development/demo, we'll use the mock data if Supabase fetch fails
      try {
        const alumni = await getAlumni();
        set({ alumni, filteredAlumni: alumni });
      } catch (error) {
        console.warn('Failed to fetch alumni from Supabase, using mock data instead');
        
        // Use mock data as fallback
        const mockAlumni = [
          {
            id: '1',
            full_name: 'Emily Chen',
            location: 'San Francisco, CA',
            majors: ['Computer Science', 'Mathematics'],
            graduation_year: 2022,
            internships: ['Google', 'Microsoft', 'Stripe'],
            interviews_passed: ['Google', 'Microsoft', 'Stripe', 'Airbnb', 'Uber'],
            open_to_coffee_chats: true,
            open_to_mentorship: true,
            available_for_referrals: true,
            profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
            current_company: 'Google',
            current_role: 'Software Engineer',
            linkedin_url: 'https://linkedin.com/in/example',
            personal_website: 'https://emilychen.dev',
            additional_notes: 'Happy to help with interview prep and resume reviews. Specialized in distributed systems and machine learning applications.'
          },
          {
            id: '2',
            full_name: 'Michael Rodriguez',
            location: 'New York, NY',
            majors: ['Computer Science'],
            graduation_year: 2021,
            internships: ['Amazon', 'Facebook', 'Bloomberg'],
            interviews_passed: ['Amazon', 'Facebook', 'Bloomberg', 'Goldman Sachs', 'JPMorgan'],
            open_to_coffee_chats: true,
            open_to_mentorship: false,
            available_for_referrals: true,
            profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
            current_company: 'Amazon',
            current_role: 'Senior Software Development Engineer',
            linkedin_url: 'https://linkedin.com/in/example',
            personal_website: null,
            additional_notes: 'Experienced in backend development and cloud infrastructure. Can provide guidance on AWS certifications and career growth in cloud computing.'
          },
          // Add more mock alumni as needed
          {
            id: '3',
            full_name: 'Aisha Johnson',
            location: 'Pittsburgh, PA',
            majors: ['Information Science', 'Human-Computer Interaction'],
            graduation_year: 2020,
            internships: ['Apple', 'Twitter', 'Duolingo'],
            interviews_passed: ['Apple', 'Twitter', 'Duolingo', 'Spotify', 'Pinterest'],
            open_to_coffee_chats: false,
            open_to_mentorship: true,
            available_for_referrals: false,
            profile_image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
            current_company: 'Apple',
            current_role: 'UX Engineer',
            linkedin_url: 'https://linkedin.com/in/example',
            personal_website: null,
            additional_notes: 'Interested in connecting with students focused on UX/UI design and frontend development. Can provide portfolio reviews and interview preparation for design roles.'
          }
        ];
        
        set({ alumni: mockAlumni, filteredAlumni: mockAlumni });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  applyFilters: (filters) => {
    set({ filters });
    
    const { alumni } = get();
    
    // Start with search results if provided, otherwise use all alumni
    let filtered = filters.searchResults || [...alumni];
    
    const {
      location,
      majors,
      internships,
      graduationYear,
      openToCoffeeChats,
      openToMentorship,
      availableForReferrals,
    } = filters;
    
    if (location) {
      filtered = filtered.filter((alumnus) => 
        alumnus.location && alumnus.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (majors && majors.length > 0) {
      filtered = filtered.filter((alumnus) => 
        alumnus.majors && majors.some((major: string) => 
          alumnus.majors.includes(major)
        )
      );
    }
    
    if (internships && internships.length > 0) {
      filtered = filtered.filter((alumnus) => 
        alumnus.internships && internships.some((internship: string) => 
          alumnus.internships.includes(internship)
        )
      );
    }
    
    if (graduationYear) {
      filtered = filtered.filter((alumnus) => 
        alumnus.graduation_year === graduationYear
      );
    }
    
    if (openToCoffeeChats !== null) {
      filtered = filtered.filter((alumnus) => 
        alumnus.open_to_coffee_chats === openToCoffeeChats
      );
    }
    
    if (openToMentorship !== null) {
      filtered = filtered.filter((alumnus) => 
        alumnus.open_to_mentorship === openToMentorship
      );
    }
    
    if (availableForReferrals !== null) {
      filtered = filtered.filter((alumnus) => 
        alumnus.available_for_referrals === availableForReferrals
      );
    }
    
    set({ filteredAlumni: filtered });
  },
  
  clearFilters: () => {
    set((state) => ({
      filters: {
        location: null,
        majors: null,
        internships: null,
        graduationYear: null,
        openToCoffeeChats: null,
        openToMentorship: null,
        availableForReferrals: null,
      },
      filteredAlumni: state.alumni,
    }));
  },
  
  clearError: () => set({ error: null }),
}));