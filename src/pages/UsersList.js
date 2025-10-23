import React, { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  IconButton, 
  CircularProgress, 
  Card, 
  CardContent, 
  Grid 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/Users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
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

  if (loading) {
    return <CircularProgress />;
  }

  // STUDENT VIEW
  if (user?.role === "Student") {
    const student = users.find(u => u.email === user.email);
    if (!student) return <Container><Typography>You have no user record.</Typography></Container>;

    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              My Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Name:</strong></Grid><Grid item xs={6}>{student.name}</Grid>
              <Grid item xs={6}><strong>Email:</strong></Grid><Grid item xs={6}>{student.email}</Grid>
              <Grid item xs={6}><strong>Role:</strong></Grid><Grid item xs={6}>{student.role}</Grid>
              <Grid item xs={6}><strong>Mobile:</strong></Grid><Grid item xs={6}>{student.mobileNumber}</Grid>
              <Grid item xs={6}><strong>Address:</strong></Grid><Grid item xs={6}>{student.address}</Grid>
              <Grid item xs={6}><strong>Gender:</strong></Grid><Grid item xs={6}>{student.gender}</Grid>
              <Grid item xs={6}><strong>Age:</strong></Grid><Grid item xs={6}>{student.age}</Grid>
              <Grid item xs={6}><strong>Date of Birth:</strong></Grid><Grid item xs={6}>{student.dateOfBirth?.split("T")[0]}</Grid>
              <Grid item xs={6}><strong>Designation:</strong></Grid><Grid item xs={6}>{student.designation}</Grid>
              <Grid item xs={6}><strong>Department:</strong></Grid><Grid item xs={6}>{student.department}</Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // TEACHER VIEW
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.userId}>
                <TableCell>{u.userId}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.mobileNumber}</TableCell>
                <TableCell>{u.address}</TableCell>
                <TableCell>{u.gender}</TableCell>
                <TableCell>{u.age}</TableCell>
                <TableCell>{u.dateOfBirth?.split("T")[0]}</TableCell>
                <TableCell>{u.designation}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/users/${u.userId}/edit`}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(u.userId)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersList;