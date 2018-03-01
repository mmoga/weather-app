import React, { Component } from 'react';
import './App.css';

import { getWeatherByZip } from './services/weather';
import { isEmptyObject } from './utils';
import DailyWeather from './DailyWeather';

class App extends Component {
  constructor() {
    super();
    this.state = {
      zip: '',
      dailyWeather: {},
      error: null
    };
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    // this.zipAlert = this.zipAlert.bind(this);
  }
  // zipAlert(e) {
  //   this.setState({ value: e.target.value });
  //   if (this.state.value.length === 4 && !isNaN(this.state.value)) {
  //     alert('Enter numbers!');
  //   }
  // }

  handleZipChange(e) {
    this.setState({
      zip: +e.target.value
    });
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
    getWeatherByZip(this.state.zip)
      .then(response => {
        const dailyWeather = response.data.daily;
        this.setState({
          dailyWeather: dailyWeather
        });
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
          <button className="submit-btn" type="submit">Tell me!</button>
        </form>
        </div>
        { this.state.error ? <h1>{this.state.error}</h1> : '' }
        <div className="App--main">
          { isEmptyObject(this.state.dailyWeather) ?
            "" :
            this.state.dailyWeather.data.map((day, index) => {
              return <div key={index} className="App--boxes">
                  <DailyWeather {...day} />
                </div>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
