import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UsersList from './UsersList';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Student Info System
      </Typography>
      {user && <Typography variant="h6">Hello, <strong>{user.name}</strong> ({user.role})!</Typography>}
      <UsersList />
    </Container>
  );
};

export default Home;