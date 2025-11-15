import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="welcome-container">
      <h1></h1>
      <p>Please log in or sign up to continue.</p>
      <Link to="/main">
        <button className="btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
