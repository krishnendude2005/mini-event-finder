import axios from 'axios';
import { Event } from '../types/event';

export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const res = await axios.post<Event>('/api/events', event);
  return res.data;
}
