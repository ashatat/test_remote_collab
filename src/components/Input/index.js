import React from 'react';

import './style.css';

export default function Input(props) {
  const { name, labelTxt, type = 'text', value, handleChange, error } = props;
  return (
    <div>
      <label htmlFor={name}>{labelTxt}</label>
      <input
        className={error && 'error'}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      />
      {error && <div>{error}</div>}
    </div>
  );
}
