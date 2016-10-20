import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import DatetimePicker from './Picker.jsx';
import Portal from './Portal.jsx';


class Trigger extends Component {
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

  handleChange = (moment, currentPanel) => {
    if (currentPanel === 'day' && this.props.closeOnSelectDay) {
      this.setState({
        isOpen: false
      });
    }

    this.props.onChange && this.props.onChange(moment);
  }

  togglePicker = (isOpen) => {
    this.setState({
      isOpen,
      pos: this.getPosition()
    });
  }

  getPosition() {
    const elem = this.refs.trigger;
    const elemBCR = elem.getBoundingClientRect();

    return {
      top: Math.round(elemBCR.top + elemBCR.height),
      left: Math.round(elemBCR.left)
    };
  }

  _renderPortal() {
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

  _renderPicker(isOpen) {
    const {moment, splitPanel} = this.props;

    return (
      <DatetimePicker className="datetime-picker-popup" isOpen={isOpen} moment={moment} onChange={this.handleChange} splitPanel={splitPanel}/>
    );
  }

  render() {
    const {children, appendToBody} = this.props;

    return (
      <div className="datetime-trigger">
        <div onClick={() => this.togglePicker(true)} ref="trigger">{children}</div>
        {appendToBody ? this._renderPortal() : this._renderPicker(this.state.isOpen)}
      </div>
    );
  }
}


export default Trigger;
