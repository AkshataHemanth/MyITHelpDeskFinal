import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css'; // CSS for styling the My Account page

const MyAccount = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate back to the Dashboard
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>
      <div className="account-details">
        <div className="user-info">
          <p><strong>Name:</strong> Mike Tyson</p>
          <p><strong>Email:</strong> miketyson@fightclub.com</p>
          <p><strong>Title:</strong> Associate Sales Director</p>
          <p><strong>Organization:</strong> TeamThree</p>
          <p><strong>Department:</strong> Business Development</p>
          <p><strong>Contact Type:</strong> Employee</p>
          <p><strong>Work Phone:</strong> 516-708-3760 (Preferred)</p>
        </div>
      </div>
      <button onClick={goToDashboard} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default MyAccount;
