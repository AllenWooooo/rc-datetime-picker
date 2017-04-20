import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {CUSTOME_BUTTON_TEXT} from '../constants';

const isSameRange = (current, value) => {
  return current.start && current.end && current.start.isSame(value.start, 'day') && current.end.isSame(value.end, 'day')
}

class Shortcuts extends Component {
  handleClick = (value) => {
    const {onChange} = this.props;

    onChange && onChange(value, 'day');
  }

  _renderShortcut = (key, value) => {
    const {moment, range, shortcuts, customeButtonText = CUSTOME_BUTTON_TEXT} = this.props;
    const selected = range 
                      ? key !== 'custome' && isSameRange(moment, value)
                      : false;
    const isCustomeSelected = range
                       ? !Object.keys(shortcuts).some((_key) => isSameRange(moment, shortcuts[_key])) && key === 'custome'
                       : false;
    const className = classNames('btn', {
      selected: selected || isCustomeSelected
    });

    return (
      <button 
        className={className} 
        key={key} 
        type="button" 
        onClick={this.handleClick.bind(this, value)}>
        {key === 'custome' ? customeButtonText : key}
      </button>
    );
  }

  _renderShortcuts = () => {
    const {shortcuts, showCustomeButton} = this.props;
    const renderShortcuts = showCustomeButton ? {...shortcuts, 'custome': {}} : shortcuts;

    return Object.keys(renderShortcuts).map((key) => {
      return this._renderShortcut(key, shortcuts[key]);
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