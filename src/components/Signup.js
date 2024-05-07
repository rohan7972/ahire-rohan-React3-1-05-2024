import React, { useState, useContext, useEffect } from 'react'; // Import useState
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

export default function Signup() {
  const { user, setUser } = useContext(UserContext); // Destructure setUser
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.accessToken) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const [signupDetails, setSignupDetails] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Visitor',
    accessToken: generateAccessToken(),
  });

  function generateAccessToken() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const tokenLength = 16;
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      token += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return token;
  }

  const signupProcess = () => {
    axios
      .post('http://localhost:3001/users', signupDetails)
      .then(() => {
        alert('User Created Successfully');
        localStorage.setItem('accessToken', signupDetails.accessToken);
        setUser(signupDetails);
        navigate('/profile');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-4">
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name"
          value={signupDetails.name}
          onChange={(e) => setSignupDetails({ ...signupDetails, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          value={signupDetails.email}
          onChange={(e) => setSignupDetails({ ...signupDetails, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={signupDetails.password}
          onChange={(e) => setSignupDetails({ ...signupDetails, password: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={signupProcess}>Sign Up</button>
      <Link to="/login" className="btn btn-link">Login</Link>
    </div>
  );
}
