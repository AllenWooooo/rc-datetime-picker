import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {chunk, range} from '../utils';


class Year extends Component {
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

  changePeriod = (dir) => {
    this.setState({
      moment: this.state.moment[dir === 'prev' ? 'subtract' : 'add'](10, 'year')
    });
  }

  select = (year) => {
    const _moment = this.state.moment.clone();

    _moment.year(year);

    this.setState({
      moment: _moment,
      selected: _moment
    });
    this.props.onSelect(_moment);
  }

  _renderYear(year) {
    const now = moment();
    const _moment = this.state.moment;
    const firstYear = Math.floor(_moment.year() / 10) * 10;
    const {selected} = this.state;
    const isSelected = selected ? selected.year() === year : false;
    const className = classNames({
      'selected': isSelected,
      'now': now.year() === year,
      'prev': firstYear - 1 === year,
      'next': firstYear + 10 === year
    });

    return (
      <td key={year} className={className} onClick={() => this.select(year)}>{year}</td>
    );
  }

  render() {
    const _moment = this.state.moment;
    const firstYear = Math.floor(_moment.year() / 10) * 10;
    const years = range(firstYear - 1, firstYear + 11);

    return (
      <div className="calendar-years" style={this.props.style}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={() => this.changePeriod('prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date disabled">{firstYear} - {firstYear + 9}</span>
          <button type="button" className="next-month" onClick={() => this.changePeriod('next')}>
            <i className="fa fa-angle-right"/>
          </button>
        </div>
        <table>
          <tbody>
            {chunk(years, 4).map((_years, idx) => {
              return (
                <tr key={idx}>
                  {_years.map((year) => {
                    return this._renderYear(year);
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


export default Year;
