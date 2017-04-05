import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {MONTHS} from '../contants';
import {chunk} from '../utils';


class Month extends Component {
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

  changeYear = (dir) => {
    const _moment = this.state.moment.clone();

    this.setState({
      moment: _moment[dir === 'prev' ? 'subtract' : 'add'](1, 'year')
    });
  }

  select = (idx, row, isDisabled) => {
    if (isDisabled) return;
    const _moment = this.state.moment.clone();

    _moment.month((row * 3) + idx);

    this.setState({
      moment: _moment,
      selected: _moment
    });
    this.props.onSelect(_moment);
  }

  _renderMonth = (row, month, idx) => {
    const now = moment();
    const _moment = this.state.moment;
    const {maxDate, minDate, months} = this.props;
    const {selected} = this.state;
    const isSelected = selected ? _moment.isSame(selected.clone().month((row * 3) + idx), 'month') : false;
    const disabledMax = maxDate ? _moment.clone().month((row * 3) + idx).isAfter(maxDate, 'month') : false;
    const disabledMin = minDate ? _moment.clone().month((row * 3) + idx).isBefore(minDate, 'month') : false;
    const isDisabled = disabledMax || disabledMin;
    const className = classNames({
      selected: isSelected,
      now: now.isSame(_moment.clone().month((row * 3) + idx), 'month'),
      disabled: isDisabled
    });

    return (
      <td key={month} className={className} onClick={this.select.bind(this, idx, row, isDisabled)}>{months ? months[idx + row * 3] : month}</td>
    );
  }

  render() {
    const _moment = this.state.moment;
    const months = MONTHS;
    const {changePanel, style} = this.props;

    return (
      <div className="calendar-months" style={style}>
        <div className="calendar-nav">
          <button type="button" className="prev-month" onClick={this.changeYear.bind(this, 'prev')}>
            <i className="fa fa-angle-left"/>
          </button>
          <span className="current-date" onClick={changePanel.bind(this, 'year', _moment)}>{_moment.format('YYYY')}</span>
          <button type="button" className="next-month" onClick={this.changeYear.bind(this, 'next')}>
            <i className="fa fa-angle-right"/>
          </button>
        </div>
        <table>
          <tbody>
            {chunk(months, 3).map((_months, idx) => {
              return (
                <tr key={idx}>
                  {_months.map(this._renderMonth.bind(this, idx))}
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
