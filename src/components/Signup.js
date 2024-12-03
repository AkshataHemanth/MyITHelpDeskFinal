// src/components/Signup.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link along with useNavigate

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you would usually handle registration logic (API call, etc.)
    // After registration, navigate to the login page
    navigate('/login');
  };

  return (
    <div style={styles.signupContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/components/Login">Log in here</Link>
      </p>
    </div>
  );
};


const styles = {
  signupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '80px', // Increased margin for better spacing
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%', // Ensure inputs are full width
  },
  button: {
    padding: '100px',
    backgroundColor: '#007bff', // Blue background for the button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
  },
  link: {
    color: 'purple', // Link color
    textDecoration: 'none', // No underline
  },
};

export default Signup;
