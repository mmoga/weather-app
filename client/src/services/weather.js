import axios from 'axios';

export const getWeatherByZip = (zipcode) => {
    const url = `geocode/${zipcode}`;
    return axios.get(url)
        .then(response => {
            const lat = response.data.results[0].geometry.location.lat;
            const lon = response.data.results[0].geometry.location.lng;
            return getWeather(lat, lon);
        })
}

export const getWeather = (latitude, longitude) => {
    const url = `/forecast/${longitude},${latitude}`;
    return axios.get(url);
}