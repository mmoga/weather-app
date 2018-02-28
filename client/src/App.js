import React, { Component } from 'react';
import './App.css';

import { 
  // getWeather, 
  getWeatherByZip 
} from './services/weather';
import { isEmptyObject } from './utils';
import DailyWeather from './DailyWeather';
// import Zipcode from './Zipcode';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // lat: '',
      // lon: '',
      zip: '',
      dailyWeather: {},
      error: null
    };
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    // this.setZip = this.setZip.bind(this);
  }
  // handleZipChange(e) {
  //   this.setState({ value: e.target.value });
  //   if (this.state.value.length === 4 && !isNaN(this.state.value)) {
  //     this.handleZipChange();
  //   }
  // }
  handleZipChange(e) {
    this.setState({
      zip: +e.target.value
    });
    console.log('Zip set!');
  }

  handleLatChange(e) {
    this.setState({
      lat: +e.target.value
    });
  }

  handleLonChange(e) {
    this.setState({
      lon: +e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    // getWeather(this.state.lat, this.state.lon)
    getWeatherByZip(this.state.zip)
      .then(response => {
        const dailyWeather = response.data.daily;
        this.setState({
          dailyWeather: dailyWeather
        });
        console.log(this.state.dailyWeather)
      })
      .catch(error => {
        console.error(error);
        this.setState({
          error: "Something is broken"
        });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <h1>{this.state.error}</h1>
      )
    }
    return (
      <div>
        <div className="App--header">
          <h1>The Weather App</h1>
          <p>What's the weather?</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text"
                 maxLength="5"
                 value={this.state.zip}
                 onChange={(e) => this.handleZipChange(e)}
                 placeholder="Enter zip code"/>
          {/* <label>
            Latitude:
            <input 
            type="number"
            onChange={(e) => this.handleLatChange(e)}
            value={this.state.lat}
            min="-90"
            max="90"/>
          </label>
          <label>
            Longitude:
            <input 
            type="number"
            onChange={(e) => this.handleLonChange(e)}
            value={this.state.lon}
            min="-180"
            max="180"/>
          </label> */}
          <button type="submit">Tell me!</button>
        </form>
        </div>
        { this.state.error ? <h1>{this.state.error}</h1> : '' }
        { isEmptyObject(this.state.dailyWeather) ?
          "" :
          this.state.dailyWeather.data.map((day, index) => {
            return <div key={index} className="App">
                <DailyWeather {...day} />
              </div>
          })
        }
      </div>
    );
  }
}

export default App;
