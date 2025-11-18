import React from 'react';
import { useSelector } from 'react-redux';
import { Title, Button, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import{ useEffect } from 'react';
const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // get user from Redux
  useEffect(() => {
    console.log('Current user state:', user);
  }, [user]);


  if (!user) {
    // Optional: redirect to login if not logged in
    navigate('/');
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #10b981, #047857, #065f46, #059669)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
        flexDirection: 'column',
        textAlign: 'center',
        padding: 40,
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      {/* Welcome Message */}
      <Title
        order={1}
        style={{
          color: '#fff',
          fontSize: '4rem',
          fontWeight: 700,
          marginBottom: '2rem',
        }}
      >
        Welcome, {user}!
      </Title>

      {/* Subtitle */}
      <Text
        color="white"
        size="xl"
        style={{ fontSize: '2rem', marginBottom: '4rem' }}
      >
        Ready to start your rentals?
      </Text>

      {/* Start Rentals Button */}
      <Button
        size="xl"
        radius="xl"
        onClick={() => navigate('/buses')}
        style={{
          padding: '20px 60px',
          background: '#a7f3d0', // very light green
          color: '#065f46',
          fontWeight: 'bold',
          fontSize: '2rem',
          minWidth: '300px',
          minHeight: '80px',
        }}
      >
        Start Rentals
      </Button>
    </div>
  );
};

export default HomePage;
