import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the custom hook
import '../styles/Login.css';

import Dashboard from './Dashboard_User';
import Dashboard_admin from "./Dashboard_Admin";

const apiUrl = "https://xfbx83098c.execute-api.us-east-2.amazonaws.com/DEV/Login";

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [_isuserType, set_isuserType] = useState("");

  const navigate = useNavigate();

  const { setUsername, setUserType } = useUser(); // Get setUsername and setUserType from context

  const { setUser,user } = useUser(); // Destructure setUser from the context
  
  useEffect(() => {


    console.log("username_login",user);
}, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login Successful');
     
        setUser({ username, type: data.type }); // Update global user state
        set_isuserType(data.type)
        // _isLogin=true;
        // setError('');
        // if (data.type === 'admin') {
        //   navigate('/Dashboard_Admin'); // Navigate based on user type
        // } else if (data.type === 'user') {
        //   navigate('/Dashboard_User');
        // }
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to connect to server');
    }
  };


  return (
    <div> 

{ 
        _isuserType === 'admin' ? (
          <Dashboard_admin />
        ) : _isuserType === 'user' ? (
          <Dashboard/>
        ) : (
        
    
       
    <div className="login-background">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/components/Signup">Sign Up</Link>
          </p>
        </form>
      </div>


      </div>
    )
  }
    </div>
   
   
  );
};

export default Login;
