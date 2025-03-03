import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pittLight py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-pittNavy hover:text-pittDeepNavy">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-pittDeepNavy text-white flex items-center">
            <Shield className="h-6 w-6 mr-2 text-pittGold" />
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
          </div>
          
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: May 15, 2025
              </p>
              
              <p className="mb-4">
                The PittCSC Alumni Database ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">1. Information We Collect</h2>
              <p className="mb-2">We collect the following types of information:</p>
              
              <h3 className="text-lg font-medium text-pittDeepNavy mb-2">1.1 Personal Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Name</li>
                <li>Email address (@pitt.edu)</li>
                <li>Graduation year</li>
                <li>Major(s)</li>
                <li>Current location</li>
                <li>LinkedIn URL (optional)</li>
                <li>Personal website (optional)</li>
                <li>Internship experience</li>
                <li>Interview experience</li>
                <li>Additional notes you choose to provide</li>
              </ul>
              
              <h3 className="text-lg font-medium text-pittDeepNavy mb-2">1.2 Usage Data</h3>
              <p className="mb-4">
                We may also collect information about how the Service is accessed and used. This usage data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">2. How We Use Your Information</h2>
              <p className="mb-2">We use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our Service</li>
                <li>Facilitate connections between students and alumni</li>
                <li>Verify alumni status</li>
                <li>Send notifications about connection requests</li>
                <li>Monitor the usage of our Service</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Provide customer support</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">3. Disclosure of Your Information</h2>
              <p className="mb-2">We may disclose your personal information in the following situations:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>To Other Users:</strong> When you accept a connection request, your email address will be shared with the user who sent the request to facilitate communication.</li>
                <li><strong>Profile Information:</strong> Information you provide in your profile (excluding your email address) will be visible to other authenticated users of the Service.</li>
                <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">4. Data Security</h2>
              <p className="mb-4">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              <p className="mb-4">
                We implement a variety of security measures to maintain the safety of your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Using secure, encrypted connections (HTTPS)</li>
                <li>Restricting access to personal information</li>
                <li>Regularly reviewing our information collection, storage, and processing practices</li>
                <li>Implementing physical security measures to protect against unauthorized access to systems</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">5. Your Data Protection Rights</h2>
              <p className="mb-2">You have the following data protection rights:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Access:</strong> You can request copies of your personal information.</li>
                <li><strong>Rectification:</strong> You can request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information.</li>
                <li><strong>Restriction:</strong> You can request that we restrict the processing of your personal information.</li>
                <li><strong>Data Portability:</strong> You can request that we transfer the data we've collected to another organization or directly to you.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">6. Profile Visibility</h2>
              <p className="mb-4">
                You have control over your profile visibility within the Service. You can choose to make your profile visible to all authenticated users or hide it. Even when your profile is visible, your email address is never publicly displayed and is only shared when you accept a connection request.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                Our Service is not intended for use by children under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">8. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p className="mb-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4">
                <a href="mailto:pittcsc@gmail.com" className="text-pittNavy hover:underline">pittcsc@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;