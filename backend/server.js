const express = require('express');
const cors = require('cors');
const events = require('../data/mockEvents.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Get all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(ev => ev.id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

// Create event
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  newEvent.id = (events.length + 1).toString();
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
