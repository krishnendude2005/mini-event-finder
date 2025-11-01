import React from 'react';
import { Event } from '../types/event';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  onSelectEvent: (id: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onSelectEvent }) => (
  <div className="space-y-4">
    {events.map(event => (
      <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event.id)} />
    ))}
  </div>
);
