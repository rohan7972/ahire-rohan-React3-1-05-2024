import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginProcess = () => {
    axios
      .get(
        `http://localhost:3001/users?email=${loginDetails.email}&password=${loginDetails.password}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          alert("Login Successful");
          navigate("/Home");
        } else {
          alert("Login Failed. Please try again.");
        }
      })
      .catch((error) => {
        alert("Login Failed. Please try again.");
        console.log(error.message);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          value={loginDetails.email}
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={loginDetails.password}
          onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={loginProcess}>Login</button>
      <Link to="/signup" className="btn btn-link">Sign Up</Link>
    </div>
  );
}