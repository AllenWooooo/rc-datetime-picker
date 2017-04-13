import React, {Component} from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';

import Day from './Day.jsx';
import Month from './Month.jsx';
import Year from './Year.jsx';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: this.getCurrentMoment(props),
      panel: 'day'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: this.getCurrentMoment(props)
    });

    if (!props.isOpen) {
      this.setState({
        panel: 'day'
      });
    }
  }

  getCurrentMoment = (props) => {
    const {range, rangeAt} = props;
    const now = this.state ? this.state.moment || moment() : moment();
    let result = props.moment;

    if (result) {
      if (range) {
        result = result[rangeAt] || now;
      }
    } else {
      result = now;
    }

    return result;
  }

  handleSelect = (selected) => {
    const {panel} = this.state;
    const {onChange, range, rangeAt} = this.props;
    const nextPanel = panel === 'year' ? 'month' : 'day';
    let _selected = this.props.moment;
    let shouldChange = panel === 'day';

    if (_selected && !shouldChange) {
      if (range) {
        shouldChange = rangeAt === 'start' ? _selected.start : _selected.end;
      } else {
        shouldChange = true;
      }
    }

    if (range) {
      const copyed = _selected ? {..._selected} : {};

      copyed[rangeAt] = selected;
      _selected = copyed;
    } else {
      _selected = selected;
    }
    
    this.changePanel(nextPanel, selected);

    if (shouldChange) {
      onChange && onChange(_selected, panel);
    }
  }

  changePanel = (panel, moment = this.state.moment) => {
    this.setState({
      moment,
      panel
    });
  }

  render() {
    const {weeks, months, dayFormat, style, maxDate, minDate, dateLimit, range, rangeAt} = this.props;
    const props = {
      moment: this.state.moment,
      selected: this.props.moment,
      onSelect: this.handleSelect,
      changePanel: this.changePanel,
      weeks,
      months,
      dayFormat,
      maxDate,
      minDate,
      dateLimit,
      range,
      rangeAt
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
