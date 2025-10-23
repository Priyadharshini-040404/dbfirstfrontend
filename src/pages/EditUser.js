import React, { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    api.get(`/Users/${id}`).then(res => {
      const user = res.data.data || res.data;
      const formData = {
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        mobileNumber: user.mobileNumber || "",
        address: user.address || "",
        gender: user.gender || "Male",
        profileImageUrl: user.profileImageUrl || "",
        age: user.age || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        designation: user.designation || "",
        department: user.department || ""
      };
      setForm(formData);
      setOriginalData(user);
    });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name: form.name || originalData.name,
      email: form.email || originalData.email,
      role: form.role || originalData.role,
      designation: form.designation || originalData.designation,
      mobileNumber: form.mobileNumber || originalData.mobileNumber,
      address: form.address || originalData.address,
      gender: form.gender || originalData.gender,
      profileImageUrl: form.profileImageUrl || originalData.profileImageUrl,
      age: form.age ? Number(form.age) : originalData.age,
      dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : originalData.dateOfBirth,
      department: form.department || originalData.department
    };

    if (form.password) payload.passwordHash = form.password;

    try {
      await api.put(`/Users/${id}`, payload);
      alert("✅ User updated successfully");
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ User update failed");
    }
  };

  if (!form) {
    return <CircularProgress />;
  }

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
          Edit User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" fullWidth id="name" label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="email" label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="password" label="Password (leave blank to keep current)" name="password" type="password" value={form.password} onChange={handleChange} />
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
          <TextField margin="normal" fullWidth id="designation" label="Designation" name="designation" value={form.designation} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="department" label="Department" name="department" value={form.department} onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditUser;