const express = require('express');
const cors = require('cors');
const events = require('../data/mockEvents.js');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Get all events (with optional location filter)
app.get('/api/events', (req, res) => {
  const { location } = req.query;
  
  if (location) {
    const filteredEvents = events.filter(event => 
      event.location.toLowerCase().includes(location.toLowerCase())
    );
    return res.json(filteredEvents);
  }
  
  res.json(events);
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(ev => ev.id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

// Create event (with validation)
app.post('/api/events', (req, res) => {
  const { title, date, location, description, maxParticipants, currentParticipants } = req.body;
  
  // Validate all required fields
  if (!title || !date || !location || !description) {
    return res.status(400).json({ 
      message: 'Missing required fields: title, date, location, and description are required' 
    });
  }
  
  // Validate maxParticipants and currentParticipants
  if (maxParticipants === undefined || maxParticipants === null) {
    return res.status(400).json({ 
      message: 'maxParticipants is required' 
    });
  }
  
  if (currentParticipants === undefined || currentParticipants === null) {
    return res.status(400).json({ 
      message: 'currentParticipants is required' 
    });
  }
  
  // Validate that maxParticipants and currentParticipants are numbers
  if (typeof maxParticipants !== 'number' || typeof currentParticipants !== 'number') {
    return res.status(400).json({ 
      message: 'maxParticipants and currentParticipants must be numbers' 
    });
  }
  
  // Validate that currentParticipants doesn't exceed maxParticipants
  if (currentParticipants > maxParticipants) {
    return res.status(400).json({ 
      message: 'currentParticipants cannot exceed maxParticipants' 
    });
  }
  
  // Create new event with validated data
  const newEvent = {
    id: (events.length + 1).toString(),
    title,
    date,
    location,
    description,
    maxParticipants,
    currentParticipants
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
