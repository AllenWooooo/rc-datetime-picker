import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {WEEKS, DAY_FORMAT} from '../contants';
import {range, chunk} from '../utils';


class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment ? props.moment.clone() : moment(),
      selected: props.moment ? props.moment.clone() : null
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment ? props.moment.clone() : moment(),
      selected: props.moment ? props.moment.clone() : null
    });
  }

  changeMonth = (dir) => {
    this.setState({
      moment: this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
    });
  }

  select = (day, isSelected, isPrevMonth, isNextMonth) => {
    if (isSelected) return;

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
    const isSelected = selected ? !isPrevMonth && !isNextMonth && _moment.isSame(selected, 'month') && selected.date() === day : false;
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
    const {weeks = WEEKS, dayFormat = DAY_FORMAT} = this.props;

    return (
      <div className="calendar-days" style={this.props.style}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={() => this.changeMonth('prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date" onClick={() => this.props.changePanel('month', _moment)}>{_moment.format(dayFormat)}</span>
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