import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './forecast-weather.css';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ForecastWeather = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const weekForecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  console.log(weekForecastDays);

  return (
    <>
      <label className="forecast-title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="forecast-daily-item">
                  <img
                    className="forecast-daily-icon"
                    src={`../../icons/${item.weather[0].icon}.png`}
                    alt="daily weather"
                  />
                  <label className="weather-day">
                    {weekForecastDays[index]}
                  </label>
                  <label className="weather-day-description">
                    {item.weather[0].description}
                  </label>
                  <label className="weather-day-min-max">
                    {Math.round(item.main.temp_min)}°C /{' '}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="weather-daili-details">
                <div className="weather-details-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="weather-details-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity} %</label>
                </div>
                <div className="weather-details-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all} %</label>
                </div>
                <div className="weather-details-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="weather-details-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className="weather-details-item">
                  <label>Feels like:</label>
                  <label>{Math.round(item.main.feels_like)} °C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default ForecastWeather;
