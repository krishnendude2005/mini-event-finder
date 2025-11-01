import React, { useEffect, useState } from 'react';
import { getEvents } from '../actions/getEvents';
import { getEventById } from '../actions/getEventById';
import { Event } from '../types/event';
import { EventList } from '../components/EventList';
import { EventDetail } from '../components/EventDetail';
import { CreateEventForm } from '../components/CreateEventForm';

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedId, setSelectedId] = useState<string|null>(null);
  const [view, setView] = useState<'list'|'detail'|'create'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event|null>(null);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  useEffect(() => {
    if (view === 'detail' && selectedId) {
      getEventById(selectedId).then(setSelectedEvent);
    }
  }, [view, selectedId]);

  const handleSelectEvent = (id: string) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedEvent(null);
  };

  const handleCreated = (event: Event) => {
    setEvents(evts => [...evts, event]);
    setView('list');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto py-6">
        <header className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Events</h1>
          <button onClick={() => setView('create')} className="text-blue-600">+ Create</button>
        </header>

        {view === 'list' && <EventList events={events} onSelectEvent={handleSelectEvent} />}
        {view === 'detail' && selectedEvent && <EventDetail event={selectedEvent} onBack={handleBack} />}
        {view === 'create' && <CreateEventForm onCreated={handleCreated} />}
      </div>
    </div>
  );
};

export default App;
