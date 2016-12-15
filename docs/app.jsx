import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';

import {DatetimePicker, DatetimePickerTrigger} from '../dist/rc-datetime-picker.cjs.js';
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
      datetime: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      datetime: moment
    });
  }

  render() {
    const buttons = {
      'Today': moment(),
      'Yesterday': moment().subtract(1, 'days'),
      'Clear': null
    };
    const {datetime} = this.state;
    const value = datetime ? datetime.format('YYYY/MM/DD HH:mm') : '';
    
    return (
      <DatetimePickerTrigger buttons={buttons} moment={datetime} onChange={this.handleChange} appendToBody>
        <input type="text" value={value} readOnly />
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

