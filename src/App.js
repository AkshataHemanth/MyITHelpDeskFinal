import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MyAccount from './components/MyAccount';
import NewTicket from './components/NewTicket';
import SearchTickets from './components/SearchTickets';
import { UserProvider } from './components/UserContext'; // Import UserProvider
import Dashboard_Admin from './components/Dashboard_Admin';
import Dashboard_User from './components/Dashboard_User';

const App = () => {
  return (
    <UserProvider> {/* Wrap the app with the UserProvider */}
      <Router>
        <div style={styles.appContainer}>
          <h1 style={styles.header}>Welcome to TeamThree IT HelpDesk Dashboard</h1>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/components/Login" element={<Login />} />
            <Route path="/components/Signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/SearchTickets" element={<SearchTickets />} />
            <Route path="/NewTicket" element={<NewTicket />} />
			<Route path="/Dashboard_Admin" element={<Dashboard_Admin />} />
			<Route path="/Dashboard_User" element={<Dashboard_User />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};


const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Make the container full screen height
    width: '100vw',   // Ensure it spans full screen width
    backgroundColor: '#e0f7fa',
    padding: 0,  // Remove any padding
    boxSizing: 'border-box',  // Ensures padding and border are included in width/height
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',  // Center the header text
    fontSize: '24px',
  },
};

export default App;
