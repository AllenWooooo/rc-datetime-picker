import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';

import {DatetimePicker, DatetimePickerTrigger} from '../src';
import './app.less';


class InlinePicker extends Component {
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
        <span className="text">Datetime: {this.state.moment.format('YYYY/MM/DD HH:mm')}</span>
        <DatetimePicker
          moment={moment()}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class PopupPicker extends Component {
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
      <DatetimePickerTrigger moment={this.state.moment} onChange={this.handleChange} appendToBody>
        <input type="text" value={this.state.moment.format('YYYY/MM/DD HH:mm')} readOnly />
        <span className="fa fa-calendar-o"></span>
      </DatetimePickerTrigger>
    );
  }
}

render(
  <InlinePicker />,
  document.getElementById('inline-picker')
);

render(
  <PopupPicker />,
  document.getElementById('popup-picker')
);

