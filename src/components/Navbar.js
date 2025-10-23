import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#222",
      color: "#fff",
      padding: "14px 40px"
    }}>
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: 20, textDecoration: "none" }}>Home</Link>
      </div>
      <div>
        {!user && (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: 15, textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
          </>
        )}
        {user && (
          <>
            {user.role === "Teacher" && (
              <Link to="/users/create" style={{ color: "#fff", marginRight: 15, textDecoration: "none" }}>Create User</Link>
            )}
            <button onClick={handleLogout} style={{ background: "#d33", color: "#fff", border: "none", padding: "7px 18px", borderRadius: 5 }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
