import React, {Component} from 'react';
import ReactSlider from 'react-slider';
import moment from 'moment';


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
    const {moment} = this.state;

    return (
      <div style={this.props.style}>
        <div className="time">
          <div className="show-time">
            <span className="text">{moment.format('HH')}</span>
            <span className="separater">:</span>
            <span className="text">{moment.format('mm')}</span>
          </div>
          <div className="sliders">
            <span className="slider-text">Hours:</span>
            <ReactSlider min={0} max={23} value={moment.hour()} onChange={(value) => this.handleChange(value, 'hours')} withBars />
            <span className="slider-text">Minutes:</span>
            <ReactSlider min={0} max={59} value={moment.minute()} onChange={(value) => this.handleChange(value, 'minutes')} withBars />
          </div>
        </div>
      </div>
    );
  }
}


export default Time;
