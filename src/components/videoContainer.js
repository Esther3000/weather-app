import React from "react";
import './css/weather.css';
import clouds from './weather-elements/64960-rainy-icon.mp4';



const VideoContainer = ({ weatherData }) => {
  {/*let imgSrc = "";

  // Get the weather description from the weatherData prop
  const weatherDescription = weatherData.weather[0].main;

  // Determine the video source based on the weather description
  if (weatherDescription.includes("thunderstorm")) {
    imgSrc = clouds;
  } else if (weatherDescription.includes("rain")) {
    imgSrc = clouds;
  } else if (weatherDescription.includes("clouds")) {
    imgSrc = clouds;
  } else if (weatherDescription.includes("snow")) {
    imgSrc = clouds;
  } else if (weatherDescription.includes("clear sky")) {
    imgSrc = sun;
  }else {
    imgSrc = sun;
  }*/}

  return (
    <div className="video-container">
      <video autoPlay loop muted class="video">
        <source src={clouds} />
      </video>
      
    </div>
  );
};

export default VideoContainer;
