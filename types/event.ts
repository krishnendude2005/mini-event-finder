export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date
  location: string;
  tags: string[];
}
  
  export interface CreateEventInput {
    title: string;
    description: string;
    location: string;
    date: string;
    maxParticipants: number;
    currentParticipants: number;
  }
  