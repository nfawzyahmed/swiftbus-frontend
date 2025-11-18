// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/clients/clientsSlice';
import busesReducer from '../features/buses/busesSlice';
import rentalsReducer from '../features/rentals/rentalsSlice'
// import rentalsReducer from '../features/rentals/rentalsSlice'; // if you plan to use rentals slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busesReducer,
    rentals: rentalsReducer,
  },
});

export default store; 
