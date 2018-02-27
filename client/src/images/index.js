import rain from './rain.png';
import wind from './wind.png';
import clearDay from './sunny.png';
import clearNight from './clear-night.png';
import partlyCloudyDay from './cloudy-day.png';
import cloudyNight from './cloudy-night.png';
import cloudy from './clouds.png'


const selection = (name) => {
    switch(name){
        case 'rain':
            return rain
        case 'wind':
            return wind
        case 'clear-day':
            return clearDay
        case 'clear-night':
            return clearNight
        case 'partly-cloudy-day':
            return partlyCloudyDay
        case 'cloudy-night':
            return cloudyNight
        case 'cloudy':
            return cloudy
        default:
            return wind;
    }
}

export default selection;