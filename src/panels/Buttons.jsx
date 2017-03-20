import React, {Component} from 'react';


class Buttons extends Component {
  handleClick = (value) => {
    const {onChange} = this.props;

    onChange && onChange(value, 'day');
  }

  _renderButton = (key, value) => {
    return (
      <button className="btn" key={key} type="button" onClick={this.handleClick.bind(this, value)}>{key}</button>
    );
  }

  _renderButtons = () => {
    const {buttons} = this.props;

    return Object.keys(buttons).map((key) => {
      return this._renderButton(key, buttons[key]);
    });
  }

  render() {
    
    return (
      <div className="buttons-bar">
        {this._renderButtons()}
      </div>
    );
  }
}


export default Buttons;