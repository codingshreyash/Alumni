import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useConnectionStore } from '../store/connectionStore';
import { Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ConnectionsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { acceptedRequests, requestsMade, fetchAcceptedRequests, fetchRequestsMade, acceptConnectionRequest, declineConnectionRequest, isLoading, error } = useConnectionStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'all'>('all');
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch both accepted requests and requests made
    fetchAcceptedRequests(user.id);
    fetchRequestsMade(user.id);
  }, [user, navigate, fetchAcceptedRequests, fetchRequestsMade]);
  
  const handleAcceptRequest = async (requestId: number) => {
    await acceptConnectionRequest(requestId);
    // Refresh both lists after accepting
    if (user) {
      fetchAcceptedRequests(user.id);
      fetchRequestsMade(user.id);
    }
  };
  
  const handleDeclineRequest = async (requestId: number) => {
    await declineConnectionRequest(requestId);
    // Refresh both lists after declining
    if (user) {
      fetchAcceptedRequests(user.id);
      fetchRequestsMade(user.id);
    }
  };
  
  // Combine accepted requests and requests made for display
  const allItems = [...acceptedRequests, ...requestsMade];
  
  const filteredConnections = allItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'received') return item.requested_id === user?.id;
    if (activeTab === 'sent') return item.requester_id === user?.id;
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-pittLight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-pittDeepNavy mb-8">My Connections</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-pittNavy text-pittNavy'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Connections
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'received'
                    ? 'border-pittNavy text-pittNavy'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('received')}
              >
                Received Requests
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'sent'
                    ? 'border-pittNavy text-pittNavy'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('sent')}
              >
                Sent Requests
              </button>
            </nav>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pittNavy"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-pittDeepNavy mb-2">Error loading connections</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              variant="primary"
              onClick={() => {
                if (user) {
                  fetchAcceptedRequests(user.id);
                  fetchRequestsMade(user.id);
                }
              }}
            >
              Try Again
            </Button>
          </div>
        ) : filteredConnections.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-pittDeepNavy mb-2">No connections found</h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'all'
                ? "You don't have any connection requests yet."
                : activeTab === 'received'
                ? "You haven't received any connection requests yet."
                : "You haven't sent any connection requests yet."}
            </p>
            {activeTab !== 'sent' && (
              <Button
                variant="primary"
                onClick={() => navigate('/alumni')}
              >
                Browse Alumni
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((item) => {
              const isIncoming = item.requested_id === user?.id;
              const isConnection = 'email' in item; // Connections have email, requests don't
              const status = isConnection ? 'accepted' : 'pending';
              
              return (
                <Card key={item.id} className="h-full flex flex-col p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-pittDarkNavy">
                      {isIncoming ? 'Request from' : 'Request to'} {item.full_name || 'User'}
                    </h3>
                    {getStatusBadge(status)}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    
                    {item.message && (
                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <p className="text-gray-700">{item.message}</p>
                      </div>
                    )}
                    
                    {isConnection && item.email && (
                      <div className="flex items-center text-green-600 mb-4">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {isIncoming && !isConnection ? (
                      <div className="flex justify-between w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeclineRequest(item.id)}
                        >
                          Decline
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAcceptRequest(item.id)}
                        >
                          Accept
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/alumni/${item.requester_id || item.requested_id}`)}
                        fullWidth
                      >
                        View Profile
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;