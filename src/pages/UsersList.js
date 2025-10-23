import React, { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Teacher fetches all users, student fetches all too but will only see their own
    api.get("/Users")
      .then(res => setUsers(res.data)) // backend returns array directly
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await api.delete(`/Users/${id}`);
        setUsers(prev => prev.filter(u => u.userId !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete user");
      }
    }
  };

  // STUDENT VIEW
  if (user?.role === "Student") {
    const student = users.find(u => u.email === user.email);
    if (!student) return <div>You have no user record.</div>;

    return (
      <div style={{ maxWidth: 400, margin: "40px auto" }}>
        <h2>My Details</h2>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Role:</strong> {student.role}</p>
        <p><strong>Mobile:</strong> {student.mobileNumber}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Date of Birth:</strong> {student.dateOfBirth?.split("T")[0]}</p>
        <p><strong>Designation:</strong> {student.designation}</p>
        <p><strong>Department:</strong> {student.department}</p>
      </div>
    );
  }

  // TEACHER VIEW
  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>All Users</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Age</th>
            <th>DOB</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.mobileNumber}</td>
              <td>{u.address}</td>
              <td>{u.gender}</td>
              <td>{u.age}</td>
              <td>{u.dateOfBirth?.split("T")[0]}</td>
              <td>{u.designation}</td>
              <td>{u.department}</td>
              <td>
                <Link to={`/users/${u.userId}/edit`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(u.userId)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
