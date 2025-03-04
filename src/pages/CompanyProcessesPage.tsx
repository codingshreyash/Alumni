import React, { useState, useEffect } from 'react';
import { Search, Briefcase, CheckCircle, XCircle, ChevronDown, ChevronUp, Plus, Edit } from 'lucide-react';
import Button from '../components/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Input from '../components/Input';

interface CompanyProcess {
  id: string;
  company: string;
  logo: string;
  positions: {
    title: string;
    interviews: {
      round: string;
      description: string;
      tips: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
    }[];
  }[];
  isExpanded?: boolean;
}

interface NewCompanyFormData {
  company: string;
  logo: string;
  position: string;
  rounds: {
    round: string;
    description: string;
    tips: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
}

const CompanyProcessesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [expandedPosition, setExpandedPosition] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<CompanyProcess[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyProcess[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [newCompany, setNewCompany] = useState<NewCompanyFormData>({
    company: '',
    logo: '',
    position: '',
    rounds: [{ round: '', description: '', tips: [''], difficulty: 'Medium' }]
  });

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    // Mock data for company interview processes
    const mockCompanies: CompanyProcess[] = [
      {
        id: '1',
        company: 'Google',
        logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        positions: [
          {
            title: 'Software Engineer',
            interviews: [
              {
                round: 'Phone Screen',
                description: 'A 45-minute technical interview with a Google engineer, focusing on data structures and algorithms.',
                tips: [
                  'Practice coding on a whiteboard or Google Doc',
                  'Review basic data structures (arrays, linked lists, trees, graphs)',
                  'Be prepared to discuss time and space complexity'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Onsite - Coding',
                description: '4-5 interviews, each 45 minutes long, focusing on coding, algorithms, and system design.',
                tips: [
                  'Practice LeetCode medium/hard problems',
                  'Be vocal about your thought process',
                  'Ask clarifying questions before diving into solutions'
                ],
                difficulty: 'Hard'
              },
              {
                round: 'Onsite - System Design',
                description: 'Design a scalable system architecture for a given problem.',
                tips: [
                  'Understand distributed systems concepts',
                  'Practice designing real-world systems (e.g., URL shortener, social media feed)',
                  'Consider scalability, reliability, and performance'
                ],
                difficulty: 'Hard'
              }
            ]
          },
          {
            title: 'Product Manager',
            interviews: [
              {
                round: 'Phone Screen',
                description: 'A 30-minute interview focusing on your background and product sense.',
                tips: [
                  'Prepare your "tell me about yourself" story',
                  'Have examples of products you admire and why',
                  'Be ready to discuss product metrics'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Onsite - Product Case',
                description: 'Design a product solution for a given problem.',
                tips: [
                  'Structure your approach: problem definition, user needs, solutions, metrics',
                  'Consider business goals and technical feasibility',
                  'Be prepared to defend your decisions'
                ],
                difficulty: 'Hard'
              }
            ]
          }
        ],
        isExpanded: false
      },
      {
        id: '2',
        company: 'Microsoft',
        logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
        positions: [
          {
            title: 'Software Engineer',
            interviews: [
              {
                round: 'Phone Screen',
                description: 'A 30-minute technical interview focusing on coding and problem-solving.',
                tips: [
                  'Review basic algorithms and data structures',
                  'Practice coding in your preferred language',
                  'Be prepared to explain your approach'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Onsite - Technical',
                description: '4 interviews, each 45-60 minutes, covering coding, system design, and behavioral questions.',
                tips: [
                  'Practice coding on a whiteboard',
                  'Review object-oriented design principles',
                  'Prepare examples of past projects and challenges'
                ],
                difficulty: 'Medium'
              }
            ]
          }
        ],
        isExpanded: false
      },
      {
        id: '3',
        company: 'Amazon',
        logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png',
        positions: [
          {
            title: 'Software Development Engineer',
            interviews: [
              {
                round: 'Online Assessment',
                description: 'Coding assessment with 1-2 algorithmic problems to solve within a time limit.',
                tips: [
                  'Practice timed coding challenges',
                  'Focus on efficiency and correctness',
                  'Test your solution with multiple test cases'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Phone Screen',
                description: 'A 45-minute technical interview with coding and behavioral questions.',
                tips: [
                  'Be prepared to code in a shared document',
                  "Review Amazon's leadership principles",
                  'Have STAR method examples ready'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Onsite - Loop',
                description: "4-5 interviews focusing on coding, system design, and behavioral questions based on Amazon's leadership principles.",
                tips: [
                  "Study Amazon's leadership principles thoroughly",
                  'Prepare specific examples for each principle',
                  'Practice system design for scalable services'
                ],
                difficulty: 'Hard'
              }
            ]
          }
        ],
        isExpanded: false
      },
      {
        id: '4',
        company: 'Apple',
        logo: 'https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg',
        positions: [
          {
            title: 'Software Engineer',
            interviews: [
              {
                round: 'Phone Screen',
                description: 'Technical discussion about your background and basic technical questions.',
                tips: [
                  'Review your resume and be prepared to discuss all projects in detail',
                  'Research the specific team you are applying for',
                  'Be ready to discuss Apple products you use'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Technical Phone Interview',
                description: 'Coding and problem-solving questions related to the role.',
                tips: [
                  'Practice coding problems',
                  'Be familiar with the technologies mentioned in the job description',
                  'Prepare questions about the team and role'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Onsite',
                description: '5-6 interviews with team members, focusing on technical skills, problem-solving, and cultural fit.',
                tips: [
                  'Be prepared for whiteboard coding',
                  'Expect questions about your approach to problem-solving',
                  'Show passion for Apple products and mission'
                ],
                difficulty: 'Hard'
              }
            ]
          }
        ],
        isExpanded: false
      },
      {
        id: '5',
        company: 'Meta',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png',
        positions: [
          {
            title: 'Software Engineer',
            interviews: [
              {
                round: 'Initial Screen',
                description: 'A 45-minute technical interview focusing on coding and problem-solving.',
                tips: [
                  'Practice coding problems on LeetCode',
                  'Be comfortable with algorithms and data structures',
                  'Explain your thought process clearly'
                ],
                difficulty: 'Medium'
              },
              {
                round: 'Onsite - Coding',
                description: '2 coding interviews, each 45 minutes, focusing on algorithms and data structures.',
                tips: [
                  'Practice medium to hard LeetCode problems',
                  'Be prepared to optimize your solutions',
                  'Consider edge cases in your solutions'
                ],
                difficulty: 'Hard'
              },
              {
                round: 'Onsite - System Design',
                description: 'Design a scalable system for a given problem.',
                tips: [
                  'Study distributed systems concepts',
                  'Understand Meta scale challenges',
                  'Practice designing social media features'
                ],
                difficulty: 'Hard'
              },
              {
                round: 'Onsite - Behavioral',
                description: 'Questions about your past experiences and how you handle various situations.',
                tips: [
                  'Prepare examples using the STAR method',
                  'Research Meta values and culture',
                  'Have questions ready about the team and role'
                ],
                difficulty: 'Medium'
              }
            ]
          }
        ],
        isExpanded: false
      }
    ];
    
    setTimeout(() => {
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredCompanies(companies);
      return;
    }
    
    const filtered = companies.filter(company => 
      company.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.positions.some(position => 
        position.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredCompanies(filtered);
  };

  const toggleCompany = (companyId: string) => {
    // Update the companies array to toggle the isExpanded property
    const updatedCompanies = filteredCompanies.map(company => {
      if (company.id === companyId) {
        return { ...company, isExpanded: !company.isExpanded };
      }
      return company;
    });
    
    setFilteredCompanies(updatedCompanies);
    
    // Also update the original companies array
    const updatedAllCompanies = companies.map(company => {
      if (company.id === companyId) {
        return { ...company, isExpanded: !company.isExpanded };
      }
      return company;
    });
    
    setCompanies(updatedAllCompanies);
    
    // Update the expandedCompany state for backward compatibility
    if (expandedCompany === companyId) {
      setExpandedCompany(null);
      setExpandedPosition(null);
    } else {
      setExpandedCompany(companyId);
      setExpandedPosition(null);
    }
  };

  const togglePosition = (positionTitle: string) => {
    if (expandedPosition === positionTitle) {
      setExpandedPosition(null);
    } else {
      setExpandedPosition(positionTitle);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Form handlers
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompany({...newCompany, company: e.target.value});
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompany({...newCompany, logo: e.target.value});
  };
  
  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompany({...newCompany, position: e.target.value});
  };
  
  const handleRoundChange = (index: number, field: string, value: string) => {
    const updatedRounds = [...newCompany.rounds];
    updatedRounds[index] = {...updatedRounds[index], [field]: value};
    setNewCompany({...newCompany, rounds: updatedRounds});
  };
  
  const handleTipChange = (roundIndex: number, tipIndex: number, value: string) => {
    const updatedRounds = [...newCompany.rounds];
    const updatedTips = [...updatedRounds[roundIndex].tips];
    updatedTips[tipIndex] = value;
    updatedRounds[roundIndex].tips = updatedTips;
    setNewCompany({...newCompany, rounds: updatedRounds});
  };
  
  const addTip = (roundIndex: number) => {
    const updatedRounds = [...newCompany.rounds];
    updatedRounds[roundIndex].tips.push('');
    setNewCompany({...newCompany, rounds: updatedRounds});
  };
  
  const removeTip = (roundIndex: number, tipIndex: number) => {
    const updatedRounds = [...newCompany.rounds];
    updatedRounds[roundIndex].tips.splice(tipIndex, 1);
    setNewCompany({...newCompany, rounds: updatedRounds});
  };
  
  const addRound = () => {
    setNewCompany({
      ...newCompany, 
      rounds: [...newCompany.rounds, {
        round: '',
        description: '',
        tips: [''],
        difficulty: 'Medium'
      }]
    });
  };
  
  const removeRound = (index: number) => {
    const updatedRounds = [...newCompany.rounds];
    updatedRounds.splice(index, 1);
    setNewCompany({...newCompany, rounds: updatedRounds});
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newCompany.company || !newCompany.position || newCompany.rounds.some(r => !r.round || !r.description)) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new company or add to existing
    const existingCompanyIndex = companies.findIndex(c => 
      c.company.toLowerCase() === newCompany.company.toLowerCase()
    );
    
    let updatedCompanies = [...companies];
    
    if (existingCompanyIndex >= 0) {
      // Add position to existing company
      const existingPositionIndex = updatedCompanies[existingCompanyIndex].positions.findIndex(
        p => p.title.toLowerCase() === newCompany.position.toLowerCase()
      );
      
      if (existingPositionIndex >= 0) {
        // Update existing position
        updatedCompanies[existingCompanyIndex].positions[existingPositionIndex].interviews = [
          ...updatedCompanies[existingCompanyIndex].positions[existingPositionIndex].interviews,
          ...newCompany.rounds
        ];
      } else {
        // Add new position
        updatedCompanies[existingCompanyIndex].positions.push({
          title: newCompany.position,
          interviews: newCompany.rounds
        });
      }
    } else {
      // Create new company
      const newCompanyObj: CompanyProcess = {
        id: (companies.length + 1).toString(),
        company: newCompany.company,
        logo: newCompany.logo || 'https://via.placeholder.com/150',
        positions: [{
          title: newCompany.position,
          interviews: newCompany.rounds
        }],
        isExpanded: false
      };
      
      updatedCompanies.push(newCompanyObj);
    }
    
    // Update state
    setCompanies(updatedCompanies);
    setFilteredCompanies(updatedCompanies);
    
    // Reset form
    setNewCompany({
      company: '',
      logo: '',
      position: '',
      rounds: [{ round: '', description: '', tips: [''], difficulty: 'Medium' }]
    });
    
    // Close form
    setShowAddForm(false);
    
    // Show success message
    alert('Interview process added successfully!');
  };

  return (
    <div className="min-h-screen bg-pittLight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pittDeepNavy">Company Interview Processes</h1>
            <p className="text-gray-600 mt-1">
              Learn about interview processes at top tech companies from PittCSC alumni experiences
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button
              variant="primary"
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center"
            >
              {showAddForm ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Interview Process
                </>
              )}
            </Button>
          </div>
        </div>
        
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold text-pittDeepNavy">Share Your Interview Experience</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                      value={newCompany.company}
                      onChange={handleCompanyChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Logo URL (optional)
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                      value={newCompany.logo}
                      onChange={handleLogoChange}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position Title*
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                    value={newCompany.position}
                    onChange={handlePositionChange}
                    placeholder="Software Engineer, Product Manager, etc."
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-pittDeepNavy">Interview Rounds</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRound}
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Round
                    </Button>
                  </div>
                  
                  {newCompany.rounds.map((round, roundIndex) => (
                    <div key={roundIndex} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-pittNavy">Round {roundIndex + 1}</h4>
                        {newCompany.rounds.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRound(roundIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Round Name*
                          </label>
                          <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                            value={round.round}
                            onChange={(e) => handleRoundChange(roundIndex, 'round', e.target.value)}
                            placeholder="Phone Screen, Onsite, etc."
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Difficulty
                          </label>
                          <select
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                            value={round.difficulty}
                            onChange={(e) => handleRoundChange(roundIndex, 'difficulty', e.target.value as 'Easy' | 'Medium' | 'Hard')}
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description*
                        </label>
                        <textarea
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                          value={round.description}
                          onChange={(e) => handleRoundChange(roundIndex, 'description', e.target.value)}
                          rows={3}
                          placeholder="Describe the interview format, duration, and focus areas..."
                          required
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Tips for Success
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addTip(roundIndex)}
                            className="flex items-center text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Tip
                          </Button>
                        </div>
                        
                        {round.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-center mb-2">
                            <input
                              type="text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                              value={tip}
                              onChange={(e) => handleTipChange(roundIndex, tipIndex, e.target.value)}
                              placeholder="Share a helpful tip..."
                            />
                            {round.tips.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTip(roundIndex, tipIndex)}
                                className="ml-2 text-red-600 hover:text-red-800"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Submit Interview Process
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pittNavy focus:border-pittNavy sm:text-sm"
                placeholder="Search companies or positions..."
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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pittNavy"></div>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-pittDeepNavy mb-2">No companies found</h3>
            <p className="text-gray-600 mb-4">
              No companies match your search criteria. Try a different search term.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilteredCompanies(companies);
              }}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="overflow-hidden">
                <div 
                  className="px-6 py-4 border-b border-gray-200 bg-white cursor-pointer"
                  onClick={() => toggleCompany(company.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={company.logo} 
                        alt={`${company.company} logo`} 
                        className="h-10 w-10 mr-4 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://via.placeholder.com/150?text=' + company.company;
                        }}
                      />
                      <h2 className="text-xl font-semibold text-pittDeepNavy">{company.company}</h2>
                    </div>
                    {company.isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {company.isExpanded && (
                  <CardBody className="bg-gray-50">
                    <div className="space-y-4">
                      {company.positions.map((position) => (
                        <div key={position.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div 
                            className="px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                            onClick={() => togglePosition(position.title)}
                          >
                            <h3 className="text-lg font-medium text-pittNavy">{position.title}</h3>
                            {expandedPosition === position.title ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          
                          {expandedPosition === position.title && (
                            <div className="px-4 py-3">
                              <div className="space-y-6">
                                {position.interviews.map((interview, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                    <div className="flex justify-between items-center mb-2">
                                      <h4 className="text-md font-semibold text-gray-800">{interview.round}</h4>
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(interview.difficulty)}`}>
                                        {interview.difficulty}
                                      </span>
                                    </div>
                                    <p className="text-gray-600 mb-3">{interview.description}</p>
                                    
                                    <div className="bg-gray-50 p-3 rounded-md">
                                      <h5 className="text-sm font-medium text-gray-700 mb-2">Alumni Tips:</h5>
                                      <ul className="space-y-1 text-sm text-gray-600">
                                        {interview.tips.map((tip, tipIndex) => (
                                          <li key={tipIndex} className="flex items-start">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{tip}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                )}
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">Contribute Your Experience</h2>
          <p className="text-gray-600 mb-4">
            Help fellow PittCSC members by sharing your interview experiences at companies you've interviewed with.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Share Interview Experience
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProcessesPage;