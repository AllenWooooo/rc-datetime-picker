import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {chunk, range} from '../utils';


class Year extends Component {
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

  changePeriod = (dir) => {
    const _moment = this.state.moment.clone();

    this.setState({
      moment: _moment[dir === 'prev' ? 'subtract' : 'add'](10, 'year')
    });
  }

  select = (year, isDisabled) => {
    if (isDisabled) return;
    const _moment = this.state.moment.clone();

    _moment.year(year);

    this.setState({
      moment: _moment,
      selected: _moment
    });
    this.props.onSelect(_moment);
  }

  _renderYear = (year) => {
    const now = moment();
    const _moment = this.state.moment;
    const firstYear = Math.floor(_moment.year() / 10) * 10;
    const {maxDate, minDate, selected, range, rangeAt, dateLimit} = this.props;
    const currentYear = _moment.clone().year(year);
    const start = selected && range 
      ? (selected.start ? currentYear.isSame(selected.start, 'year') : false) 
      : false; 
    const end = selected && range
      ? (selected.end ? currentYear.isSame(selected.end, 'year') : false) 
      : false; 
    const between = selected && range 
      ? (selected.start && selected.end 
        ? currentYear.isBetween(selected.start, selected.end, 'year') 
        : false) 
      : false;
    const isSelected = selected 
      ? range 
        ? selected[rangeAt] ? selected[rangeAt].year() === year : false
        : selected.year() === year
      : false;
    const disabledMax = maxDate ? year > maxDate.year() : false;
    const disabledMin = minDate ? year < minDate.year() : false;
    let disabled = false;
    let limited = false;

    if (range) {
      if (rangeAt === 'start' && selected && selected.end) {
        disabled = selected.end && currentYear.isAfter(selected.end, 'day');
      } else if (rangeAt === 'end' && selected && selected.start) {
        disabled = selected.start && currentYear.isBefore(selected.start, 'day');
      }
    }

    if (dateLimit && range) {
      const limitKey = Object.keys(dateLimit)[0];
      const limitValue = dateLimit[limitKey];
      let minLimitedDate, maxLimitedDate;

      if (selected) {

        if (rangeAt === 'start' && selected.start && selected.end) {
          maxLimitedDate = selected.end.clone();
          minLimitedDate = maxLimitedDate.clone().subtract(limitValue, limitKey);
        } else if (rangeAt === 'end' && selected.start && selected.end) {
          minLimitedDate = selected.start.clone();
          maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
        }

        if (minLimitedDate && maxLimitedDate) {
          limited = !currentYear.isBetween(minLimitedDate, maxLimitedDate, 'day', rangeAt === 'start' ? '(]' : '[)');
        }
      }
    }

    const isDisabled = disabledMax || disabledMin || disabled || limited;
    const className = classNames({
      selected: isSelected,
      now: now.year() === year,
      prev: firstYear - 1 === year,
      next: firstYear + 10 === year,
      disabled: isDisabled,
      start,
      end,
      between
    });

    return (
      <td key={year} className={className} onClick={this.select.bind(this, year, isDisabled)}>{year}</td>
    );
  }

  render() {
    const _moment = this.state.moment;
    const {style} = this.props;
    const firstYear = Math.floor(_moment.year() / 10) * 10;
    const years = range(firstYear - 1, firstYear + 11);

    return (
      <div className="calendar-years" style={style}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={this.changePeriod.bind(this, 'prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date disabled">{firstYear} - {firstYear + 9}</span>
          <button type="button" className="next-month" onClick={this.changePeriod.bind(this, 'next')}>
            <i className="fa fa-angle-right"/>
          </button>
        </div>
        <table>
          <tbody>
            {chunk(years, 4).map((_years, idx) => {
              return (
                <tr key={idx}>
                  {_years.map(this._renderYear)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Year;
