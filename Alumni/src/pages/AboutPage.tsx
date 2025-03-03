import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Shield, Code } from 'lucide-react';
import Button from '../components/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pittLight">
      {/* Hero Section */}
      <section className="bg-pittDeepNavy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <GraduationCap className="h-16 w-16 text-pittGold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About PittCSC Alumni Network
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connecting Pitt Computer Science students with alumni for mentorship, networking, and career opportunities.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittDeepNavy mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To foster meaningful connections between current Pitt CS students and alumni, creating a supportive community that enhances career development and professional growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <Users className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Connect</h3>
              <p className="text-gray-600">
                Build meaningful relationships between students and alumni who share similar interests, career paths, and goals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <GraduationCap className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Mentor</h3>
              <p className="text-gray-600">
                Provide guidance, advice, and support to help students navigate their academic and professional journeys.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-pittGold bg-opacity-20 p-3 rounded-full">
                  <Code className="h-8 w-8 text-pittDeepNavy" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pittDeepNavy">Grow</h3>
              <p className="text-gray-600">
                Foster professional development and create opportunities for both students and alumni to advance their careers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-pittBeige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pittDeepNavy mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy for students to connect with alumni and for alumni to give back to the Pitt CS community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-pittDeepNavy mb-4">For Students</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">1</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Create an account</h4>
                    <p className="text-gray-600">Sign up with your Pitt email address and complete your profile.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">2</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Browse alumni profiles</h4>
                    <p className="text-gray-600">Search and filter alumni by location, major, company, and more.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">3</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Send connection requests</h4>
                    <p className="text-gray-600">Reach out to alumni with a personalized message explaining why you'd like to connect.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">4</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Connect and learn</h4>
                    <p className="text-gray-600">Once approved, communicate directly with alumni for mentorship, advice, and networking.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-pittDeepNavy mb-4">For Alumni</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">1</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Join the network</h4>
                    <p className="text-gray-600">Create an account with your Pitt email and complete your alumni profile.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">2</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Set your availability</h4>
                    <p className="text-gray-600">Indicate your willingness for coffee chats, mentorship, or referrals.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">3</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Review connection requests</h4>
                    <p className="text-gray-600">Receive and respond to connection requests from current students.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pittGold text-white flex items-center justify-center font-bold">4</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-pittDeepNavy">Give back</h4>
                    <p className="text-gray-600">Share your experiences and insights to help guide the next generation of Pitt CS graduates.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Privacy & Security Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-pittDeepNavy p-8 md:p-12 text-white">
                <div className="flex items-center mb-4">
                  <Shield className="h-10 w-10 text-pittGold mr-4" />
                  <h3 className="text-2xl font-bold">Privacy & Security</h3>
                </div>
                <p className="mb-6">
                  We take the privacy and security of our users seriously. Your personal information is protected and only shared with your explicit consent.
                </p>
                <Link to="/privacy">
                  <Button
                    variant="outline"
                    className="bg-white bg-opacity-10 border-white text-white"
                  >
                    Privacy Policy
                  </Button>
                </Link>
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-pittDeepNavy mb-4">Our Commitment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>Your email address is only revealed when you accept a connection request</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>All users must sign up with a verified @pitt.edu email address</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>Alumni profiles are verified by PittCSC administrators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>You control your profile visibility and can update your preferences at any time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pittGold mr-2">•</span>
                    <span>We use industry-standard security practices to protect your data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-pittNavy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the PittCSC Alumni Network?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a current student looking for guidance or an alumnus wanting to give back, join our community today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Create an Account
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="bg-white bg-opacity-10 border-white text-white"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;