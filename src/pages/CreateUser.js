import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CreateUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    mobileNumber: "",
    address: "",
    gender: "Male",
    profileImageUrl: "",
    age: "",
    dateOfBirth: "",
    designation: "",
    department: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      role: form.role,
      designation: form.designation
    };

    if (form.password) payload.passwordHash = form.password;
    if (form.mobileNumber) payload.mobileNumber = form.mobileNumber;
    if (form.address) payload.address = form.address;
    if (form.gender) payload.gender = form.gender;
    if (form.profileImageUrl) payload.profileImageUrl = form.profileImageUrl;
    if (form.age) payload.age = Number(form.age);
    if (form.dateOfBirth) payload.dateOfBirth = new Date(form.dateOfBirth).toISOString();
    if (form.department) payload.department = form.department;

    try {
      await api.post("/Users", payload);
      alert("✅ User created successfully");
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ User creation failed");
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
          Create User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="name" label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="password" label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" name="role" value={form.role} onChange={handleChange}>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" fullWidth id="mobileNumber" label="Mobile Number" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="address" label="Address" name="address" value={form.address} onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select labelId="gender-label" id="gender" name="gender" value={form.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" fullWidth id="profileImageUrl" label="Profile Image URL" name="profileImageUrl" value={form.profileImageUrl} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="age" label="Age" name="age" type="number" value={form.age} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="dateOfBirth" label="Date Of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} InputLabelProps={{ shrink: true }} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="designation" label="Designation" name="designation" value={form.designation} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="department" label="Department" name="department" value={form.department} onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUser;