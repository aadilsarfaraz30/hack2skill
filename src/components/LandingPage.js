import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import userData from '../json/userData.json';
import style from './LandingPage.module.css';

const LandingPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

 

  const handleSubmit = () => {
    const userExists = userData.users.find(user => user.name === name);

    if (userExists) {
      navigate(`/dashboard/${name}`);
    } else {
      alert('User not found. Please try again.');
    }
  };

  return (
    <div className={style['landing-page-container']}>
      <div className={style['card']}>
      <h1>Login Form</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default LandingPage;
