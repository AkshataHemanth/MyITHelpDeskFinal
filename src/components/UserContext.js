import React, { createContext, useContext, useState,useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// UserProvider component to manage the global user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    type: '' // Add type to the global state
  });

  useEffect(() => {


    console.log("username_real",user);
}, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
