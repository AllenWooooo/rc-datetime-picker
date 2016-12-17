import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {MONTHS} from '../contants';
import {chunk} from '../utils';


class Month extends Component {
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

  changeYear = (dir) => {
    this.setState({
      moment: this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'year')
    });
  }

  select = (month, isDisabled) => {
    if (isDisabled) return;
    const _moment = this.state.moment.clone();

    _moment.month(month);

    this.setState({
      moment: _moment,
      selected: _moment
    });
    this.props.onSelect(_moment);
  }

  _renderMonth = (month, idx, row) => {
    const now = moment();
    const _moment = this.state.moment;
    const {max, min, months} = this.props;
    const {selected} = this.state;
    const isSelected = selected ? _moment.isSame(selected.clone().month(month), 'month') : false;
    const disabledMax = max ? _moment.clone().month(month).isAfter(max, 'month') : false;
    const disabledMin = min ? _moment.clone().month(month).isBefore(min, 'month') : false;
    const isDisabled = disabledMax || disabledMin;
    const className = classNames({
      selected: isSelected,
      now: now.isSame(_moment.clone().month(month), 'month'),
      disabled: isDisabled
    });

    return (
      <td key={month} className={className} onClick={() => this.select(month, isDisabled)}>{months ? months[idx + row * 3] : month}</td>
    );
  }

  render() {
    const _moment = this.state.moment;
    const months = MONTHS;

    return (
      <div className="calendar-months" style={this.props.style}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={() => this.changeYear('prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date" onClick={() => this.props.changePanel('year', _moment)}>{_moment.format('YYYY')}</span>
          <button type="button" className="next-month" onClick={() => this.changeYear('next')}>
            <i className="fa fa-angle-right"/>
          </button>
        </div>
        <table>
          <tbody>
            {chunk(months, 3).map((_months, idx) => {
              return (
                <tr key={idx}>
                  {_months.map((month, _idx) => {
                    return this._renderMonth(month, _idx, idx);
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


export default Month;
