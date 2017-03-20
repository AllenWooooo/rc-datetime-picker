import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {WEEKS, DAY_FORMAT} from '../contants';
import {range, chunk} from '../utils';


class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment || moment(),
      selected: props.moment
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment || moment(),
      selected: props.moment
    });
  }

  changeMonth = (dir) => {
    const _moment = this.state.moment.clone();

    this.setState({
      moment: _moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
    });
  }

  select = (day, isSelected, isDisabled, isPrevMonth, isNextMonth) => {
    if (isSelected || isDisabled) return;

    const _moment = this.state.moment.clone();

    if (isPrevMonth) _moment.subtract(1, 'month');
    if (isNextMonth) _moment.add(1, 'month');

    _moment.date(day);

    this.setState({
      moment: _moment,
      selected: _moment
    });
    this.props.onSelect(_moment);
  }

  _renderWeek = (week) => {
    return (
      <th key={week}>{week}</th>
    );
  }

  _renderDay = (week, day) => {
    const now = moment();
    const _moment = this.state.moment;
    const {maxDate, minDate} = this.props;
    const {selected} = this.state;
    const isPrevMonth = week === 0 && day > 7;
    const isNextMonth = week >= 4 && day <= 14;
    const month = isNextMonth 
                  ? _moment.clone().add(1, 'month') 
                  : isPrevMonth 
                    ? _moment.clone().subtract(1, 'month')
                    : _moment.clone();
    const isSelected = selected ? month.isSame(selected.clone().date(day), 'day') : false;
    const disabledMax = maxDate ? month.date(day).isAfter(maxDate, 'day') : false;
    const disabledMin = minDate ? month.date(day).isBefore(minDate, 'day') : false;
    const isDisabled = disabledMax || disabledMin;
    const className = classNames({
      prev: isPrevMonth,
      next: isNextMonth,
      selected: isSelected,
      now: now.isSame(month.date(day), 'day'),
      disabled: isDisabled
    });

    return (
      <td key={day} className={className} onClick={this.select.bind(this, day, isSelected, isDisabled, isPrevMonth, isNextMonth)}>{day}</td>
    );
  }

  render() {
    const _moment = this.state.moment;
    const firstDay = _moment.clone().date(1).day();
    const endOfThisMonth = _moment.clone().endOf('month').date();
    const endOfLastMonth = _moment.clone().subtract(1, 'month').endOf('month').date();
    const days = [].concat(
      range(endOfLastMonth - firstDay + 1, endOfLastMonth + 1),
      range(1, endOfThisMonth + 1),
      range(1, 42 - endOfThisMonth - firstDay + 1)
    );
    const {weeks = WEEKS, dayFormat = DAY_FORMAT, style, changePanel} = this.props;

    return (
      <div className="calendar-days" style={style}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={this.changeMonth.bind(this, 'prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date" onClick={changePanel.bind(this, 'month', _moment)}>{_moment.format(dayFormat)}</span>
          <button type="button" className="next-month" onClick={this.changeMonth.bind(this, 'next')}>
            <i className="fa fa-angle-right"/>
          </button>
        </div>
        <table>
          <thead>
            <tr>{weeks.map((week) => this._renderWeek(week))}</tr>
          </thead>
          <tbody>
            {chunk(days, 7).map((week, idx) => {
              return (
                <tr key={idx}>
                  {week.map(this._renderDay.bind(this, idx))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Day;