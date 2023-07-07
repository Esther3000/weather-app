import React, { useEffect, useState } from "react";
import './css/weather.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import VideoContainer from "./videoContainer";

const CardExampleCard = ({weatherData}) => {
    const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
    

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(moment().format("HH:mm:ss"));
        }, 1000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(interval);
      }, []);
    return (
      <>
    <Card class="weather-card" sx={{ width: 550, height: 'auto' }} variant="outlined">
    <CardContent>
      <Typography gutterBottom variant="h4" component="div" className="header">
       {weatherData.name}
       </Typography> 
       <CardMedia class="video-container">
     <VideoContainer weatherData={weatherData}/>
    </CardMedia>
    < Typography gutterBottom variant="h6" component="div" >
    {weatherData.weather[0].main}
       </Typography>
    < Typography gutterBottom variant="h2" component="div" >
    {weatherData.main.temp} &deg;C
       </Typography>
       <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
        <Paper elevation={3}>
          <p>Day: {moment().format('dddd')}</p>
          <p>Date: {moment().format('LL')}</p>
          <p>Time: {currentTime}</p>
          </Paper>
        <Paper elevation={3}>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
          </Paper>
        <Paper elevation={3}>Humidity: {weatherData.main.humidity} %</Paper>
        
        </Box>
    </CardContent>
    
  </Card>
 
</>
)}

export default CardExampleCard;