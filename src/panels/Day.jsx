import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {WEEKS} from '../contants';
import {range, chunk} from '../utils';


class Day extends Component {
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

  select = (day, isSelected, isPrevMonth, isNextMonth) => {
    if (isSelected) return;

    const _moment = this.state.moment;

    if (isPrevMonth) _moment.subtract(1, 'month');
    if (isNextMonth) _moment.add(1, 'month');

    _moment.date(day);

    this.setState({
      moment: _moment.clone(),
      selected: _moment.clone()
    });
    this.props.onChange && this.props.onChange(_moment);
  }

  _renderWeek(week) {
    return (
      <th key={week}>{week}</th>
    );
  }

  _renderDay(day, week) {
    const now = moment();
    const _moment = this.state.moment;
    const {selected} = this.state;
    const isPrevMonth = week === 0 && day > 7;
    const isNextMonth = week >= 4 && day <= 14;
    const isSelected = !isPrevMonth && !isNextMonth && _moment.isSame(selected, 'month') && selected.date() === day;
    const className = classNames({
      'prev': isPrevMonth,
      'next': isNextMonth,
      'selected': isSelected,
      'now': !isPrevMonth && !isNextMonth && _moment.isSame(now, 'month') && now.date() === day
    });

    return (
      <td key={day} className={className} onClick={() => this.select(day, isSelected, isPrevMonth, isNextMonth)}>{day}</td>
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
    const weeks = WEEKS;

    return (
      <div className="calendar-days">
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={() => this.changeMonth('prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date">{_moment.format('MMMM, YYYY')}</span>
          <button type="button" className="next-month" onClick={() => this.changeMonth('next')}>
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
                  {week.map((day) => {
                    return this._renderDay(day, idx);
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


export default Day;