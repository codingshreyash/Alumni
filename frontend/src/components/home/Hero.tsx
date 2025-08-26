import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Network, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pittDarkNavy via-pittDeepNavy to-pittNavy">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFB81C" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-pittGold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pittGold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-subtle"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-pittGold/20 border border-pittGold/30 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4 text-pittGold mr-2" />
          <span className="text-sm font-medium text-pittGold">Welcome to the Network</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-slide-up">
          Connect with
          <span className="block text-pittGold mt-2">Pitt CSC Alumni</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-slide-up animation-delay-100">
          Join a thriving network of Computer Science alumni from the University of Pittsburgh. 
          Find mentors, explore career opportunities, and stay connected with your community.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up animation-delay-200">
          <Link
            to="/register"
            className="group inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-gold text-pittDarkNavy font-semibold text-lg hover:shadow-glow-gold transition-all transform hover:scale-105"
          >
            Join the Network
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/alumni"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
          >
            Browse Alumni
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-300">
          <StatCard icon={<Users />} value="500+" label="Active Alumni" />
          <StatCard icon={<Briefcase />} value="150+" label="Companies" />
          <StatCard icon={<Network />} value="1000+" label="Connections" />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-pittGold/50 flex justify-center">
          <div className="w-1 h-3 bg-pittGold rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
}> = ({ icon, value, label }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
    <div className="flex justify-center text-pittGold mb-3">
      {React.cloneElement(icon as React.ReactElement, { className: 'h-8 w-8' })}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

export default Hero;