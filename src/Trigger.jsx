import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import DatetimePicker from './Picker.jsx';


class Trigger extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleDocumentClick = (evt) => {
    if (!findDOMNode(this).contains(evt.target)) {
      this.togglePicker(false);
    }
  }

  togglePicker = (isOpen) => {
    this.setState({
      isOpen
    });
  }

  render() {
    const {moment, onChange, children, splitPanel} = this.props;

    return (
      <div className="datetime-trigger">
        <div onClick={() => this.togglePicker(true)}>{children}</div>
        <DatetimePicker isOpen={this.state.isOpen} moment={moment} onChange={onChange} splitPanel={splitPanel}/>
      </div>
    );
  }
}


export default Trigger;
