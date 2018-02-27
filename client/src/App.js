import React, { Component } from 'react';
import './App.css';

import { getWeather } from './services/weather';
import { isEmptyObject } from './utils';
import DailyWeather from './DailyWeather';
import Zipcode from '/.Zipcode';

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
          <label>
            Zipcode:
            <Zipcode />
          </label>
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
