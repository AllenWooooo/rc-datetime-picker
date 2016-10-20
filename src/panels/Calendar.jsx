import React, {Component} from 'react';
import classNames from 'classnames/bind';

import Day from './Day.jsx';
import Month from './Month.jsx';
import Year from './Year.jsx';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment.clone(),
      panel: 'day'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      panel: 'day'
    });
  }

  handleSelect = (moment) => {
    const nextPanel = this.state.panel === 'year' ? 'month' : 'day';
    const currentPanel = this.state.panel;

    this.changePanel(nextPanel, moment);
    this.props.onChange && this.props.onChange(moment, currentPanel);
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
      <div style={this.props.style}>
        <div className={className}>
          <Day {...props}
            style={{display: this.state.panel === 'day' ? 'block' : 'none'}} />
          <Month {...props}
            style={{display: this.state.panel === 'month' ? 'block' : 'none'}} />
          <Year {...props}
            style={{display: this.state.panel === 'year' ? 'block' : 'none'}} />
        </div>
      </div>
    );
  }
}


export default Calendar;
