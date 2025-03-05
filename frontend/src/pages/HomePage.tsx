import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Calendar, Coffee, Briefcase } from 'lucide-react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pittDeepNavy to-pittNavy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with Pitt CS Alumni
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Build your network, find mentors, and get career advice from Pitt Computer Science graduates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Join the Network
                </Button>
              </Link>
              <Link to="/alumni">
                <Button variant="outline" size="lg" className="bg-white bg-opacity-10 border-white text-white">
                  Browse Alumni
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-pittLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-pittDeepNavy mb-12">
            Connect, Learn, and Grow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <Users className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Find Mentors</h3>
              <p className="text-gray-600">
                Connect with alumni who have been in your shoes and can guide you through your academic and career journey.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <Coffee className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Coffee Chats</h3>
              <p className="text-gray-600">
                Schedule informal conversations with alumni to get insights about companies, roles, and career paths.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <Briefcase className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Interview Prep</h3>
              <p className="text-gray-600">
                Learn about interview processes at top companies from alumni who've been through them successfully.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <Calendar className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Events</h3>
              <p className="text-gray-600">
                Participate in networking events, workshops, and panels featuring Pitt CS alumni from various industries.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/company-processes">
              <Button variant="secondary" size="lg">
                <Briefcase className="h-5 w-5 mr-2" />
                Explore Company Interview Processes
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-pittBeige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-pittDeepNavy mb-4">
                  Are You a Pitt CS Alumnus?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Give back to the PittCSC community by sharing your experiences and mentoring current students. Your insights can make a difference!
                </p>
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Join as an Alumnus
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 bg-pittDeepNavy p-8 md:p-12 text-white">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-10 w-10 text-pittGold mr-4" />
                  <h3 className="text-2xl font-bold">Alumni Benefits</h3>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>Stay connected with the PittCSC community</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>Share your professional journey and insights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>Help shape the next generation of CS professionals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>Expand your own professional network</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;