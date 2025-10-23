import React, { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    mobileNumber: "",
    address: "",
    gender: "Male",
    profileImageUrl: "",
    age: "",
    dateOfBirth: "",
    designation: "",
    department: ""
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    api.get(`/Users/${id}`).then(res => {
      const user = res.data.data || res.data;
      setForm({
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
      });
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

    // PasswordHash only if user entered new password
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

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password (leave blank to keep current)" value={form.password} onChange={handleChange} />
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
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <button type="submit" style={{ width: "100%", marginTop: 10 }}>Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
