import React, {Component} from 'react';
import ReactSlider        from 'react-slider';
import moment             from 'moment';
import {CONFIRM_BTN_TEXT} from '../contants';


class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment ? props.moment.clone() : moment().hours(0).minutes(0)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment ? props.moment.clone() : moment().hours(0).minutes(0)
    });
  }

  handleChange = (value, type) => {
    const {onChange} = this.props;
    const _moment = this.state.moment.clone();

    _moment[type](value);

    this.setState({
      moment: _moment
    });
    onChange && onChange(_moment);
  }

  render() {
    const _moment = this.state.moment.clone();

    return (
      <div style={this.props.style}>
        <div className="time">
          <div className="show-time">
            <span className="text">{_moment.format('HH')}</span>
            <span className="separater">:</span>
            <span className="text">{_moment.format('mm')}</span>
          </div>
          <div className="sliders">
            <span className="slider-text">Hours:</span>
            <ReactSlider min={0} max={23} value={_moment.hour()} onChange={(value) => this.handleChange(value, 'hours')} withBars />
            <span className="slider-text">Minutes:</span>
            <ReactSlider min={0} max={59} value={_moment.minute()} onChange={(value) => this.handleChange(value, 'minutes')} withBars />
          </div>
          {this.props.showOkBtn ?
            <div className="ok btn">
              <button onClick={this.props.byTimeOkBtnClose}>{CONFIRM_BTN_TEXT}</button>
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}


export default Time;
