import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.accessToken) {
      navigate('/signup');
    }
  }, [user, navigate]);

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Access Token: {user.accessToken}</p>
        </>
      )}
    </div>
  );
}
