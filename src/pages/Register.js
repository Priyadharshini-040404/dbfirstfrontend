import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',
    mobileNumber: '',
    address: '',
    gender: 'Male',
    profileImageUrl: '',
    age: '',
    dateOfBirth: '',
    designation: '',
    department: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, PasswordHash: form.password };
      delete payload.password;

      Object.keys(payload).forEach(key => {
        if (payload[key] === '') delete payload[key];
      });

      await api.post('Auth/register', payload);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error("API Error:", error.response);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="name" label="Name" name="name" onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" type="email" onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="password" label="Password" name="password" type="password" onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" name="role" value={form.role} onChange={handleChange}>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" fullWidth id="mobileNumber" label="Mobile Number" name="mobileNumber" onChange={handleChange} />
          <TextField margin="normal" fullWidth id="address" label="Address" name="address" onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select labelId="gender-label" id="gender" name="gender" value={form.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" fullWidth id="profileImageUrl" label="Profile Image URL" name="profileImageUrl" onChange={handleChange} />
          <TextField margin="normal" fullWidth id="age" label="Age" name="age" type="number" onChange={handleChange} />
          <TextField margin="normal" fullWidth id="dateOfBirth" label="Date Of Birth" name="dateOfBirth" type="date" InputLabelProps={{ shrink: true }} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="designation" label="Designation" name="designation" onChange={handleChange} />
          <TextField margin="normal" fullWidth id="department" label="Department" name="department" onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;