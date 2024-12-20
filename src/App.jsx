import './App.css';
import {useState} from "react";
import Search from './components/search/Search';
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import {urlWeather, keyWeatherAPI, urlForecast } from "./Api.js";
import Forecast from "./components/forecast/Forecast.jsx";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)
  
  const handleOnSearchChange = (searchData) =>{
    const [lati, longi] =  searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(`${urlWeather}weather?lat=${lati}&lon=${longi}&appid=${keyWeatherAPI}&units=metric` ) 
    const forecastWeatherFetch = fetch(`${urlForecast}forecast?lat=${lati}&lon=${longi}&appid=${keyWeatherAPI}&units=metric`)
    
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then( async(response) =>{
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city:searchData.label, ...weatherResponse}); 
        setForecastWeather({city:searchData.label, ...forecastResponse});
        
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  console.log(currentWeather);
  console.log(forecastWeather);

  return (
    <div className="container">
      <h1 style={{fontFamily:"monospace",letterSpacing:"3px"}}>Weather App</h1>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather === null ? 
        <h3 style={{textAlign:"center"}}>Search for a City</h3> : 
        <CurrentWeather  data={currentWeather}/>}
      {forecastWeather === null? 
        <></>:
        <Forecast data={forecastWeather}/>
        }
    </div>
  )
}

export default App
