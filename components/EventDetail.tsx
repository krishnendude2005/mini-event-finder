import React from 'react';
import { Event } from '../types/event';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { formatDate } from '../lib/utils';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => (
  <Card className="p-6 max-w-lg mx-auto mt-6">
    <button onClick={onBack} className="text-blue-500 mb-3">← Back</button>
    <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
    <div className="text-gray-600 mb-2">{formatDate(event.date)} | {event.location}</div>
    <div className="mb-2 text-sm text-gray-600">
      Participants: {event.currentParticipants}/{event.maxParticipants}
    </div>
    {event.tags && event.tags.length > 0 && (
      <div className="mb-3 flex gap-2">
        {event.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
      </div>
    )}
    <p>{event.description}</p>
  </Card>
);
