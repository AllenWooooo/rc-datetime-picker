import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import Day from './Day';
import Month from './Month';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
  }

  render() {
    const className = classNames('calendar', this.props.className);

    return (
      <div className={className}>
        <Month {...this.props} />
      </div>
    );
  }
}


export default Calendar;
