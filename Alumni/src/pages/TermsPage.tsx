import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
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
          <div className="px-6 py-4 bg-pittDeepNavy text-white">
            <h1 className="text-2xl font-bold">Terms of Service</h1>
          </div>
          
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: May 15, 2025
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to the PittCSC Alumni Database ("the Service"). These Terms of Service govern your use of our web application operated by the Pitt Computer Science Club (PittCSC). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">2. Eligibility</h2>
              <p className="mb-4">
                The Service is intended solely for use by current students, alumni, and faculty of the University of Pittsburgh. To register for an account, you must have a valid @pitt.edu email address. By creating an account, you represent and warrant that you are affiliated with the University of Pittsburgh as a student, alumnus/alumna, or faculty member.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">3. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide accurate, complete, and up-to-date information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">4. Alumni Verification</h2>
              <p className="mb-4">
                Users who register as alumni will undergo a verification process by PittCSC administrators. This process helps ensure the integrity of our community. Providing false information during this process is grounds for immediate account termination.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">5. User Content</h2>
              <p className="mb-4">
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="mb-4">
                By posting Content on or through the Service, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The Content is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms.</li>
                <li>The posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">6. Prohibited Uses</h2>
              <p className="mb-4">
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate PittCSC, a PittCSC employee, another user, or any other person or entity.</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm PittCSC or users of the Service.</li>
                <li>For mass recruitment or solicitation purposes unrelated to the University of Pittsburgh community.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">7. Connection Requests</h2>
              <p className="mb-4">
                The Service facilitates connections between students and alumni. When sending connection requests:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Be respectful and professional in your communications.</li>
                <li>Clearly state your purpose for connecting.</li>
                <li>Do not send excessive requests to the same person.</li>
                <li>Respect the decision if your request is declined.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">8. Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service and explains how we collect, use, and disclose information about you.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">9. Intellectual Property</h2>
              <p className="mb-4">
                The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of PittCSC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PittCSC.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">10. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="mb-4">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">11. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall PittCSC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">12. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="mb-4">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2 className="text-xl font-semibold text-pittDeepNavy mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
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

export default TermsPage;