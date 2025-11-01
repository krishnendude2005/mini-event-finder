export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  tags?: string[];
}

export interface CreateEventInput {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  tags?: string[];
}
