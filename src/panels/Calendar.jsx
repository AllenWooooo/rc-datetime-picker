import React, {Component} from 'react';
import classNames from 'classnames/bind';

import Day from './Day';
import Month from './Month';
import Year from './Year';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment.clone(),
      panel: 'day'
    };
  }

  handleSelect = (moment) => {
    const nextPanel = this.state.panel === 'year' ? 'month' : 'day';

    this.changePanel(nextPanel, moment);
    this.props.onChange && this.props.onChange(moment);
  }

  changePanel = (panel, moment = this.state.moment) => {
    this.setState({
      moment,
      panel
    });
  }

  render() {
    const className = classNames('calendar', this.props.className);
    const props = {
      moment: this.state.moment,
      onSelect: this.handleSelect,
      changePanel: this.changePanel
    };

    return (
      <div className={className}>
        <Day {...props} 
          style={{display: this.state.panel === 'day' ? 'block' : 'none'}} />
        <Month {...props} 
          style={{display: this.state.panel === 'month' ? 'block' : 'none'}} />
        <Year {...props} 
          style={{display: this.state.panel === 'year' ? 'block' : 'none'}} />
      </div>
    );
  }
}


export default Calendar;
