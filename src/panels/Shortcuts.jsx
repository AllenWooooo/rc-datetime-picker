import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import {CUSTOME_BUTTON_TEXT} from '../constants';

const isSameRange = (current, value) => {
  return current.start && current.end && current.start.isSame(value.start, 'day') && current.end.isSame(value.end, 'day')
}

class Shortcuts extends Component {
  handleClick = (value, isCustome) => {
    const {onChange, range, showCustomeButton} = this.props;

    if (range) {
      onChange && onChange(value, isCustome);
    } else {
      onChange && onChange(value, 'day');
    }
  }

  _renderShortcut = (key, value) => {
    const {range, shortcuts, customeButtonText = CUSTOME_BUTTON_TEXT} = this.props;
    const current = this.props.moment;
    const selected = range 
                      ? key !== 'custome' && isSameRange(current, value)
                      : false;
    const isCustomeSelected = range
                       ? !Object.keys(shortcuts).some((_key) => isSameRange(current, shortcuts[_key])) && key === 'custome'
                       : false;
    const className = classNames('btn', {
      selected: selected || isCustomeSelected
    });

    return (
      <button 
        className={className} 
        key={key} 
        type="button" 
        onClick={this.handleClick.bind(this, value, key === 'custome')}>
        {key === 'custome' ? customeButtonText : key}
      </button>
    );
  }

  _renderShortcuts = () => {
    const {shortcuts, showCustomeButton} = this.props;
    const renderShortcuts = showCustomeButton 
                             ? {
                                ...shortcuts, 
                                custome: {
                                  start: moment().subtract(29, 'days'),
                                  end: moment().endOf('day')
                                }} 
                             : shortcuts;

    return Object.keys(renderShortcuts).map((key) => {
      return this._renderShortcut(key, renderShortcuts[key]);
    });
  }

  render() {
    
    return (
      <div className="shortcuts-bar">
        {this._renderShortcuts()}
      </div>
    );
  }
}


export default Shortcuts;