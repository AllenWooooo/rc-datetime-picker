import {Component} from 'react';
import CSSPropertyOperations from './CSSPropertyOperations/index.js';
import ReactDOM from 'react-dom';


class Portal extends Component {
  componentDidMount() {
    this.renderPortal(this.props);
  }

  componentWillReceiveProps(props) {
    this.renderPortal(props);
  }

  componentWillUnmount() {
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }

    this.portal = null;
    this.node = null;
  }

  applyClassNameAndStyle = (props) => {
    if (props.className) {
      this.node.className = props.className;
    }

    if (props.style) {
      CSSPropertyOperations.setValueForStyles(
        this.node,
        props.style,
        this._reactInternalInstance
      );
    }
  }

  renderPortal(props) {
    if (!this.node) {
      this.node = document.createElement('div');
      this.applyClassNameAndStyle(props);

      document.body.appendChild(this.node);
    } else {
      this.applyClassNameAndStyle(props);
    }

    const {children} = props;

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node
    );
  }

  render() {
    return null;
  }
}

export default Portal;
