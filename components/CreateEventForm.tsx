import React, { useState } from 'react';
import { Form } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { createEvent } from '../actions/createEvent';
import { Event } from '../types/event';
import { useToast } from '../hooks/use-toast';

interface Props {
  onCreated: (event: Event) => void;
}

export const CreateEventForm: React.FC<Props> = ({ onCreated }) => {
  const [form, setForm] = useState({
    title: '', description: '', date: '', location: '', tags: '',
    maxParticipants: '', currentParticipants: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const event = await createEvent({ 
        ...form, 
        tags: form.tags.split(',').map(tag => tag.trim()),
        maxParticipants: Number(form.maxParticipants),
        currentParticipants: Number(form.currentParticipants),
      });
      toast('Event created');
      onCreated(event);
      setForm({ title: '', description: '', date: '', location: '', tags: '', maxParticipants: '', currentParticipants: '' });
    } catch (err) {
      toast('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3 p-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" onChange={handleChange} required value={form.title} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" onChange={handleChange} required value={form.description} />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" onChange={handleChange} required type="date" value={form.date} />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" onChange={handleChange} required value={form.location} />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input id="tags" name="tags" onChange={handleChange} value={form.tags} />
      </div>
      <div>
        <Label htmlFor="maxParticipants">Max Participants</Label>
        <Input id="maxParticipants" name="maxParticipants" type="number" onChange={handleChange} value={form.maxParticipants} />
      </div>
      <div>
        <Label htmlFor="currentParticipants">Current Participants</Label>
        <Input id="currentParticipants" name="currentParticipants" type="number" onChange={handleChange} value={form.currentParticipants} />
      </div>
      <Button disabled={loading} type="submit">{loading ? 'Creating...' : 'Create Event'}</Button>
    </form>
  );
};
