import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import {Button} from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate(); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  }; 

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    // if (!email || !password) {
    //   setError('Please enter both email and password.');
    //   setLoading(false);
    //   return;
    // }

    try {
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


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here (maybe call an API or validate data)
    alert('Signed up successfully!');
  };

  return (
    <div className="main-container">
      <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <Button label="Login" type="submit" />
        </form>
        <Link to="/signup">
          <p>Don't have an account? Sign up</p>
        </Link>
      </div>

      {/* <div className="signup-section">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleSignupChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
          />
          <Button label="Sign Up" type="submit" />
        </form>
      </div> */}
    </div>
  );
};

export default Main;
