import React, {Component} from 'react';
import classNames from 'classnames/bind';

import Day from './Day.jsx';
import Month from './Month.jsx';
import Year from './Year.jsx';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment,
      panel: 'day'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment
    });

    if (!props.isOpen) {
      this.setState({
        panel: 'day'
      });
    }
  }

  handleSelect = (moment) => {
    const {panel} = this.state;
    const {onChange} = this.props;
    const nextPanel = panel === 'year' ? 'month' : 'day';
    const currentPanel = panel;

    this.changePanel(nextPanel, moment);
    onChange && onChange(moment, currentPanel);
  }

  changePanel = (panel, moment = this.state.moment) => {
    this.setState({
      moment,
      panel
    });
  }

  render() {
    const {weeks, months, dayFormat, style} = this.props;
    const props = {
      moment: this.state.moment,
      onSelect: this.handleSelect,
      changePanel: this.changePanel,
      weeks,
      months,
      dayFormat
    };
    const {panel} = this.state;
    const isDayPanel = panel === 'day';
    const isMonthPanel = panel === 'month';
    const isYearPanel = panel === 'year';

    return (
      <div style={style}>
        <div className="calendar">
          <Day 
            {...props}
            style={{display: isDayPanel ? 'block' : 'none'}} />
          <Month 
            {...props}
            style={{display: isMonthPanel ? 'block' : 'none'}} />
          <Year 
            {...props}
            style={{display: isYearPanel ? 'block' : 'none'}} />
        </div>
      </div>
    );
  }
}


export default Calendar;
