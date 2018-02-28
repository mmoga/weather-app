import axios from 'axios';

export const getWeatherByZip = (zipcode) => {
    const url = `/maps/api/geocode/json?address=${zipcode}`;
    return axios.get(url)
        .then(response => {
            const lat = response.results.location.lat;
            const lon = response.results.location.lon;
            return getWeather(lat, lon);
        })
}

export const getWeather = (latitude, longitude) => {
    const url = `/forecast/${longitude},${latitude}`;
    return axios.get(url);
}