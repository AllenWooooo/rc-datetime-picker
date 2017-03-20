import React, {Component} from 'react';


class Shortcuts extends Component {
  handleClick = (value) => {
    const {onChange} = this.props;

    onChange && onChange(value, 'day');
  }

  _renderShortcut = (key, value) => {
    return (
      <button className="btn" key={key} type="button" onClick={this.handleClick.bind(this, value)}>{key}</button>
    );
  }

  _renderShortcuts = () => {
    const {shortcuts} = this.props;

    return Object.keys(shortcuts).map((key) => {
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