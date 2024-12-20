import React from 'react';
import {Accordion, AccordionItem, AccordionItemPanel, 
        AccordionItemHeading,
        AccordionItemButton} from "react-accessible-accordion";
import "./Forecast.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Forecast({data}) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = DAYS.slice(dayInAWeek, DAYS.length)
    .concat(DAYS.slice(0, dayInAWeek))
  return (
    <div className="allAccordion">
        <label className="title">Daily</label>
        <Accordion allowZeroExpanded>
            { data !==null ?
            data.list.splice(0, 7).map((item, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="daily-item">
                      <img alt="weather-icon"
                      className="icon-small"
                      src={`../../../icons/${item.weather[0].icon}.png`}/>
                      <label className="forecastDay">{forecastDays[index]}</label>
                      <label className="forecastDesc">{item.weather[0].description}</label>
                      <label className="forecastTemp">{Math.round(item.main.temp)}°C</label>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="daily-details-grid">
                  <div className="daily-details-item">
                      <label>Feels Like:</label>
                      <label>{Math.round(item.main.feels_like)}°</label>
                    </div>
                    <div className="daily-details-item">
                      <label>Humidity:</label>
                      <label>{item.main.humidity} %</label>
                    </div>
                    <div className="daily-details-item">
                      <label>Wind Speed:</label>
                      <label>{item.wind.speed} m/s</label>
                    </div>
                    <div className="daily-details-item">
                      <label>Sea Level:</label>
                      <label>{item.main.sea_level} mts</label>
                    </div>
                    <div className="daily-details-item">
                      <label>Pressure:</label>
                      <label>{item.main.pressure} hPa</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>)) :
            <></>}  
        </Accordion>
    </div>
  )
}

export default Forecast