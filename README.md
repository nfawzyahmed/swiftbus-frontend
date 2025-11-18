# SwiftBus Frontend

A React-based frontend for SwiftBus, a bus rental and management application. Users can log in, view available buses, create rentals, and manage their existing rentals.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [State Management](#state-management)
- [Routes / Pages](#routes--pages)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

---

## Project Overview
SwiftBus Frontend is built using React, Vite, and Redux Toolkit. It communicates with the SwiftBus backend API to provide a seamless user experience for managing buses and rentals.

---

## Technologies
- React 19
- Vite
- Redux Toolkit
- React Router DOM v7
- Axios
- Mantine (UI components and forms)
- MUI (Material UI)
- Emotion (styled components)
- @tabler/icons-react
- ESLint for linting

---

## Folder Structure
The folder structure of the project is:

    src/
    │
    ├─ api/           # Axios instance and API calls
    ├─ components/    # Reusable UI components
    ├─ features/      # Redux slices and feature logic
    ├─ pages/         # React pages (Login, Home, Rentals, etc.)
    ├─ App.jsx        # Main app with routing
    └─ main.jsx       # ReactDOM entry point

---

## Features
- User authentication (login)
- View all available buses
- Create a rental for a bus
- View user's rentals
- Clean separation of pages and components
- Redux state management with slices
- Route-based navigation using React Router

---

## State Management
Redux Toolkit is used to manage the application state. Features (slices) include:
- **clientsSlice**: handles user login and client data
- **busesSlice**: handles bus data fetching and storage
- **rentalsSlice**: manages rental creation and retrieval

Each slice uses createAsyncThunk to handle asynchronous API calls.

---

## Routes / Pages
| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | User login page |
| `/home` | HomePage | Shows all available buses and navigation |
| `/buses` | BusesPage | Displays list of all buses |
| `/buses/:id` | BusDetailPage | View details of a bus and create rental |
| `/rentals` | RentalsPage | Displays all rentals of the logged-in user |

---

## Getting Started

1. **Clone the repository**
    
        git clone <repository-url>
        cd swiftbus-frontend

2. **Install dependencies**
    
        npm install

3. **Run the development server**
    
        npm run dev

The frontend will be available at http://localhost:5173 (default Vite port).

4. **Build for production**
    
        npm run build

5. **Preview production build**
    
        npm run preview

---

## Usage Examples

**Login**
    
        dispatch(loginUser({ username: "john", password: "123456" }));

**Fetch all buses**
    
        dispatch(fetchBuses());

**Create a rental**
    
        dispatch(createRental({ busId: 1, startDate: "2025-11-20", endDate: "2025-11-25" }));

**Get user rentals**
    
        dispatch(fetchUserRentals(clientId));

---

## License
This project is licensed under the MIT License.
