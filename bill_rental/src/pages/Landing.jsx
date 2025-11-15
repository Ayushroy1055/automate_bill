import React from 'react';
import { Button } from '../components/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import F1 from '../pages/F1.jsx';
import F2 from '../pages/F2.jsx';
import F3 from '../pages/F3.jsx';
import G from '../pages/G.jsx';
import { useState } from 'react';
import Modal from '../components/Modal.jsx';
import Modall from '../components/Modall.jsx';

const Landing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [openModalName, setOpenModalName] = useState(null);

    const navigate = useNavigate();
    //logout function
const handleLogout = () => {
  // Remove authentication token
  localStorage.removeItem('token');

  // Optionally clear other user data
  // localStorage.removeItem('user');

  alert('Logged out successfully!');

  // Optionally redirect to login page
  window.location.href = '/login';
};

// const NavigateButtons = () => {
//   const navigate = useNavigate();

//   // Handler for each button to navigate to the respective pages
//   const handleNavigate = (route) => {
//     navigate(route);
//   }};
  const handleOpenModal = (modalName,content) => {
    setModalContent(content);
    setOpenModalName(modalName);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };
  const handleOpenModall = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModall = () => {
    setIsModalOpen(false);
    setModalContent('');
  };
  const handleNavigate = (route) => {
    navigate(route);  // Navigate to the given route
  };


  return (
    <center><div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      {/* <p>Content coming soon...</p> */}

      <Button label="F1" name="F1" onClick={() => handleOpenModal('This is F1 content!')} />
      <Button label="F2" name="F2" onClick={() => handleOpenModal('This is F2 content!')} />
      <Button label="F3" name="F3" onClick={() => handleOpenModal('This is F3 content!')} />
      <Button label="Logout" name ="Logout" onClick={handleLogout} />
    

    {/* Single reusable modal */}
      {isModalOpen && <Modal content={modalContent} onClose={handleCloseModal} />}
    {/* Render Modal if it's open
        {openModalName === "modal1" &&(<Modal content={modalContent} onClose={handleCloseModal} />)}
        {openModalName === "modal2" &&(<Modall content={modalContent} onClose={handleCloseModal} />)}
    
     */}
    
    
    </div>
    <div><Button label="G" name="G" onClick={() => handleOpenModal('This is General content!')} />{/* Render Modal if it's open */}
        {/* {/* {isModalOpen && <Modall content={modalContent} onClose={handleCloseModal} />} */}
        </div></center> 
    

  );
};

export default Landing;
