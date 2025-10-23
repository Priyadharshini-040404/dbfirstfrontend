import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UsersList from './UsersList';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome to Student Info System</h2>
      {user && <p>Hello, <strong>{user.name}</strong> ({user.role})!</p>}
      <UsersList />
    </div>
  );
};

export default Home;
