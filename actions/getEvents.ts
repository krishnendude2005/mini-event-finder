import axios from 'axios';
import { Event } from '../types/event';

export async function getEvents(): Promise<Event[]> {
  const res = await axios.get<Event[]>('/api/events');
  return res.data;
}
