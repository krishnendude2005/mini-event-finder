import React, { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  onSelectEvent: (id: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ events: initialEvents, onSelectEvent }) => {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      if (location.trim() === '') {
        setEvents(initialEvents);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/events?location=${encodeURIComponent(location)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchFilteredEvents();
    }, 300); // Debounce search input

    return () => clearTimeout(timeoutId);
  }, [location, initialEvents]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Event List */}
      {!loading && !error && (
        <>
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No events found{location ? ` for "${location}"` : ''}.</p>
            </div>
          ) : (
            events.map(event => (
              <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event.id)} />
            ))
          )}
        </>
      )}
    </div>
  );
}
