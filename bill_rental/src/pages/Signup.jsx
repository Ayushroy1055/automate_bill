import React, { useState } from 'react';
import Input from '../components/Input';
import {Button} from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    // Here, you would typically make an API call to sign up the user
    try {
      // 🔥 API CALL HERE
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);

      console.log('Signup success:', res.data);
      setSuccess(true);

      // Redirect back to login after 2s
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      {success ? (
        <div>
          <h2>Signup Successful!</h2>
          <p>Welcome, {formData.username}!</p>
          <Button label="Go to Login" onClick={() => history.push('/login')} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button label="Sign Up" type="submit" />
        </form>
      )}
    </div>
  );
};

export default Signup;
