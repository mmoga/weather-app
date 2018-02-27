import React, { Component } from 'react';
import './App.css';

import { getWeather } from './services/weather';
import { isEmptyObject } from './utils';
import DailyWeather from './DailyWeather';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: '',
      lon: '',
      dailyWeather: {},
      error: null
    };
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    getWeather(this.state.lat, this.state.lon)
      .then(response => {
      //   const d = response.data;
      //   const days = d.daily.data;
      //   this.setState({
      //     weather: {
      //       'current': d.currently.temperature,
      //       'summary': d.hourly.summary,
      //       'daily': [days[1], days[2], days[3], days[4], days[5]]
      //     }
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
        <h1>Welcome to Woother!</h1>
        <p>What's the Woother?</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
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
          </label>
          <button type="submit">Woot!</button>
        </form>
        { this.state.error ? <h1>{this.state.error}</h1> : '' }
        { isEmptyObject(this.state.dailyWeather) ?
          "" :
          this.state.dailyWeather.data.map(day => {
            return <DailyWeather {...day} />
          })
        }


          {/* <pre>
            {JSON.stringify(this.state.dailyWeather, null, 4)}
          </pre> */}
      </div>
    );
  }
}

export default App;
