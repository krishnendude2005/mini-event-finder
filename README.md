# Mini Event Finder

A full-stack event management application built with Next.js and Express.js that allows users to create, search, and filter events by location.

## Table of Contents
- [Project Overview](#project-overview)
- [Dependencies](#dependencies)
- [Setup Instructions](#setup-instructions)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [UI Components](#ui-components)
- [Location Search & Filter](#location-search--filter)
- [Event Object Documentation](#event-object-documentation)
- [Demo: Creating Events](#demo-creating-events)

## Project Overview

Mini Event Finder is a modern web application that enables users to:
- Browse and search for events
- Filter events by location
- Create new events with title, description, date, and location
- View event details in a responsive interface

## Dependencies

### Frontend Dependencies
- **Next.js**: ^15.0.3 - React framework for server-side rendering
- **React**: ^19.0.0-rc-66855b96-20241106 - UI library
- **React DOM**: ^19.0.0-rc-66855b96-20241106
- **TypeScript**: ^5 - Type-safe JavaScript

### Backend Dependencies
- **Express**: ^4.21.1 - Web server framework
- **CORS**: ^2.8.5 - Cross-Origin Resource Sharing middleware
- **dotenv**: ^16.4.5 - Environment variable management
- **uuid**: ^11.0.3 - Unique identifier generation
- **Nodemon**: ^3.1.7 (dev) - Auto-restart server on changes

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (optional):
```env
PORT=3001
```

### Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

## Running Locally

### Start the Backend Server

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the development server:
```bash
npm run dev
```
The backend will start on `http://localhost:3001`

Alternatively, for production mode:
```bash
npm start
```

### Start the Frontend Application

1. From the project root directory:
```bash
npm run dev
```
The frontend will start on `http://localhost:3000`

2. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

The backend exposes the following REST API endpoints:

### GET `/api/events`
**Description**: Retrieve all events

**Response**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Tech Conference 2025",
    "description": "Annual technology conference",
    "date": "2025-12-15",
    "location": "San Francisco"
  }
]
```

### POST `/api/events`
**Description**: Create a new event

**Request Body**:
```json
{
  "title": "Tech Conference 2025",
  "description": "Annual technology conference",
  "date": "2025-12-15",
  "location": "San Francisco"
}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Tech Conference 2025",
  "description": "Annual technology conference",
  "date": "2025-12-15",
  "location": "San Francisco"
}
```

### GET `/api/events/:id`
**Description**: Retrieve a specific event by ID

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Tech Conference 2025",
  "description": "Annual technology conference",
  "date": "2025-12-15",
  "location": "San Francisco"
}
```

### PUT `/api/events/:id`
**Description**: Update an existing event

**Request Body**: Same as POST (all fields required)

**Response**: Updated event object

### DELETE `/api/events/:id`
**Description**: Delete an event

**Response**: 204 No Content

## UI Components

The application consists of the following main components:

### EventList Component
**File**: `components/EventList.tsx`

**Purpose**: Main component that displays all events and provides filtering functionality

**Features**:
- Fetches events from the backend API
- Displays events in a grid layout
- Provides location-based filtering
- Shows loading states
- Handles empty states

**Props**:
- None (manages its own state)

### EventCard Component
**File**: `components/EventCard.tsx`

**Purpose**: Displays individual event details in a card format

**Props**:
```typescript
interface EventCardProps {
  event: Event;
}
```

**Features**:
- Shows event title, description, date, and location
- Responsive card design
- Formatted date display

### CreateEventForm Component
**File**: `components/CreateEventForm.tsx`

**Purpose**: Form for creating new events

**Features**:
- Input fields for title, description, date, and location
- Form validation
- Submits data to backend API
- Clears form after successful submission

## Location Search & Filter

The EventList component includes a powerful location-based filtering system:

### How It Works

1. **Search Input**: Users can type in the location search box at the top of the event list

2. **Real-time Filtering**: Events are filtered as the user types

3. **Case-Insensitive Matching**: The filter performs case-insensitive substring matching on event locations

### Usage Example

```typescript
// In EventList.tsx
const [locationFilter, setLocationFilter] = useState("");

const filteredEvents = events.filter((event) =>
  event.location.toLowerCase().includes(locationFilter.toLowerCase())
);
```

### User Interaction

1. Open the application in your browser
2. Navigate to the events page
3. Locate the "Filter by Location" search box
4. Type a location name (e.g., "San Francisco")
5. The event list will automatically update to show only matching events
6. Clear the search box to show all events again

## Event Object Documentation

### Event Interface

**File**: `types/event.ts`

```typescript
export interface Event {
  id: string;          // UUID generated by backend
  title: string;       // Event title (required)
  description: string; // Event description (required)
  date: string;        // Event date in ISO format (required)
  location: string;    // Event location (required)
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes (auto-generated) | Unique identifier (UUID v4) |
| `title` | string | Yes | Name of the event |
| `description` | string | Yes | Detailed description of the event |
| `date` | string | Yes | Event date (ISO 8601 format: YYYY-MM-DD) |
| `location` | string | Yes | Physical location of the event |

### Validation Rules

- All fields except `id` must be provided when creating an event
- `id` is automatically generated by the backend using UUID v4
- `date` should be in YYYY-MM-DD format
- No field should be empty or null

## Demo: Creating Events

### Using the API Directly

You can create events using curl, Postman, or any HTTP client:

```bash
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Conference 2025",
    "description": "Annual technology conference featuring the latest innovations in AI and cloud computing",
    "date": "2025-12-15",
    "location": "San Francisco"
  }'
```

### Using the Web Interface

1. **Navigate to Create Event Page**:
   - Open `http://localhost:3000` in your browser
   - Click on "Create Event" or navigate to the create event form

2. **Fill in the Form**:
   - **Title**: Enter "Tech Conference 2025"
   - **Description**: Enter "Annual technology conference featuring the latest innovations"
   - **Date**: Select "2025-12-15" from the date picker
   - **Location**: Enter "San Francisco"

3. **Submit**:
   - Click the "Create Event" button
   - The event will be created and you'll be redirected to the events list

### Example Events Dataset

Here are some example events you can create to test the application:

```json
[
  {
    "title": "Tech Conference 2025",
    "description": "Annual technology conference",
    "date": "2025-12-15",
    "location": "San Francisco"
  },
  {
    "title": "Music Festival",
    "description": "Summer music festival featuring local and international artists",
    "date": "2025-07-20",
    "location": "Austin"
  },
  {
    "title": "Food & Wine Expo",
    "description": "Culinary showcase with renowned chefs",
    "date": "2025-09-10",
    "location": "New York"
  },
  {
    "title": "Startup Pitch Day",
    "description": "Watch innovative startups pitch to investors",
    "date": "2025-11-05",
    "location": "San Francisco"
  },
  {
    "title": "Art Exhibition",
    "description": "Contemporary art exhibition featuring emerging artists",
    "date": "2025-08-15",
    "location": "Los Angeles"
  }
]
```

## Project Structure

```
mini-event-finder/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend-specific documentation
├── components/
│   ├── EventList.tsx      # Event list with filtering
│   ├── EventCard.tsx      # Individual event card
│   └── CreateEventForm.tsx # Event creation form
├── types/
│   └── event.ts           # TypeScript type definitions
├── app/
│   └── page.tsx           # Main application page
├── package.json           # Frontend dependencies
└── README.md              # This file
```

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

MIT
