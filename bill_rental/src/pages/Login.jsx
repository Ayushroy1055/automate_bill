import React, { useState } from 'react';
import Input from '../components/Input';
import {Button} from '../components/Button';
import axios from 'axios';
import Landing from './Landing';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); 
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value} = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    // navigate("/landing");

    try {
      // 🔥 API CALL HERE
      const res = await axios.post('http://localhost:5000/api/auth/login', loginData);

      console.log('Login success:', res.data);

      // Example: store JWT token in localStorage (if backend sends it)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      // Redirect to landing page
      navigate('/landing');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          name="email"
          value={loginData.username}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <Button label="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
