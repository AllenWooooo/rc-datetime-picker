import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import blacklist from 'blacklist';

import DatetimeRangePicker from './Range.jsx';
import Portal from './Portal.jsx';


class RangeTrigger extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      pos: {}
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick, false);

    if (this.props.appendToBody) {
      window.addEventListener('scroll', this.handlePortalPosition, false);
      window.addEventListener('resize', this.handlePortalPosition, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick, false);

    if (this.props.appendToBody) {
      window.removeEventListener('scroll', this.handlePortalPosition, false);
      window.removeEventListener('resize', this.handlePortalPosition, false);
    }
  }

  handleDocumentClick = (evt) => {
    if (!findDOMNode(this).contains(evt.target)) {
      this.togglePicker(false);
    }
  }

  handlePortalPosition = () => {
    if (this.state.isOpen) {
      this.setState({
        pos: this.getPosition()
      });
    }
  }

  handleChange = (moment) => {
    const {onChange} = this.props;

    this.setState({
      isOpen: false
    });
    onChange && onChange(moment);
  }

  togglePicker = (isOpen) => {
    const {disabled} = this.props;
    
    if (disabled) return;

    this.setState({
      isOpen,
      pos: this.getPosition()
    });
  }

  getPosition = () => {
    const elem = this.refs.trigger;
    const elemBCR = elem.getBoundingClientRect();

    return {
      top: Math.round(elemBCR.top + elemBCR.height),
      left: Math.round(elemBCR.left)
    };
  }

  _renderPortal = () => {
    const {pos, isOpen} = this.state;
    const style = {
      display: isOpen ? 'block' : 'none',
      position: 'fixed',
      top: `${pos.top}px`,
      left: `${pos.left}px`
    };

    return (
      <Portal style={style}>
        {this._renderPicker(true)}
      </Portal>
    );
  }

  _renderPicker = (isOpen) => {
    const props = blacklist(this.props, 'className', 'appendToBody', 'children', 'onChange');  
    
    return (
      <DatetimeRangePicker 
        {...props}
        className="datetime-range-picker-popup" 
        isOpen={isOpen} 
        onChange={this.handleChange} />
    );
  }

  render() {
    const {children, appendToBody, className} = this.props;
    const {isOpen} = this.state;

    return (
      <div className={`datetime-range-trigger ${className}`}>
        <div onClick={this.togglePicker.bind(this, !isOpen)} ref="trigger">{children}</div>
        {appendToBody ? this._renderPortal() : this._renderPicker(isOpen)}
      </div>
    );
  }
}


export default RangeTrigger;
