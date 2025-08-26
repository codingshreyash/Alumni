import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pittDarkNavy text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-pittGold mr-3" />
              <div>
                <h3 className="text-xl font-bold font-display">PittCSC Alumni Network</h3>
                <p className="text-xs text-pittGold">University of Pittsburgh Computer Science Club</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 max-w-md">
              Connecting Computer Science alumni, fostering mentorship, and building careers together. 
              Join our growing network of talented professionals.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <SocialLink href="https://github.com/pittcsc" icon={<Github />} label="GitHub" />
              <SocialLink href="https://linkedin.com/company/pittcsc" icon={<Linkedin />} label="LinkedIn" />
              <SocialLink href="https://twitter.com/pittcsc" icon={<Twitter />} label="Twitter" />
              <SocialLink href="mailto:alumni@pittcsc.org" icon={<Mail />} label="Email" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-pittGold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <FooterLink to="/alumni">Alumni Directory</FooterLink>
              <FooterLink to="/events">Events</FooterLink>
              <FooterLink to="/company-processes">Interview Prep</FooterLink>
              <FooterLink to="/connections">My Connections</FooterLink>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-pittGold mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="#" external>
                Pitt CSC Website
                <ExternalLink className="inline-block w-3 h-3 ml-1" />
              </FooterLink>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 p-6 bg-white/5 rounded-lg backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Stay Connected</h3>
              <p className="text-sm text-gray-300">Get updates on alumni events, career opportunities, and network news</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pittGold flex-grow md:w-64"
              />
              <button className="px-6 py-2 bg-gradient-gold text-pittDarkNavy font-semibold rounded-lg hover:shadow-glow-gold transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Pitt CSC
            </div>
            <div>
              © {currentYear} University of Pittsburgh Computer Science Club. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{
  to: string;
  children: React.ReactNode;
  external?: boolean;
}> = ({ to, children, external }) => {
  if (external) {
    return (
      <li>
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-300 hover:text-pittGold transition-colors inline-flex items-center"
        >
          {children}
        </a>
      </li>
    );
  }
  
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-gray-300 hover:text-pittGold transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
  >
    {React.cloneElement(icon as React.ReactElement, { 
      className: 'h-5 w-5 text-gray-400 group-hover:text-pittGold transition-colors' 
    })}
  </a>
);

export default Footer;