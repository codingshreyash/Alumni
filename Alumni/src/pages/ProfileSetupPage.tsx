import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

// Step 1: Location
const LocationStep: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}> = ({ value, onChange, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">Where are you currently located?</h2>
      <p className="text-gray-600">
        This helps students connect with alumni in their desired locations.
      </p>
      
      <Input
        label="Current Location (City, State, Country)"
        placeholder="Pittsburgh, PA, USA"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!value}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 2: Major
const MajorStep: React.FC<{
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [selectedMajor, setSelectedMajor] = useState('');
  const [customMajor, setCustomMajor] = useState('');
  
  const majorOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Information Science', label: 'Information Science' },
    { value: 'Computer Engineering', label: 'Computer Engineering' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Digital Narrative and Interactive Design', label: 'Digital Narrative and Interactive Design' },
    { value: 'Other', label: 'Other (specify)' },
  ];
  
  const handleAddMajor = () => {
    if (selectedMajor === 'Other' && customMajor) {
      if (!value.includes(customMajor)) {
        onChange([...value, customMajor]);
      }
      setCustomMajor('');
    } else if (selectedMajor && selectedMajor !== 'Other') {
      if (!value.includes(selectedMajor)) {
        onChange([...value, selectedMajor]);
      }
    }
    setSelectedMajor('');
  };
  
  const handleRemoveMajor = (major: string) => {
    onChange(value.filter((m) => m !== major));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">What did you study at Pitt?</h2>
      <p className="text-gray-600">
        Select all majors and minors that apply to you.
      </p>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Select
              options={majorOptions}
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              label="Select Major/Minor"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={handleAddMajor}
              disabled={!selectedMajor || (selectedMajor === 'Other' && !customMajor)}
            >
              Add
            </Button>
          </div>
        </div>
        
        {selectedMajor === 'Other' && (
          <Input
            label="Specify Major/Minor"
            value={customMajor}
            onChange={(e) => setCustomMajor(e.target.value)}
          />
        )}
        
        {value.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selected Majors/Minors
            </label>
            <div className="bg-gray-50 p-3 rounded-md">
              <ul className="space-y-1">
                {value.map((major) => (
                  <li key={major} className="flex justify-between items-center">
                    <span>{major}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMajor(major)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={value.length === 0}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 3: Internships
const InternshipsStep: React.FC<{
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [internship, setInternship] = useState('');
  
  const handleAddInternship = () => {
    if (internship && !value.includes(internship)) {
      onChange([...value, internship]);
      setInternship('');
    }
  };
  
  const handleRemoveInternship = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">Where have you interned?</h2>
      <p className="text-gray-600">
        Add companies where you've completed internships. This helps students connect with alumni who have experience at specific companies.
      </p>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Input
              label="Company Name"
              placeholder="e.g., Google, Microsoft, etc."
              value={internship}
              onChange={(e) => setInternship(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={handleAddInternship}
              disabled={!internship}
            >
              Add
            </Button>
          </div>
        </div>
        
        {value.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Internship Experience
            </label>
            <div className="bg-gray-50 p-3 rounded-md">
              <ul className="space-y-1">
                {value.map((item) => (
                  <li key={item} className="flex justify-between items-center">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInternship(item)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 4: Interviews Passed
const InterviewsStep: React.FC<{
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [interview, setInterview] = useState('');
  
  const handleAddInterview = () => {
    if (interview && !value.includes(interview)) {
      onChange([...value, interview]);
      setInterview('');
    }
  };
  
  const handleRemoveInterview = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">Which companies have you passed interviews with?</h2>
      <p className="text-gray-600">
        Add companies where you've successfully passed interviews. This helps students connect with alumni who can provide interview advice.
      </p>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Input
              label="Company Name"
              placeholder="e.g., Amazon, Facebook, etc."
              value={interview}
              onChange={(e) => setInterview(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={handleAddInterview}
              disabled={!interview}
            >
              Add
            </Button>
          </div>
        </div>
        
        {value.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Experience
            </label>
            <div className="bg-gray-50 p-3 rounded-md">
              <ul className="space-y-1">
                {value.map((item) => (
                  <li key={item} className="flex justify-between items-center">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterview(item)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 5: Graduation Year
const GraduationYearStep: React.FC<{
  value: number | null;
  onChange: (value: number) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">When did you graduate?</h2>
      <p className="text-gray-600">
        Select your graduation year from Pitt.
      </p>
      
      <Select
        label="Graduation Year"
        options={years.map((year) => ({ value: year.toString(), label: year.toString() }))}
        value={value?.toString() || ''}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        required
      />
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!value}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 6: LinkedIn URL
const LinkedInStep: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ value, onChange, onNext, onPrev }) => {
  const [error, setError] = useState('');
  
  const validateLinkedIn = (url: string) => {
    if (!url) return true;
    
    const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedInRegex.test(url);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    
    if (url && !validateLinkedIn(url)) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
    } else {
      setError('');
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">What's your LinkedIn profile?</h2>
      <p className="text-gray-600">
        Add your LinkedIn URL to help students learn more about your professional background.
      </p>
      
      <Input
        label="LinkedIn URL"
        placeholder="https://linkedin.com/in/username"
        value={value}
        onChange={handleChange}
        error={error}
      />
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!!error}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 7: Availability
const AvailabilityStep: React.FC<{
  values: {
    openToCoffeeChats: boolean;
    openToMentorship: boolean;
    availableForReferrals: boolean;
  };
  onChange: (key: keyof typeof values, value: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ values, onChange, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">How would you like to help students?</h2>
      <p className="text-gray-600">
        Select the ways you're willing to connect with and support current Pitt CS students.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="coffeeChats"
              name="coffeeChats"
              type="checkbox"
              className="h-4 w-4 text-pittNavy border-gray-300 rounded focus:ring-pittNavy"
              checked={values.openToCoffeeChats}
              onChange={(e) => onChange('openToCoffeeChats', e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="coffeeChats" className="font-medium text-gray-700">
              Open to Coffee Chats
            </label>
            <p className="text-gray-500">
              Willing to have informal conversations with students about your career path and experiences.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="mentorship"
              name="mentorship"
              type="checkbox"
              className="h-4 w-4 text-pittNavy border-gray-300 rounded focus:ring-pittNavy"
              checked={values.openToMentorship}
              onChange={(e) => onChange('openToMentorship', e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="mentorship" className="font-medium text-gray-700">
              Open to Mentorship
            </label>
            <p className="text-gray-500">
              Willing to provide ongoing guidance and support to students over a longer period.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="referrals"
              name="referrals"
              type="checkbox"
              className="h-4 w-4 text-pittNavy border-gray-300 rounded focus:ring-pittNavy"
              checked={values.availableForReferrals}
              onChange={(e) => onChange('availableForReferrals', e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="referrals" className="font-medium text-gray-700">
              Available for Referrals
            </label>
            <p className="text-gray-500">
              Willing to refer qualified students for positions at your company.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Step 8: Additional Info
const AdditionalInfoStep: React.FC<{
  values: {
    personalWebsite: string;
    additionalNotes: string;
  };
  onChange: (key: keyof typeof values, value: string) => void;
  onSubmit: () => void;
  onPrev: () => void;
}> = ({ values, onChange, onSubmit, onPrev }) => {
  const [websiteError, setWebsiteError] = useState('');
  
  const validateWebsite = (url: string) => {
    if (!url) return true;
    
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange('personalWebsite', url);
    
    if (url && !validateWebsite(url)) {
      setWebsiteError('Please enter a valid URL (e.g., https://example.com)');
    } else {
      setWebsiteError('');
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pittDeepNavy">Additional Information</h2>
      <p className="text-gray-600">
        Add any other details you'd like to share with students.
      </p>
      
      <Input
        label="Personal Website (Optional)"
        placeholder="https://example.com"
        value={values.personalWebsite}
        onChange={handleWebsiteChange}
        error={websiteError}
      />
      
      <div>
        <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes (Optional)
        </label>
        <textarea
          id="additionalNotes"
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
          placeholder="Share any other information that might be helpful for students..."
          value={values.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
        />
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!!websiteError}
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
};

const ProfileSetupPage: React.FC = () => {
  const { user, profile, getProfile } = useAuthStore();
  const { currentStep, setCurrentStep, updateProfile, isLoading, error } = useProfileStore();
  const navigate = useNavigate();
  
  const [location, setLocation] = useState('');
  const [majors, setMajors] = useState<string[]>([]);
  const [internships, setInternships] = useState<string[]>([]);
  const [interviewsPassed, setInterviewsPassed] = useState<string[]>([]);
  const [graduationYear, setGraduationYear] = useState<number | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [personalWebsite, setPersonalWebsite] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [openToCoffeeChats, setOpenToCoffeeChats] = useState(false);
  const [openToMentorship, setOpenToMentorship] = useState(false);
  const [availableForReferrals, setAvailableForReferrals] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (profile?.profile_completed) {
      navigate('/profile');
    } else {
      getProfile();
    }
  }, [user, profile, navigate, getProfile]);
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleAvailabilityChange = (key: string, value: boolean) => {
    if (key === 'openToCoffeeChats') setOpenToCoffeeChats(value);
    if (key === 'openToMentorship') setOpenToMentorship(value);
    if (key === 'availableForReferrals') setAvailableForReferrals(value);
   };

  const handleAdditionalInfoChange = (key: string, value: string) => {
    if (key === 'personalWebsite') setPersonalWebsite(value);
    if (key === 'additionalNotes') setAdditionalNotes(value);
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    try {
      await updateProfile(user.id, {
        location,
        majors,
        internships,
        interviews_passed: interviewsPassed,
        graduation_year: graduationYear,
        linkedin_url: linkedinUrl,
        personal_website: personalWebsite,
        additional_notes: additionalNotes,
        open_to_coffee_chats: openToCoffeeChats,
        open_to_mentorship: openToMentorship,
        available_for_referrals: availableForReferrals,
        profile_completed: true,
        profile_visible: true,
        is_alumni: true, // Mark as alumni, will need admin approval
      });
      
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LocationStep
            value={location}
            onChange={setLocation}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <MajorStep
            value={majors}
            onChange={setMajors}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <InternshipsStep
            value={internships}
            onChange={setInternships}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <InterviewsStep
            value={interviewsPassed}
            onChange={setInterviewsPassed}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <GraduationYearStep
            value={graduationYear}
            onChange={setGraduationYear}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 6:
        return (
          <LinkedInStep
            value={linkedinUrl}
            onChange={setLinkedinUrl}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 7:
        return (
          <AvailabilityStep
            values={{
              openToCoffeeChats,
              openToMentorship,
              availableForReferrals,
            }}
            onChange={handleAvailabilityChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 8:
        return (
          <AdditionalInfoStep
            values={{
              personalWebsite,
              additionalNotes,
            }}
            onChange={handleAdditionalInfoChange}
            onSubmit={handleSubmit}
            onPrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-pittLight py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-pittDeepNavy text-white">
            <h1 className="text-2xl font-bold">Complete Your Alumni Profile</h1>
            <p className="text-sm mt-1">
              Step {currentStep} of 8
            </p>
          </div>
          
          <div className="px-6 py-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-pittGold h-2.5 rounded-full"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              ></div>
            </div>
            
            {/* Steps */}
            <div className="flex overflow-x-auto pb-4 mb-6">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((step) => (
                <div
                  key={step}
                  className={`flex flex-col items-center mx-2 ${
                    step <= currentStep ? 'text-pittNavy' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step < currentStep
                        ? 'bg-pittGold text-white'
                        : step === currentStep
                        ? 'bg-pittNavy text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;