import React, {Component} from 'react';
import ReactSlider from 'react-slider';


class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment
    };
  }

  handleChange = (value, type) => {
    let {moment} = this.props;

    moment[type](value);

    this.setState({
      moment
    });
    this.props.onChange && this.props.onChange(moment);
  }

  render() {
    const {moment} = this.state;

    return (
      <div className="time">
        <div className="show-time">
          <span className="text">{moment.format('HH')}</span>
          <span className="separater">:</span>
          <span className="text">{moment.format('mm')}</span>
        </div>
        <div className="sliders">
          <span className="slider-text">Hours:</span>
          <ReactSlider min={0} max={23} value={moment.hour()} onChange={(value) => this.handleChange(value, 'hours')} />
          <span className="slider-text">Minutes:</span>
          <ReactSlider min={0} max={59} value={moment.minute()} onChange={(value) => this.handleChange(value, 'minutes')} />
        </div>
      </div>
    );
  }
}


export default Time;
