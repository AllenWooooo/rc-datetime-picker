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

  select = (month) => {
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
    const _month = moment().month(month).month();
    const _moment = this.state.moment;
    const {selected} = this.state;
    const isSelected = selected ? _moment.isSame(selected, 'year') && selected.month() === _month : false;
    const className = classNames({
      'selected': isSelected,
      'now': _moment.isSame(now, 'year') && now.month() === _month
    });
    const {months} = this.props;

    return (
      <td key={month} className={className} onClick={() => this.select(_month)}>{months ? months[idx + row * 3] : month}</td>
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
