import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {WEEKS, DAY_FORMAT} from '../constants';
import {range as arrayRange, chunk} from '../utils';


class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment
    });
  }

  changeMonth = (dir) => {
    const _moment = this.state.moment.clone();

    this.setState({
      moment: _moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
    });
  }

  select = (day, isSelected, isDisabled, isPrevMonth, isNextMonth) => {
    if (isDisabled) return;
    const {range, onSelect} = this.props;
    const _moment = this.state.moment.clone();
    
    if (isPrevMonth) _moment.subtract(1, 'month');
    if (isNextMonth) _moment.add(1, 'month');

    _moment.date(day);
    
    this.setState({
      moment: range ? this.state.moment : _moment
    });
    onSelect(_moment);
  }

  _renderWeek = (week) => {
    return (
      <th key={week}>{week}</th>
    );
  }

  _renderDay = (week, day) => {
    const {maxDate, minDate, range, rangeAt, selected, dateLimit} = this.props;
    const now = moment();
    const _moment = this.state.moment;
    const isPrevMonth = week === 0 && day > 7;
    const isNextMonth = week >= 4 && day <= 14;
    const month = isNextMonth 
      ? _moment.clone().add(1, 'month') 
      : isPrevMonth 
        ? _moment.clone().subtract(1, 'month')
        : _moment.clone();
    const currentDay = month.clone().date(day);
    const start = selected && range 
      ? (selected.start ? currentDay.isSame(selected.start, 'day') : false) 
      : false; 
    const end = selected && range
      ? (selected.end ? currentDay.isSame(selected.end, 'day') : false) 
      : false; 
    const between = selected && range 
      ? (selected.start && selected.end 
        ? currentDay.isBetween(selected.start, selected.end, 'day') 
        : false) 
      : false;
    const isSelected = selected 
      ? range 
        ? (rangeAt === 'start' && start || rangeAt === 'end' && end)
        : currentDay.isSame(selected, 'day')
      : false;
    const disabledMax = maxDate ? currentDay.isAfter(maxDate, 'day') : false;
    const disabledMin = minDate ? currentDay.isBefore(minDate, 'day') : false;
    let disabled = false;
    let limited = false;

    if (range) {
      if (rangeAt === 'start' && selected && selected.end) {
        disabled = currentDay.isAfter(selected.end, 'day');
      } else if (rangeAt === 'end' && selected && selected.start) {
        disabled = currentDay.isBefore(selected.start, 'day');
      }
    }

    if (dateLimit && range) {
      const limitKey = Object.keys(dateLimit)[0];
      const limitValue = dateLimit[limitKey];
      let minLimitedDate, maxLimitedDate;

      if (selected) {

        if (rangeAt === 'start' && selected.end) {
          maxLimitedDate = selected.end.clone();
          minLimitedDate = maxLimitedDate.clone().subtract(limitValue, limitKey);
        } else if (rangeAt === 'end' && selected.start) {
          minLimitedDate = selected.start.clone();
          maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
        }

        if (minLimitedDate && maxLimitedDate) {
          limited = !currentDay.isBetween(minLimitedDate, maxLimitedDate, 'day', rangeAt === 'start' ? '(]' : '[)');
        }
      }
    }

    const isDisabled = disabledMax || disabledMin || disabled || limited;
    const className = classNames({
      prev: isPrevMonth,
      next: isNextMonth,
      selected: isSelected,
      now: now.isSame(currentDay, 'day'),
      disabled: isDisabled,
      start,
      end,
      between
    });

    return (
      <td 
        key={day} 
        className={className} 
        onClick={this.select.bind(this, day, isSelected, isDisabled, isPrevMonth, isNextMonth)}>
        {day}
      </td>
    );
  }

  render() {
    const {weeks = WEEKS, dayFormat = DAY_FORMAT, style, changePanel} = this.props;
    const _moment = this.state.moment;
    const firstDay = _moment.clone().date(1).day();
    const endOfThisMonth = _moment.clone().endOf('month').date();
    const endOfLastMonth = _moment.clone().subtract(1, 'month').endOf('month').date();
    const days = [].concat(
      arrayRange(endOfLastMonth - firstDay + 1, endOfLastMonth + 1),
      arrayRange(1, endOfThisMonth + 1),
      arrayRange(1, 42 - endOfThisMonth - firstDay + 1)
    );

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