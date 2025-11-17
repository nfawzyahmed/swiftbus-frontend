// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/clients/clientsSlice';
// import rentalsReducer from '../features/rentals/rentalsSlice'; // if you plan to use rentals slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    // rentals: rentalsReducer, // include rentals if needed
  },
});

export default store; // ✅ default export
