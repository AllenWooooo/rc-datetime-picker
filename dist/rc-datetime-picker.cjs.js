/*
 * rc-datetime-picker v1.2.0
 * https://github.com/AllenWooooo/rc-datetime-picker
 *
 * (c) 2016 Allen Wu
 * License: MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var classNames = _interopDefault(require('classnames/bind'));
var blacklist = _interopDefault(require('blacklist'));
var moment = _interopDefault(require('moment'));
var ReactSlider = _interopDefault(require('react-slider'));
var ReactDOM = require('react-dom');
var ReactDOM__default = _interopDefault(ReactDOM);
var CSSPropertyOperations = _interopDefault(require('react-dom/lib/CSSPropertyOperations'));

var WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var range = function range(start, end) {
  var length = Math.max(end - start, 0);
  var result = [];

  while (length--) {
    result[length] = start + length;
  }

  return result;
};

var chunk = function chunk(array, size) {
  var length = array.length;
  var index = 0;
  var resIndex = -1;
  var result = [];

  while (index < length) {
    result[++resIndex] = array.slice(index, index += size);
  }

  return result;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Day = function (_Component) {
  inherits(Day, _Component);

  function Day(props) {
    classCallCheck(this, Day);

    var _this = possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

    _this.changeMonth = function (dir) {
      _this.setState({
        moment: _this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
      });
    };

    _this.select = function (day, isSelected, isPrevMonth, isNextMonth) {
      if (isSelected) return;

      var _moment = _this.state.moment;

      if (isPrevMonth) _moment.subtract(1, 'month');
      if (isNextMonth) _moment.add(1, 'month');

      _moment.date(day);

      _this.setState({
        moment: _moment.clone(),
        selected: _moment.clone()
      });
      _this.props.onSelect(_moment);
    };

    _this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
    return _this;
  }

  createClass(Day, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment.clone(),
        selected: props.moment.clone()
      });
    }
  }, {
    key: '_renderWeek',
    value: function _renderWeek(week) {
      return React__default.createElement(
        'th',
        { key: week },
        week
      );
    }
  }, {
    key: '_renderDay',
    value: function _renderDay(day, week) {
      var _this2 = this;

      var now = moment();
      var _moment = this.state.moment;
      var selected = this.state.selected;

      var isPrevMonth = week === 0 && day > 7;
      var isNextMonth = week >= 4 && day <= 14;
      var isSelected = !isPrevMonth && !isNextMonth && _moment.isSame(selected, 'month') && selected.date() === day;
      var className = classNames({
        'prev': isPrevMonth,
        'next': isNextMonth,
        'selected': isSelected,
        'now': !isPrevMonth && !isNextMonth && _moment.isSame(now, 'month') && now.date() === day
      });

      return React__default.createElement(
        'td',
        { key: day, className: className, onClick: function onClick() {
            return _this2.select(day, isSelected, isPrevMonth, isNextMonth);
          } },
        day
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _moment = this.state.moment;
      var firstDay = _moment.clone().date(1).day();
      var endOfThisMonth = _moment.clone().endOf('month').date();
      var endOfLastMonth = _moment.clone().subtract(1, 'month').endOf('month').date();
      var days = [].concat(range(endOfLastMonth - firstDay + 1, endOfLastMonth + 1), range(1, endOfThisMonth + 1), range(1, 42 - endOfThisMonth - firstDay + 1));
      var weeks = WEEKS;

      return React__default.createElement(
        'div',
        { className: 'calendar-days', style: this.props.style },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: function onClick() {
                return _this3.changeMonth('prev');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-left' })
          ),
          React__default.createElement(
            'span',
            { className: 'current-date', onClick: function onClick() {
                return _this3.props.changePanel('month', _moment);
              } },
            _moment.format('MMMM, YYYY')
          ),
          React__default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: function onClick() {
                return _this3.changeMonth('next');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-right' })
          )
        ),
        React__default.createElement(
          'table',
          null,
          React__default.createElement(
            'thead',
            null,
            React__default.createElement(
              'tr',
              null,
              weeks.map(function (week) {
                return _this3._renderWeek(week);
              })
            )
          ),
          React__default.createElement(
            'tbody',
            null,
            chunk(days, 7).map(function (week, idx) {
              return React__default.createElement(
                'tr',
                { key: idx },
                week.map(function (day) {
                  return _this3._renderDay(day, idx);
                })
              );
            })
          )
        )
      );
    }
  }]);
  return Day;
}(React.Component);

var Month = function (_Component) {
  inherits(Month, _Component);

  function Month(props) {
    classCallCheck(this, Month);

    var _this = possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this, props));

    _this.changeYear = function (dir) {
      _this.setState({
        moment: _this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'year')
      });
    };

    _this.select = function (month) {
      var _moment = _this.state.moment;

      _moment.month(month);

      _this.setState({
        moment: _moment.clone(),
        selected: _moment.clone()
      });
      _this.props.onSelect(_moment);
    };

    _this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
    return _this;
  }

  createClass(Month, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment.clone(),
        selected: props.moment.clone()
      });
    }
  }, {
    key: '_renderMonth',
    value: function _renderMonth(month) {
      var _this2 = this;

      var now = moment();
      var _month = moment().month(month).month();
      var _moment = this.state.moment;
      var selected = this.state.selected;

      var isSelected = _moment.isSame(selected, 'year') && selected.month() === _month;
      var className = classNames({
        'selected': isSelected,
        'now': _moment.isSame(now, 'year') && now.month() === _month
      });

      return React__default.createElement(
        'td',
        { key: month, className: className, onClick: function onClick() {
            return _this2.select(_month);
          } },
        month
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _moment = this.state.moment;
      var months = MONTHS;

      return React__default.createElement(
        'div',
        { className: 'calendar-months', style: this.props.style },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: function onClick() {
                return _this3.changeYear('prev');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-left' })
          ),
          React__default.createElement(
            'span',
            { className: 'current-date', onClick: function onClick() {
                return _this3.props.changePanel('year', _moment);
              } },
            _moment.format('YYYY')
          ),
          React__default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: function onClick() {
                return _this3.changeYear('next');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-right' })
          )
        ),
        React__default.createElement(
          'table',
          null,
          React__default.createElement(
            'tbody',
            null,
            chunk(months, 3).map(function (_months, idx) {
              return React__default.createElement(
                'tr',
                { key: idx },
                _months.map(function (month) {
                  return _this3._renderMonth(month);
                })
              );
            })
          )
        )
      );
    }
  }]);
  return Month;
}(React.Component);

var Year = function (_Component) {
  inherits(Year, _Component);

  function Year(props) {
    classCallCheck(this, Year);

    var _this = possibleConstructorReturn(this, (Year.__proto__ || Object.getPrototypeOf(Year)).call(this, props));

    _this.changePeriod = function (dir) {
      _this.setState({
        moment: _this.state.moment[dir === 'prev' ? 'subtract' : 'add'](10, 'year')
      });
    };

    _this.select = function (year) {
      var _moment = _this.state.moment;

      _moment.year(year);

      _this.setState({
        moment: _moment.clone(),
        selected: _moment.clone()
      });
      _this.props.onSelect(_moment);
    };

    _this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
    return _this;
  }

  createClass(Year, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment.clone(),
        selected: props.moment.clone()
      });
    }
  }, {
    key: '_renderYear',
    value: function _renderYear(year) {
      var _this2 = this;

      var now = moment();
      var _moment = this.state.moment;
      var firstYear = Math.floor(_moment.year() / 10) * 10;
      var selected = this.state.selected;

      var isSelected = selected.year() === year;
      var className = classNames({
        'selected': isSelected,
        'now': now.year() === year,
        'prev': firstYear - 1 === year,
        'next': firstYear + 10 === year
      });

      return React__default.createElement(
        'td',
        { key: year, className: className, onClick: function onClick() {
            return _this2.select(year);
          } },
        year
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _moment = this.state.moment;
      var firstYear = Math.floor(_moment.year() / 10) * 10;
      var years = range(firstYear - 1, firstYear + 11);

      return React__default.createElement(
        'div',
        { className: 'calendar-years', style: this.props.style },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: function onClick() {
                return _this3.changePeriod('prev');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-left' })
          ),
          React__default.createElement(
            'span',
            { className: 'current-date disabled' },
            firstYear,
            ' - ',
            firstYear + 9
          ),
          React__default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: function onClick() {
                return _this3.changePeriod('next');
              } },
            React__default.createElement('i', { className: 'fa fa-angle-right' })
          )
        ),
        React__default.createElement(
          'table',
          null,
          React__default.createElement(
            'tbody',
            null,
            chunk(years, 4).map(function (_years, idx) {
              return React__default.createElement(
                'tr',
                { key: idx },
                _years.map(function (year) {
                  return _this3._renderYear(year);
                })
              );
            })
          )
        )
      );
    }
  }]);
  return Year;
}(React.Component);

var Calendar = function (_Component) {
  inherits(Calendar, _Component);

  function Calendar(props) {
    classCallCheck(this, Calendar);

    var _this = possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.handleSelect = function (moment$$1) {
      var nextPanel = _this.state.panel === 'year' ? 'month' : 'day';
      var currentPanel = _this.state.panel;

      _this.changePanel(nextPanel, moment$$1);
      _this.props.onChange && _this.props.onChange(moment$$1, currentPanel);
    };

    _this.changePanel = function (panel) {
      var moment$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.moment;

      _this.setState({
        moment: moment$$1,
        panel: panel
      });
    };

    _this.state = {
      moment: props.moment.clone(),
      panel: 'day'
    };
    return _this;
  }

  createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        panel: 'day'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = classNames('calendar', this.props.className);
      var props = {
        moment: this.state.moment,
        onSelect: this.handleSelect,
        changePanel: this.changePanel
      };

      return React__default.createElement(
        'div',
        { style: this.props.style },
        React__default.createElement(
          'div',
          { className: className },
          React__default.createElement(Day, _extends({}, props, {
            style: { display: this.state.panel === 'day' ? 'block' : 'none' } })),
          React__default.createElement(Month, _extends({}, props, {
            style: { display: this.state.panel === 'month' ? 'block' : 'none' } })),
          React__default.createElement(Year, _extends({}, props, {
            style: { display: this.state.panel === 'year' ? 'block' : 'none' } }))
        )
      );
    }
  }]);
  return Calendar;
}(React.Component);

var Time = function (_Component) {
  inherits(Time, _Component);

  function Time(props) {
    classCallCheck(this, Time);

    var _this = possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

    _this.handleChange = function (value, type) {
      var moment$$1 = _this.props.moment;


      moment$$1[type](value);

      _this.setState({
        moment: moment$$1
      });
      _this.props.onChange && _this.props.onChange(moment$$1);
    };

    _this.state = {
      moment: props.moment
    };
    return _this;
  }

  createClass(Time, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var moment$$1 = this.state.moment;


      return React__default.createElement(
        'div',
        { style: this.props.style },
        React__default.createElement(
          'div',
          { className: 'time' },
          React__default.createElement(
            'div',
            { className: 'show-time' },
            React__default.createElement(
              'span',
              { className: 'text' },
              moment$$1.format('HH')
            ),
            React__default.createElement(
              'span',
              { className: 'separater' },
              ':'
            ),
            React__default.createElement(
              'span',
              { className: 'text' },
              moment$$1.format('mm')
            )
          ),
          React__default.createElement(
            'div',
            { className: 'sliders' },
            React__default.createElement(
              'span',
              { className: 'slider-text' },
              'Hours:'
            ),
            React__default.createElement(ReactSlider, { min: 0, max: 23, value: moment$$1.hour(), onChange: function onChange(value) {
                return _this2.handleChange(value, 'hours');
              }, withBars: true }),
            React__default.createElement(
              'span',
              { className: 'slider-text' },
              'Minutes:'
            ),
            React__default.createElement(ReactSlider, { min: 0, max: 59, value: moment$$1.minute(), onChange: function onChange(value) {
                return _this2.handleChange(value, 'minutes');
              }, withBars: true })
          )
        )
      );
    }
  }]);
  return Time;
}(React.Component);

var Picker = function (_Component) {
  inherits(Picker, _Component);

  function Picker() {
    classCallCheck(this, Picker);

    var _this = possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this));

    _this.changePanel = function (panel) {
      _this.setState({
        panel: panel
      });
    };

    _this.state = {
      panel: 'calendar'
    };
    return _this;
  }

  createClass(Picker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = classNames('datetime-picker', this.props.className, {
        split: this.props.splitPanel
      });
      var props = blacklist(this.props, 'className', 'isOpen', 'splitPanel');
      var _props$isOpen = this.props.isOpen,
          isOpen = _props$isOpen === undefined ? true : _props$isOpen;


      return React__default.createElement(
        'div',
        { className: className, style: { display: isOpen ? 'block' : 'none' }, onClick: function onClick(evt) {
            return evt.stopPropagation();
          } },
        React__default.createElement(
          'div',
          { className: 'panel-nav', style: { display: this.props.splitPanel ? 'block' : 'none' } },
          React__default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.changePanel('calendar');
              }, className: this.state.panel === 'calendar' ? 'active' : '' },
            React__default.createElement('i', { className: 'fa fa-calendar-o' }),
            'Date'
          ),
          React__default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.changePanel('time');
              }, className: this.state.panel === 'time' ? 'active' : '' },
            React__default.createElement('i', { className: 'fa fa-clock-o' }),
            'Time'
          )
        ),
        React__default.createElement(Calendar, _extends({}, props, { style: { display: this.state.panel === 'calendar' || !this.props.splitPanel ? 'block' : 'none' } })),
        React__default.createElement(Time, _extends({}, props, { style: { display: this.state.panel === 'time' || !this.props.splitPanel ? 'block' : 'none' } }))
      );
    }
  }]);
  return Picker;
}(React.Component);

var Portal = function (_React$Component) {
  inherits(Portal, _React$Component);

  function Portal() {
    classCallCheck(this, Portal);
    return possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderPortal(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.renderPortal(props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.node) {
        ReactDOM__default.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }

      this.portal = null;
      this.node = null;
    }
  }, {
    key: 'applyClassNameAndStyle',
    value: function applyClassNameAndStyle(props) {
      if (props.className) {
        this.node.className = props.className;
      }

      if (props.style) {
        CSSPropertyOperations.setValueForStyles(this.node, props.style, this._reactInternalInstance);
      }
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      if (!this.node) {
        this.node = document.createElement('div');
        this.applyClassNameAndStyle(props);

        document.body.appendChild(this.node);
      } else {
        this.applyClassNameAndStyle(props);
      }

      var children = props.children;


      this.portal = ReactDOM__default.unstable_renderSubtreeIntoContainer(this, children, this.node);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Portal;
}(React__default.Component);

var Trigger = function (_Component) {
  inherits(Trigger, _Component);

  function Trigger() {
    classCallCheck(this, Trigger);

    var _this = possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this));

    _this.handleDocumentClick = function (evt) {
      if (!ReactDOM.findDOMNode(_this).contains(evt.target)) {
        _this.togglePicker(false);
      }
    };

    _this.handlePortalPosition = function () {
      if (_this.state.isOpen) {
        _this.setState({
          pos: _this.getPosition()
        });
      }
    };

    _this.handleChange = function (moment$$1, currentPanel) {
      if (currentPanel === 'day' && _this.props.closeOnSelectDay) {
        _this.setState({
          isOpen: false
        });
      }

      _this.props.onChange && _this.props.onChange(moment$$1);
    };

    _this.togglePicker = function (isOpen) {
      _this.setState({
        isOpen: isOpen,
        pos: _this.getPosition()
      });
    };

    _this.state = {
      isOpen: false,
      pos: {}
    };
    return _this;
  }

  createClass(Trigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('click', this.handleDocumentClick, false);

      if (this.props.appendToBody) {
        window.addEventListener('scroll', this.handlePortalPosition, false);
        window.addEventListener('resize', this.handlePortalPosition, false);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.handleDocumentClick, false);

      if (this.props.appendToBody) {
        window.removeEventListener('scroll', this.handlePortalPosition, false);
        window.removeEventListener('resize', this.handlePortalPosition, false);
      }
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      var elem = this.refs.trigger;
      var elemBCR = elem.getBoundingClientRect();

      return {
        top: Math.round(elemBCR.top + elemBCR.height),
        left: Math.round(elemBCR.left)
      };
    }
  }, {
    key: '_renderPortal',
    value: function _renderPortal() {
      var _state = this.state,
          pos = _state.pos,
          isOpen = _state.isOpen;

      var style = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: pos.top + 'px',
        left: pos.left + 'px'
      };

      return React__default.createElement(
        Portal,
        { style: style },
        this._renderPicker(true)
      );
    }
  }, {
    key: '_renderPicker',
    value: function _renderPicker(isOpen) {
      var _props = this.props,
          moment$$1 = _props.moment,
          splitPanel = _props.splitPanel;


      return React__default.createElement(Picker, { className: 'datetime-picker-popup', isOpen: isOpen, moment: moment$$1, onChange: this.handleChange, splitPanel: splitPanel });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          appendToBody = _props2.appendToBody;


      return React__default.createElement(
        'div',
        { className: 'datetime-trigger' },
        React__default.createElement(
          'div',
          { onClick: function onClick() {
              return _this2.togglePicker(true);
            }, ref: 'trigger' },
          children
        ),
        appendToBody ? this._renderPortal() : this._renderPicker(this.state.isOpen)
      );
    }
  }]);
  return Trigger;
}(React.Component);

exports.DatetimePicker = Picker;
exports.DatetimePickerTrigger = Trigger;
