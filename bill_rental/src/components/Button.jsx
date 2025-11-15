import React from 'react';

const Button = ({ label,name, onClick, type = "button" }) => (
  <button className="btn" type={type} onClick={onClick}name={name}>
    {label}
  </button>
);

export {Button};
