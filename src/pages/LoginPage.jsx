import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Divider,
  Group,
  Anchor,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/clients/clientsSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (v) => (v.length < 3 ? 'Username too short' : null),
      password: (v) => (v.length < 3 ? 'Password too short' : null),
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    const result = await dispatch(loginUser(values));
    if (result.meta.requestStatus === 'fulfilled') {
      console.log('Login successful');
    }
  };

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
        padding: 20,
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

      <Paper
        padding="xl"
        radius="md"
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // center everything horizontally
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', width: '100%', marginBottom: 20 }}>
          <Title order={2} style={{ color: '#333', fontSize: 32 }}>
            Welcome Back
          </Title>
          <Text color="dimmed" style={{ fontSize: 16 }}>
            Sign in to your account to continue
          </Text>
        </div>

        {/* Form */}
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
          <Stack spacing="sm" style={{ width: '100%' }}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              size="md"
              radius="xl"
              style={{ width: '100%' }}
              styles={{
                input: {
                  border: 'none',
                  borderRadius: 12,
                  backgroundColor: '#f5f5f5',
                },
                label: {
                  fontWeight: 500,
                },
              }}
              {...form.getInputProps('username')}
            />

            <TextInput
              label="Password"
              placeholder="Enter your password"
              size="md"
              type={showPassword ? 'text' : 'password'}
              radius="xl"
              style={{ width: '100%' }}
              styles={{
                input: {
                  border: 'none',
                  borderRadius: 12,
                  backgroundColor: '#f5f5f5',
                },
                label: {
                  fontWeight: 500,
                },
              }}
              {...form.getInputProps('password')}
            />

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 16,
                marginTop: 8,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                style={{ marginRight: 8, width: 18, height: 18 }}
              />
              Show Password
            </label>

            {error && (
              <Text color="red" size="sm" align="center">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="md"
              radius="xl"
              styles={{
                root: {
                  background: 'linear-gradient(135deg, #10b981, #047857)',
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </form>

        {/* Divider */}
        <Divider label="Don't have an account?" labelPosition="center" my="md" />

        {/* Register button centered */}
        <Group position="center">
          <Anchor
            component="button"
            type="button"
            onClick={() => console.log('Navigate to register')}
            size="sm"
          >
            Register
          </Anchor>
        </Group>
      </Paper>
    </div>
  );
};

export default LoginPage;
