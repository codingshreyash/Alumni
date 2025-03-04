import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useConnectionStore } from '../store/connectionStore';
import { Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../components/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';

const ConnectionsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { connections, fetchConnections, updateConnectionStatus, isLoading, error } = useConnectionStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'all'>('all');
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchConnections(user.id);
  }, [user, navigate, fetchConnections]);
  
  const handleAcceptRequest = async (connectionId: string) => {
    await updateConnectionStatus(connectionId, 'accepted');
  };
  
  const handleDeclineRequest = async (connectionId: string) => {
    await updateConnectionStatus(connectionId, 'declined');
  };
  
  const filteredConnections = connections.filter((connection) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'received') return connection.alumni_id === user?.id;
    if (activeTab === 'sent') return connection.requester_id === user?.id;
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
              onClick={() => fetchConnections(user!.id)}
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
            {filteredConnections.map((connection) => {
              const isIncoming = connection.alumni_id === user?.id;
              const otherPerson = isIncoming ? connection.requester : connection.alumni;
              
              return (
                <Card key={connection.id} className="h-full flex flex-col">
                  <CardHeader className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-pittDeepNavy">
                      {isIncoming ? 'Request from' : 'Request to'} {otherPerson.full_name}
                    </h3>
                    {getStatusBadge(connection.status)}
                  </CardHeader>
                  
                  <CardBody className="flex-grow">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        {new Date(connection.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    
                    {connection.message && (
                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <p className="text-gray-700">{connection.message}</p>
                      </div>
                    )}
                    
                    {connection.status === 'accepted' && (
                      <div className="flex items-center text-green-600 mb-4">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${otherPerson.email}`} className="hover:underline">
                          {otherPerson.email}
                        </a>
                      </div>
                    )}
                  </CardBody>
                  
                  <CardFooter className="bg-gray-50">
                    {isIncoming && connection.status === 'pending' ? (
                      <div className="flex justify-between w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeclineRequest(connection.id)}
                        >
                          Decline
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAcceptRequest(connection.id)}
                        >
                          Accept
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/alumni/${otherPerson.id}`)}
                        fullWidth
                      >
                        View Profile
                      </Button>
                    )}
                  </CardFooter>
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