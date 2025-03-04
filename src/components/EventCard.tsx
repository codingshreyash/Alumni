import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Card, { CardBody } from './Card';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image_url: string | null;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <Card className="h-full flex flex-col">
      {event.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardBody className="flex-grow">
        <h3 className="text-xl font-semibold text-pittDeepNavy mb-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-pittNavy" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-pittNavy" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mt-2">{event.description}</p>
      </CardBody>
    </Card>
  );
};

export default EventCard;