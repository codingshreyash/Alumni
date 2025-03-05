import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAlumniStore } from '../store/alumniStore';
import { useConnectionStore } from '../store/connectionStore';
import { Search, Filter, X, Plus } from 'lucide-react';
import AlumniCard from '../components/AlumniCard';
import ConnectionRequestModal from '../components/ConnectionRequestModal';
import Button from '../components/Button';

const AlumniListPage: React.FC = () => {
  const { user } = useAuthStore();
  const { alumni, filteredAlumni, filters, fetchAlumni, applyFilters, clearFilters, isLoading } = useAlumniStore();
  const { createConnectionRequest } = useConnectionStore();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  
  // Filter states
  const [location, setLocation] = useState('');
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedInternships, setSelectedInternships] = useState<string[]>([]);
  const [graduationYear, setGraduationYear] = useState<number | null>(null);
  const [openToCoffeeChats, setOpenToCoffeeChats] = useState<boolean | null>(null);
  const [openToMentorship, setOpenToMentorship] = useState<boolean | null>(null);
  const [availableForReferrals, setAvailableForReferrals] = useState<boolean | null>(null);
  
  // Custom internship input
  const [customInternship, setCustomInternship] = useState('');
  
  // Derived data for filter options
  const [uniqueMajors, setUniqueMajors] = useState<string[]>([]);
  const [uniqueInternships, setUniqueInternships] = useState<string[]>([]);
  const [uniqueYears, setUniqueYears] = useState<number[]>([]);
  
  useEffect(() => {
    // For the mock version, we'll skip the auth check
    // In a real app, this would redirect to login if not authenticated
    /*
    if (!user) {
      navigate('/login');
      return;
    }
    */
    
    // Load mock data if alumni array is empty
    if (alumni.length === 0) {
      fetchAlumni();
    }
  }, [navigate, fetchAlumni, alumni.length]);
  
  useEffect(() => {
    if (alumni.length > 0) {
      // Extract unique majors
      const majors = new Set<string>();
      alumni.forEach((alumnus) => {
        if (alumnus.majors) {
          alumnus.majors.forEach((major: string) => majors.add(major));
        }
      });
      setUniqueMajors(Array.from(majors).sort());
      
      // Extract unique internships
      const internships = new Set<string>();
      alumni.forEach((alumnus) => {
        if (alumnus.internships) {
          alumnus.internships.forEach((internship: string) => internships.add(internship));
        }
      });
      setUniqueInternships(Array.from(internships).sort());
      
      // Extract unique graduation years
      const years = new Set<number>();
      alumni.forEach((alumnus) => {
        if (alumnus.graduation_year) {
          years.add(alumnus.graduation_year);
        }
      });
      setUniqueYears(Array.from(years).sort((a, b) => b - a)); // Sort descending
    }
  }, [alumni]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple search implementation
    const searchResults = alumni.filter((alumnus) => {
      const fullName = alumnus.full_name.toLowerCase();
      const search = searchTerm.toLowerCase();
      
      return fullName.includes(search);
    });
    
    // Apply existing filters to search results
    applyFilters({
      ...filters,
      searchResults: searchResults,
    });
  };
  
  const handleApplyFilters = () => {
    applyFilters({
      location,
      majors: selectedMajors.length > 0 ? selectedMajors : null,
      internships: selectedInternships.length > 0 ? selectedInternships : null,
      graduationYear,
      openToCoffeeChats,
      openToMentorship,
      availableForReferrals,
    });
    
    setShowFilters(false);
  };
  
  const handleClearFilters = () => {
    setLocation('');
    setSelectedMajors([]);
    setSelectedInternships([]);
    setGraduationYear(null);
    setOpenToCoffeeChats(null);
    setOpenToMentorship(null);
    setAvailableForReferrals(null);
    
    clearFilters();
  };
  
  const handleRequestConnection = (alumnus: any) => {
    setSelectedAlumni(alumnus);
    setShowConnectionModal(true);
  };
  
  const handleSubmitConnectionRequest = async (message: string) => {
    if (!selectedAlumni) return;
    
    try {
      // For mock version, we'll just show an alert
      // In a real app, this would call the createConnectionRequest function
      alert(`Connection request sent to ${selectedAlumni.full_name} with message: ${message}`);
      setShowConnectionModal(false);
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };
  
  const toggleMajor = (major: string) => {
    if (selectedMajors.includes(major)) {
      setSelectedMajors(selectedMajors.filter((m) => m !== major));
    } else {
      setSelectedMajors([...selectedMajors, major]);
    }
  };
  
  const toggleInternship = (internship: string) => {
    if (selectedInternships.includes(internship)) {
      setSelectedInternships(selectedInternships.filter((i) => i !== internship));
    } else {
      setSelectedInternships([...selectedInternships, internship]);
    }
  };
  
  const addCustomInternship = () => {
    if (customInternship && !selectedInternships.includes(customInternship)) {
      setSelectedInternships([...selectedInternships, customInternship]);
      setCustomInternship('');
    }
  };
  
  // Use mock data for demonstration
  const displayAlumni = filteredAlumni.length > 0 ? filteredAlumni : alumni;
  
  return (
    <div className="min-h-screen bg-pittLight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pittDeepNavy">Browse Alumni</h1>
            <p className="text-gray-600 mt-1">
              Connect with PittCSC alumni for mentorship, advice, and networking
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pittNavy focus:border-pittNavy sm:text-sm"
                placeholder="Search alumni by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="ml-2"
            >
              Search
            </Button>
          </form>
        </div>
        
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-pittDeepNavy">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pittNavy focus:border-pittNavy sm:text-sm"
                  placeholder="City, State, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pittNavy focus:border-pittNavy sm:text-sm"
                  value={graduationYear?.toString() || ''}
                  onChange={(e) => setGraduationYear(e.target.value ? parseInt(e.target.value, 10) : null)}
                >
                  <option value="">Any Year</option>
                  {uniqueYears.length > 0 ? (
                    uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))
                  ) : (
                    [2020, 2021, 2022, 2023].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="coffee-chats"
                      type="checkbox"
                      className="h-4 w-4 text-pittNavy border-gray-300 rounded focus:ring-pittNavy"
                      checked={openToCoffeeChats === true}
                      onChange={() => setOpenToCoffeeChats(openToCoffeeChats === true ? null : true)}
                    />
                    <label htmlFor="coffee-chats" className="ml-2 text-sm text-gray-700">
                      Open to Coffee Chats
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="mentorship"
                      type="checkbox"
                      className="h-4 w-4 text-pittNavy border-gray-300 rounded focus:ring-pittNavy"
                      checked={openToMentorship === true}
                      onChange={() => setOpenToMentorship(openToMentorship === true ? null : true)}
                    />
                    <label htmlFor="mentorship" className="ml-2 text-sm text-gray-700">
                      Open to Mentorship
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="referrals"
                      type="checkbox"
                      className="h-4 w-4 text-pittNavy border-gray-300 rounded focus:ring-pittNavy"
                      checked={availableForReferrals === true}
                      onChange={() => setAvailableForReferrals(availableForReferrals === true ? null : true)}
                    />
                    <label htmlFor="referrals" className="ml-2 text-sm text-gray-700">
                      Available for Referrals
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Majors
              </label>
              <div className="flex flex-wrap gap-2">
                {uniqueMajors.length > 0 ? (
                  uniqueMajors.map((major) => (
                    <button
                      key={major}
                      type="button"
                      onClick={() => toggleMajor(major)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedMajors.includes(major)
                          ? 'bg-pittNavy text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {major}
                    </button>
                  ))
                ) : (
                  ['Computer Science', 'Information Science', 'Computer Engineering', 'Data Science', 'Digital Narrative and Interactive Design'].map((major) => (
                    <button
                      key={major}
                      type="button"
                      onClick={() => toggleMajor(major)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedMajors.includes(major)
                          ? 'bg-pittNavy text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {major}
                    </button>
                  ))
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internship Experience
              </label>
              
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  className="block flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pittNavy focus:border-pittNavy sm:text-sm"
                  placeholder="Add custom company..."
                  value={customInternship}
                  onChange={(e) => setCustomInternship(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomInternship();
                    }
                  }}
                />
                <Button
                  variant="secondary"
                  onClick={addCustomInternship}
                  disabled={!customInternship}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {uniqueInternships.length > 0 ? (
                  uniqueInternships.slice(0, 15).map((internship) => (
                    <button
                      key={internship}
                      type="button"
                      onClick={() => toggleInternship(internship)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedInternships.includes(internship)
                          ? 'bg-pittNavy text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {internship}
                    </button>
                  ))
                ) : (
                  ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'Twitter', 'Intel', 'IBM', 'Uber', 'Lyft'].map((internship) => (
                    <button
                      key={internship}
                      type="button"
                      onClick={() => toggleInternship(internship)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedInternships.includes(internship)
                          ? 'bg-pittNavy text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {internship}
                    </button>
                  ))
                )}
              </div>
              
              {selectedInternships.length > 0 && (
                <div className="w-full mt-2">
                  <p className="text-sm text-gray-500 mb-1">Selected companies:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedInternships.map((internship) => (
                      <span key={internship} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pittNavy text-white">
                        {internship}
                        <button
                          type="button"
                          className="ml-1 text-white hover:text-gray-200"
                          onClick={() => toggleInternship(internship)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAlumni.map((alumnus) => (
            <AlumniCard
              key={alumnus.id}
              alumnus={alumnus}
              onRequestConnection={() => handleRequestConnection(alumnus)}
            />
          ))}
        </div>
      </div>
      
      {showConnectionModal && selectedAlumni && (
        <ConnectionRequestModal
          alumnus={selectedAlumni}
          onClose={() => setShowConnectionModal(false)}
          onSubmit={handleSubmitConnectionRequest}
        />
      )}
    </div>
  );
};

export default AlumniListPage;