import "./mailList.css";
import React, { useState } from 'react';

export const MailList = () => {
  const [email, setEmail] = useState('');

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleClick = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Subscription Added!");
    setEmail('');
  };

  return (
    <div className="mail">
      <h2 className="mailTitle">Save time, Save money</h2>
      <span className="mailDesc">Sign up and We will send the best deals to you</span>
      <div className="mailInputContainer">
        <input
          type="text"
          id="myInput"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleClick}>Subscribe</button>
      </div>
    </div>
  );
};
