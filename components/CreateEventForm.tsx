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
      const event = await createEvent({ ...form, tags: form.tags.split(',').map(tag => tag.trim()) });
      toast('Event created');
      onCreated(event);
      setForm({ title: '', description: '', date: '', location: '', tags: '' });
    } catch (err) {
      toast('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-3 p-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input name="date" id="date" type="date" value={form.date} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input name="location" id="location" value={form.location} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input name="tags" id="tags" value={form.tags} onChange={handleChange} />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Event'}</Button>
    </Form>
  );
};
