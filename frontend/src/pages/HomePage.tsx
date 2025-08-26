import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Briefcase, 
  Network,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  CheckCircle
} from 'lucide-react';
import Hero from '../components/home/Hero';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-pittDarkNavy mb-4">
              Why Join Our Network?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with a vibrant community of Pitt CSC alumni and unlock opportunities for growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users />}
              title="Alumni Directory"
              description="Browse profiles of successful alumni working at top tech companies worldwide"
              color="text-pittNavy"
              bgColor="bg-pittNavy/10"
            />
            <FeatureCard
              icon={<Briefcase />}
              title="Career Opportunities"
              description="Get referrals and discover job openings through our alumni network"
              color="text-pittGold"
              bgColor="bg-pittGold/10"
            />
            <FeatureCard
              icon={<Network />}
              title="Mentorship Program"
              description="Connect with experienced professionals for guidance and career advice"
              color="text-green-600"
              bgColor="bg-green-100"
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Interview Prep"
              description="Access interview experiences and tips from alumni at your target companies"
              color="text-purple-600"
              bgColor="bg-purple-100"
            />
            <FeatureCard
              icon={<Award />}
              title="Exclusive Events"
              description="Attend alumni meetups, tech talks, and networking events"
              color="text-red-600"
              bgColor="bg-red-100"
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="Career Growth"
              description="Learn from alumni experiences and accelerate your professional development"
              color="text-blue-600"
              bgColor="bg-blue-100"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-pittDarkNavy mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with the Pitt CSC Alumni Network in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create Your Profile"
              description="Sign up and complete your professional profile with your experience and interests"
              icon={<Users />}
            />
            <StepCard
              number="2"
              title="Connect & Network"
              description="Browse alumni profiles, send connection requests, and build your network"
              icon={<Network />}
            />
            <StepCard
              number="3"
              title="Grow Together"
              description="Engage with the community, share opportunities, and help each other succeed"
              icon={<TrendingUp />}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-pitt text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">
                Accelerate Your Career with Alumni Support
              </h2>
              <p className="text-lg mb-8 text-gray-200">
                Whether you're a recent graduate or an experienced professional, 
                our network provides the connections and resources you need to succeed.
              </p>
              
              <div className="space-y-4">
                <BenefitItem text="Get referrals to top tech companies" />
                <BenefitItem text="Learn from interview experiences" />
                <BenefitItem text="Find mentors in your field of interest" />
                <BenefitItem text="Discover job opportunities before they're public" />
                <BenefitItem text="Build lasting professional relationships" />
              </div>
              
              <div className="mt-8">
                <Link to="/alumni">
                  <Button variant="secondary" size="lg" rightIcon={<ArrowRight />}>
                    Explore Alumni Profiles
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <StatCard value="95%" label="Job Placement Rate" />
                <StatCard value="$125k" label="Average Starting Salary" />
              </div>
              <div className="space-y-4 mt-8">
                <StatCard value="500+" label="Active Alumni" />
                <StatCard value="150+" label="Partner Companies" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-pittGold/10 to-pittGold/5 rounded-2xl p-12 border border-pittGold/20">
            <Zap className="h-12 w-12 text-pittGold mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-pittDarkNavy mb-4">
              Ready to Join the Network?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with fellow Pitt CSC alumni and take your career to the next level. 
              Registration is free and takes less than 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" rightIcon={<ArrowRight />}>
                  Create Your Profile
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = ({ icon, title, description, color, bgColor }) => (
  <Card hover className="text-center group">
    <div className={`inline-flex p-4 rounded-full ${bgColor} mb-4 group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon as React.ReactElement, { className: `h-8 w-8 ${color}` })}
    </div>
    <h3 className="text-xl font-semibold text-pittDarkNavy mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

const StepCard: React.FC<{
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ number, title, description, icon }) => (
  <div className="relative">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center text-pittDarkNavy font-bold text-xl shadow-lg">
      {number}
    </div>
    <Card className="pt-8">
      <div className="flex justify-center mb-4 text-pittNavy">
        {React.cloneElement(icon as React.ReactElement, { className: 'h-10 w-10' })}
      </div>
      <h3 className="text-xl font-semibold text-pittDarkNavy mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  </div>
);

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start">
    <CheckCircle className="h-6 w-6 text-pittGold mr-3 flex-shrink-0 mt-0.5" />
    <span className="text-gray-100">{text}</span>
  </div>
);

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
    <div className="text-3xl font-bold text-pittGold mb-2">{value}</div>
    <div className="text-sm text-gray-200">{label}</div>
  </div>
);

export default HomePage;