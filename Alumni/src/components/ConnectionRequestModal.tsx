import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ConnectionRequestModalProps {
  alumnus: {
    full_name: string;
    profile_image?: string;
  };
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const ConnectionRequestModal: React.FC<ConnectionRequestModalProps> = ({
  alumnus,
  onClose,
  onSubmit,
}) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {alumnus && alumnus.profile_image && (
                  <img 
                    src={alumnus.profile_image} 
                    alt={alumnus.full_name}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                )}
                <h3 className="text-lg font-medium text-gray-900">
                  Connect with {alumnus ? alumnus.full_name : 'Alumni'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pittNavy focus:ring focus:ring-pittNavy focus:ring-opacity-50"
                    placeholder={`Hello! I'm interested in connecting with you to learn more about your experience at...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Introduce yourself and explain why you'd like to connect. Be specific about what you hope to learn or discuss.
                  </p>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <Button
                    type="submit"
                    variant="primary"
                    className="sm:ml-3"
                  >
                    Send Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="mt-3 sm:mt-0"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequestModal;