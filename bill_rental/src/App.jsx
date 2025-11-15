import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';
import F1 from './pages/F1.jsx';
import F2 from './pages/F2.jsx';
import F3 from './pages/F3.jsx';
import G from './pages/G.jsx';
import Modall from './components/Modall.jsx';
// import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/F1" element={<F1 />} />
        <Route path="/F2" element={<F2 />} />
        <Route path="/F3" element={<F3 />} />
        <Route path="/G" element={<G />} />
      </Routes>
    </Router>
  );
};

export default App;
