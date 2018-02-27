import React from 'react';
import axios from 'axios';

class Zipcode extends Component {
    constructor() {
        super();
        this.state= {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        if (this.state.value.length === 4 && !isNaN(this.state.value)) {
          console.log('Getting location...');
          this.getLocationFromZip(e.target.value);
        }
      }

      render() {
        return <div className="zip">
          <input type="text"
                 maxLength="5"
                 value={this.state.value}
                 onChange={this.handleChange}
                 placeholder="Enter zip code"/>
        </div>;
      }
}

export default Zipcode;