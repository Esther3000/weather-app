import React, { useEffect, useState } from "react";
import firebaseConfig from "../config.js";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
      firebaseConfig.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
    }, []);
    if (loading) {
      return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
        }}
      >
        <CircularProgress />
      </Box>
      
    );
    }
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  };