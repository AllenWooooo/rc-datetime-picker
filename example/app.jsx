import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';

import {DatetimePicker, DatetimePickerTrigger} from '../dist/rc-datetime-picker.cjs.js';
import "../dist/picker.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      moment
    });
  }

  render() {
    return (
      <div>
        <DatetimePicker moment={moment()} isOpen />
        <DatetimePickerTrigger moment={this.state.moment} onChange={(moment) => this.handleChange(moment)}>
          <input type="text" value={this.state.moment.format('YYYY-MM-DD HH:mm')} readOnly />
        </DatetimePickerTrigger>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);
