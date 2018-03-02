import React from 'react';
import PropTypes from 'prop-types';

import { 
    convertTimestamp,
    shortenTemperature 
} from './utils';
import images from './images';
const DailyWeather = props => {
    return (
        <section className="DailyWeather--section">
            <ul>
          <li className="DailyWeather--date">{convertTimestamp(props.time)}</li>
          <li className="DailyWeather--icon"><img src={images(props.icon)} alt={props.icon}/></li>
          <li className="DailyWeather--summary">{props.summary}</li>
          <li className="DailyWeather--temperature">
                <span className="high-temp">High</span>: {shortenTemperature(props.temperatureHigh)}&deg; F<br />
                <span className="low-temp">Low</span>: {shortenTemperature(props.temperatureLow)}&deg; F
          </li>
        </ul>
        </section>
    );
}

DailyWeather.propTypes = {
    time: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    temperatureHigh: PropTypes.number.isRequired,
    temperatureLow: PropTypes.number.isRequired
}

export default DailyWeather;