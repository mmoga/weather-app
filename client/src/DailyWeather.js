import React from 'react';
import PropTypes from 'prop-types';

import { convertTimestamp } from './utils';

const DailyWeather = props => {
    return (
        <section>
            <ul>
          <li>Time: {convertTimestamp(props.time)}</li>
          <li>Summary: {props.summary}</li>
          {/* <li>Icon: <img src={images(props.icon)} alt={props.icon}/></li> */}
          <li>Temperature: {props.temperature}&deg; F</li>
        </ul>
        </section>
    );
}

DailyWeather.propTypes = {
    time: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    // icon: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired
}

export default DailyWeather;