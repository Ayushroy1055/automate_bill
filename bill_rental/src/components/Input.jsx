import React from 'react';

const Input = ({ label, type, name, value, onChange }) => (
  <div className="input-container">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
    />
  </div>
);

export default Input;
