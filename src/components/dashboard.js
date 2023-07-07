import { useContext, useState } from "react";
import React, { useEffect } from "react";
import Weather from './weather';
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth";
import firebaseConfig from "../config.js";
import { Link } from "react-router-dom";
import './css/dashboard.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';



const Dashboard = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5';
  const REACT_APP_API_KEY = 'd86e0b0e6adbcd52891e1e8504554825';
  const REACT_APP_ICON_URL = 'https://openweathermap.org/img/w';
  

  const handleGetWeather = async () => {
    try {
      if (city.trim() === "") {
        // Return early if the city value is empty
        return;
      }
      const response = await fetch(
        `${REACT_APP_API_URL}/weather?q=${city}&units=metric&APPID=${REACT_APP_API_KEY}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (lat === null && long === null) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      handleGetWeather();
    }
  }, [lat, long]);

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'white' }} color="inherit">
        <Toolbar>
          
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    
      <h1>Welcome</h1>
      </Typography>
      <Button onClick={() => firebaseConfig.auth().signOut()} color="inherit">Sign out</Button>
      </Toolbar>
      </AppBar>
    </Box>
    <div class="dashboard">
      <h3>This is the dashboard, if you can see this you're logged in.</h3>
      
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2,  },
      }}
      noValidate
      autoComplete="off"
      className="input-container"
    >
        <TextField sx={{
        '& > :not(style)': { width: '50ch' },
      }}
      id="standard-basic" label="Enter city name" variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleGetWeather} variant="outlined">Get Weather</Button>
      </Box>
      <div className="App">
        {typeof data.main !== 'undefined' ? (
          <Weather weatherData={data}/>
        ) : (
          <Alert severity="info">No weather data</Alert>
        )}
      </div>
      <p>
        Go to - <Link to="/">Home page</Link>
      </p>
      
      
    </div>
    
    </>
  );
};

export default Dashboard;
