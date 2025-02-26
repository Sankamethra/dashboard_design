# Dashboard Designer

A React-based dashboard designer application that enables users to create and manage interactive dashboards with customizable charts and filters.

## Features

- 📊 Multiple Chart Types
  - Line Charts
  - Bar Charts
  - Pie Charts
  - Donut Charts
- 🔍 Customizable Filters
  - Date Range
  - Dropdown Select
  - Radio Buttons
  - Toggle Switch
- 📱 Responsive Design
- 🔄 Import/Export Functionality
- 🎨 Drag and Drop Interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Start the JSON server (required for import functionality):

```bash
npm run server
```

The application will be available at `http://localhost:5173`

## User Guide

### Creating a Dashboard

1. Click "New Dashboard" in the left sidebar
2. Enter your dashboard title
3. Add Charts:
   - Drag a chart type from the right sidebar
   - Enter chart title
   - Add data points
   - Configure labels and settings
4. Add Filters:
   - Drag filters from the right sidebar
   - Configure filter settings
5. Click "Save Dashboard"

### Importing a Dashboard

1. Click "Import Dashboard" in the sidebar
2. Enter the dashboard API URL
   - Example: `http://localhost:3001/dashboards/1`
3. Click "Import"

### Managing Dashboards

Access the dashboard management page to:
- View existing dashboards
- Edit dashboard settings
- Delete dashboards
- Create new dashboards

## Development

- Development server: `npm run dev`
- JSON server: `npm run server`
- Build: `npm run build`
- Preview build: `npm run preview`

## Tech Stack

- ⚛️ React 18
- 🎨 Material-UI
- 📊 Recharts
- 🔄 DND Kit
- 🗄️ JSON Server
- 🚀 Vite


## Project Structure

project/
├── public/ # Static assets
├── src/ # Source code
│ ├── assets/ # Images and icons
│ ├── components/ # Reusable React components
│ ├── services/ # API and utility functions
│ ├── styles/ # Global styles
│ ├── App.jsx # Main application component
│ └── index.js # Entry point

## API Endpoints

The application uses the following API endpoints:

- `GET /api/dashboards`: Get all dashboards
- `GET /api/dashboards/:id`: Get a specific dashboard by ID
