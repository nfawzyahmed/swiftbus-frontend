import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BusesPage from './pages/BusesPage';
import ReantalsPage from './pages/RentalsPage'

function App() {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/buses" element={<BusesPage />} />
            <Route path="/rentals" element={<ReantalsPage />} />


          </Routes>
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;
