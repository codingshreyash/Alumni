import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Calendar } from 'lucide-react';
import EventCard from '../components/EventCard';

const EventsPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) throw error;
        
        setEvents(data || []);
      } catch (error: any) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, [user, navigate]);
  
  // Filter events to show only upcoming events
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate >= today;
  });
  
  // Filter events to show only past events
  const pastEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate < today;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending
  
  return (
    <div className="min-h-screen bg-pittLight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Calendar className="h-8 w-8 text-pittGold mr-3" />
          <h1 className="text-3xl font-bold text-pittDeepNavy">PittCSC Events</h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pittNavy"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-pittDeepNavy mb-2">Error loading events</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-pittDeepNavy mb-6">Upcoming Events</h2>
              
              {upcomingEvents.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-semibold text-pittDeepNavy mb-2">No upcoming events</h3>
                  <p className="text-gray-600">
                    There are no upcoming events scheduled at this time. Check back later for updates!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>
            
            {pastEvents.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-pittDeepNavy mb-6">Past Events</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                
                {pastEvents.length > 3 && (
                  <div className="text-center mt-8">
                    <button className="text-pittNavy hover:text-pittDeepNavy font-medium">
                      View all past events
                    </button>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;