import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

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

      // Remove empty optional fields
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
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="role" required value={form.role} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <select name="gender" onChange={handleChange} aria-label="Gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="profileImageUrl" placeholder="Profile Image URL" onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} />
        <input name="dateOfBirth" type="date" placeholder="Date Of Birth" onChange={handleChange} />
        <input name="designation" placeholder="Designation" required onChange={handleChange} />
        <input name="department" placeholder="Department" onChange={handleChange} />
        <button type="submit" style={{ width: "100%", marginTop: 10 }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
