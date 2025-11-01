import React from 'react';
import { Event } from '../types/event';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { formatDate } from '../lib/utils';

export const EventCard: React.FC<{ event: Event; onClick?: () => void }> = ({ event, onClick }) => (
  <Card className="mb-4 cursor-pointer hover:shadow-xl" onClick={onClick}>
    <h2 className="text-xl font-bold mb-1">{event.title}</h2>
    <div className="text-gray-600 text-sm mb-2">{formatDate(event.date)} | {event.location}</div>
    <div className="mb-2 text-gray-700 line-clamp-2">{event.description}</div>
    <div className="flex gap-2">
      {event.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
    </div>
  </Card>
);
