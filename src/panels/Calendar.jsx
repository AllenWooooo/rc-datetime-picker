import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {WEEKS} from '../contants.js';


const range = (start, end) => {
  let length = Math.max(end - start, 0);
  let result = [];

  while (length--) {
    result[length] = start + length;
  }

  return result;
};

const chunk = (array, size) => {
  let length = array.length;
  let index = 0;
  let resIndex = -1;
  let result = [];

  while (index < length) {
    result[++resIndex] = array.slice(index, (index += size));
  }

  return result;
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
  }

  changeMonth = (dir) => {
    this.setState({
      moment: this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
    });
  }

  selectDate = (day, isSelected, isPrevMonth, isNextMonth) => {
    if (isSelected) return;

    let m = this.state.moment;

    if (isPrevMonth) m.subtract(1, 'month');
    if (isNextMonth) m.add(1, 'month');

    m.date(day);

    this.setState({
      moment: m.clone(),
      selected: m.clone()
    });
    this.props.onChange && this.props.onChange(m);
  }

  _renderWeek(week) {
    return (
      <th key={week}>{week}</th>
    );
  }

  _renderDay(day, week) {
    const now = moment();
    const isPrevMonth = week === 0 && day > 7;
    const isNextMonth = week >= 4 && day <= 14;
    const isSelected = this.state.moment.isSame(this.state.selected, 'month') && this.state.selected.date() === day;
    const className = classNames({
      'prev-month': isPrevMonth,
      'next-month': isNextMonth,
      'selected': !isPrevMonth && !isNextMonth && isSelected,
      'today': !isPrevMonth && !isNextMonth && this.state.moment.isSame(now, 'month') && now.date() === day
    });

    return (
      <td key={day} className={className} onClick={() => this.selectDate(day, isSelected, isPrevMonth, isNextMonth)}>{day}</td>
    );
  }

  render() {
    const m = this.state.moment;
    const firstDay = m.clone().date(1).day();
    const endOfThisMonth = m.clone().endOf('month').date();
    const endOfLastMonth = m.clone().subtract(1, 'month').endOf('month').date();
    const days = [].concat(
      range(endOfLastMonth - firstDay + 1, endOfLastMonth + 1),
      range(1, endOfThisMonth + 1),
      range(1, 42 - endOfThisMonth - firstDay + 1)
    );
    const weeks = WEEKS;
    const className = classNames('calendar', this.props.className);

    return (
      <div className={className}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={() => this.changeMonth('prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date">{m.format('MMMM, YYYY')}</span>
          <button type="button" className="next-month" onClick={() => this.changeMonth('next')}>
            <i className="fa fa-angle-right"/>
          </button>
        </div>
        <table>
          <thead>
            <tr>{weeks.map((week) => this._renderWeek(week))}</tr>
          </thead>
          <tbody>
            {chunk(days, 7).map((week, weekIdx) => {
              return (
                <tr key={weekIdx}>
                  {week.map((day) => {
                    return this._renderDay(day, weekIdx);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Calendar;
