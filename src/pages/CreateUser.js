import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        <input name="mobileNumber" placeholder="Mobile Number" value={form.mobileNumber} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="profileImageUrl" placeholder="Profile Image URL" value={form.profileImageUrl} onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <button type="submit" style={{ width: "100%", marginTop: 10 }}>Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
