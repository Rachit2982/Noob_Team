import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    await API.post('/users/register', { email, password });
    alert('Registration successful!');
    navigate('/login');
  } catch (error) {
    console.log("Registration Error:", error.response?.data || error.message);
    alert(error.response?.data?.message || 'Registration failed');
  }
};


  return (
    <div className="container">
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p onClick={() => navigate('/login')} className="link">
        Already have an account? Login
      </p>
    </div>
  );
};

export default Register;
