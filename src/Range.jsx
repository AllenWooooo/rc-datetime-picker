import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import DatetimePicker from './Picker.jsx';
import Shortcuts from './panels/Shortcuts.jsx';
import {CONFIRM_BUTTON_TEXT, START_DATE_TEXT, END_DATE_TEXT} from './constants.js';


class Range extends Component {
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

  handleChange = (moment) => {
    this.setState({
      moment
    });
  }

  handleShortcutChange = (moment, isCustom) => {
    const {onChange} = this.props;
    
    if (isCustom) {
      this.setState({
        moment
      });
    } else {
      onChange && onChange(moment);  
    }
  }

  onConfirm = () => {
    const {moment} = this.state;
    const {onChange} = this.props;
    
    onChange && onChange(moment);
  }
  
  render() {
    const {moment} = this.state;
    const {
      format, 
      showTimePicker = false, 
      isOpen = true,
      shortcuts,
      confirmButtonText = CONFIRM_BUTTON_TEXT,
      startDateText = START_DATE_TEXT,
      endDateText = END_DATE_TEXT
    } = this.props;
    const formatStyle = format || (showTimePicker ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD');
    const className = classNames('datetime-range-picker', this.props.className);
    const props = blacklist(this.props, 'className', 'isOpen', 'format', 'moment', 'showTimePicker', 'shortcuts', 'onChange');

    return (
      <div className={className} style={{display: isOpen ? 'block' : 'none'}}>
        <div className="tools-bar">
          {shortcuts
            ? <Shortcuts {...props} moment={moment || {}} range shortcuts={shortcuts} onChange={this.handleShortcutChange} />
            : undefined
          }
          <div className="buttons">
            <button type="button" className="btn" onClick={this.onConfirm}>{confirmButtonText}</button>
          </div>
        </div>

        <div className="datetime-range-picker-panel">
          <table>
            <tbody>
              <tr>
                <td className="datetime-text">
                  <span className="text-label">{startDateText}</span>
                  <span className="text-value">{moment && moment.start ? moment.start.format(formatStyle) : undefined}</span>
                </td>
                <td className="datetime-text">
                  <span className="text-label">{endDateText}</span>
                  <span className="text-value">{moment && moment.end ? moment.end.format(formatStyle) : undefined}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <DatetimePicker
                    {...props}
                    isOpen={isOpen}
                    className="range-start-picker"
                    showTimePicker={showTimePicker}
                    moment={moment}
                    range
                    rangeAt="start"
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <DatetimePicker
                    {...props}
                    isOpen={isOpen}
                    className="range-end-picker"
                    showTimePicker={showTimePicker}
                    moment={moment}
                    range
                    rangeAt='end'
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default Range;