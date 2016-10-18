import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import Calendar from './panels/Calendar.jsx';
import Time from './panels/Time.jsx';


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
    const className = classNames('datetime-picker', this.props.className, {
      split: this.props.splitPanel
    });
    const props = blacklist(this.props, 'className', 'isOpen', 'splitPanel');
    const {isOpen = true} = this.props;

    return (
      <div className={className} style={{display: isOpen ? 'block' : 'none'}} onClick={(evt) => evt.stopPropagation()}>
        <div className="panel-nav" style={{display: this.props.splitPanel ? 'block' : 'none'}}>
          <button type="button" onClick={() => this.changePanel('calendar')} className={this.state.panel === 'calendar' ? 'active' : ''}>
            <i className="fa fa-calendar-o"></i>Date
          </button>
          <button type="button" onClick={() => this.changePanel('time')} className={this.state.panel === 'time' ? 'active' : ''}>
            <i className="fa fa-clock-o"></i>Time
          </button>
        </div>
        <Calendar {...props} style={{display: this.state.panel === 'calendar' || !this.props.splitPanel ? 'block' : 'none'}} />
        <Time {...props} style={{display: this.state.panel === 'time' || !this.props.splitPanel ? 'block' : 'none'}} />
      </div>
    );
  }
}


export default Picker;
