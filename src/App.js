import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersList from "./pages/UsersList";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser"; // You can implement as needed
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={
            <ProtectedRoute roles={["Teacher"]}>
              <UsersList />
            </ProtectedRoute>
          }/>
          <Route path="/users/:id/edit" element={
            <ProtectedRoute roles={["Teacher"]}>
              <EditUser />
            </ProtectedRoute>
          }/>
          <Route path="/users/create" element={
            <ProtectedRoute roles={["Teacher"]}>
              <CreateUser />
            </ProtectedRoute>
          }/>
          <Route path="/" element={
            <ProtectedRoute roles={["Student", "Teacher"]}>
              <UsersList />
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
