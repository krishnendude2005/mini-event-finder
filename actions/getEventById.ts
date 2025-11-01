import axios from 'axios';
import { Event } from '../types/event';

export async function getEventById(id: string): Promise<Event> {
  const res = await axios.get<Event>(`/api/events/${id}`);
  return res.data;
}
