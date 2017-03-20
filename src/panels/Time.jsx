import React, {Component} from 'react';
import ReactSlider from 'react-slider';
import moment from 'moment';


class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment || moment().hours(0).minutes(0)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment || moment().hours(0).minutes(0)
    });
  }

  handleChange = (type, value) => {
    const {onChange} = this.props;
    const _moment = this.state.moment.clone();

    _moment[type](value);

    this.setState({
      moment: _moment
    });
    onChange && onChange(_moment);
  }

  render() {
    const _moment = this.state.moment;
    const {style} = this.props;

    return (
      <div style={style}>
        <div className="time">
          <div className="show-time">
            <span className="text">{_moment.format('HH')}</span>
            <span className="separater">:</span>
            <span className="text">{_moment.format('mm')}</span>
          </div>
          <div className="sliders">
            <span className="slider-text">Hours:</span>
            <ReactSlider min={0} max={23} value={_moment.hour()} onChange={this.handleChange.bind(this, 'hours')} withBars />
            <span className="slider-text">Minutes:</span>
            <ReactSlider min={0} max={59} value={_moment.minute()} onChange={this.handleChange.bind(this, 'minutes')} withBars />
          </div>
        </div>
      </div>
    );
  }
}


export default Time;
