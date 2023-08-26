
import { useState } from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Search from './components/search/Search';
import ForecastWeather from './components/forecast-weather/ForecastWeather';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecatsWeather, setForecatsWeather] = useState(null);

  const URL_LAT = 'https://api.openweathermap.org/data/2.5'
  const WEATHER_API_KEY = '38ff886a4e3b7104f324a6067130ef6a'

  const foundNewCity = (searchCity) => {

    const [lat, lon] = searchCity.value.split(" ");

    const currentWeatherFetch = fetch(`${URL_LAT}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecatsWeatherFetch = fetch(`${URL_LAT}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecatsWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecatsResponse = await response[1].json();

        setCurrentWeather({ city: searchCity.label, ...weatherResponse })
        setForecatsWeather({ city: searchCity.label, ...forecatsResponse })
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather)
  console.log(forecatsWeather)



  return (
    <div className="container">
      <div className="search-container">
        <Search newSearchCity={foundNewCity} />
      </div>

      <div className="currnet-container">
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>

      <div className="forecast-container">
        {forecatsWeather && <ForecastWeather data={forecatsWeather} />}
      </div>
    </div>
  );
}

export default App;
