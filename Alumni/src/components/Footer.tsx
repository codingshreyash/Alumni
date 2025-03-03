import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Linkedin, Briefcase } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pittDeepNavy text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-pittGold" />
              <span className="ml-2 text-xl font-bold">PittCSC Alumni</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              Connecting Pitt Computer Science students with alumni for mentorship, networking, and career opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="text-gray-300 hover:text-white transition-colors">
                  Browse Alumni
                </Link>
              </li>
              <li>
                <Link to="/company-processes" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Interview Processes
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with PittCSC</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/pittcsc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/pitt-computer-science-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Have questions? Email us at{' '}
              <a
                href="mailto:pittcsc@gmail.com"
                className="text-pittGold hover:underline"
              >
                pittcsc@gmail.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Pitt Computer Science Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;