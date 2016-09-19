import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import Calendar from './Calendar.jsx';
import Time from './Time.jsx';


class Picker extends Component {
  constructor() {
    super();
    this.state = {
      panel: 'calendar'
    };
  }

  changePanel = (panel) => {
    this.setState({
      panel
    });
  }

  render() {
    const className = classNames('datetime-picker', {
      hide: !this.props.isOpen,
      split: this.props.splitPanel,
      'calendar-panel': this.state.panel === 'calendar',
      'time-panel': this.state.panel === 'time',
    });
    const props = blacklist(this.props, 'className', 'isOpen');

    return (
      <div className={className}>
        <div className="panel-nav">
          <button type="button" onClick={() => this.changePanel('calendar')}>
            <i className="fa fa-calendar-o"></i>Date
          </button>
          <button type="button" onClick={() => this.changePanel('time')}>
            <i className="fa fa-clock-o"></i>Time
          </button>
        </div>
        <Calendar {...props} />
        <Time {...props} />
      </div>
    );
  }
}


export default Picker;
