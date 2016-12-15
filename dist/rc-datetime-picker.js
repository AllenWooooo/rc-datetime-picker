/*
 * rc-datetime-picker v1.3.1
 * https://github.com/AllenWooooo/rc-datetime-picker
 *
 * (c) 2016 Allen Wu
 * License: MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('classnames/bind'), require('blacklist'), require('moment'), require('react-slider'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'classnames/bind', 'blacklist', 'moment', 'react-slider', 'react-dom'], factory) :
  (factory((global.rc-datetime-picker = global.rc-datetime-picker || {}),global.React,global.classNames,global.blacklist,global.moment,global.ReactSlider,global.ReactDOM));
}(this, (function (exports,React,classNames,blacklist,moment,ReactSlider,ReactDOM) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
classNames = 'default' in classNames ? classNames['default'] : classNames;
blacklist = 'default' in blacklist ? blacklist['default'] : blacklist;
moment = 'default' in moment ? moment['default'] : moment;
ReactSlider = 'default' in ReactSlider ? ReactSlider['default'] : ReactSlider;
var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

var WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var DAY_FORMAT = 'MMMM, YYYY';

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

      var _moment = _this.state.moment.clone();

      if (isPrevMonth) _moment.subtract(1, 'month');
      if (isNextMonth) _moment.add(1, 'month');

      _moment.date(day);

      _this.setState({
        moment: _moment,
        selected: _moment
      });
      _this.props.onSelect(_moment);
    };

    _this.state = {
      moment: props.moment ? props.moment.clone() : moment(),
      selected: props.moment ? props.moment.clone() : null
    };
    return _this;
  }

  createClass(Day, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment ? props.moment.clone() : moment(),
        selected: props.moment ? props.moment.clone() : null
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
      var isSelected = selected ? !isPrevMonth && !isNextMonth && _moment.isSame(selected, 'month') && selected.date() === day : false;
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
      var _props = this.props,
          _props$weeks = _props.weeks,
          weeks = _props$weeks === undefined ? WEEKS : _props$weeks,
          _props$dayFormat = _props.dayFormat,
          dayFormat = _props$dayFormat === undefined ? DAY_FORMAT : _props$dayFormat;


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
            _moment.format(dayFormat)
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
      var _moment = _this.state.moment.clone();

      _moment.month(month);

      _this.setState({
        moment: _moment,
        selected: _moment
      });
      _this.props.onSelect(_moment);
    };

    _this.state = {
      moment: props.moment ? props.moment.clone() : moment(),
      selected: props.moment ? props.moment.clone() : null
    };
    return _this;
  }

  createClass(Month, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment ? props.moment.clone() : moment(),
        selected: props.moment ? props.moment.clone() : null
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

      var isSelected = selected ? _moment.isSame(selected, 'year') && selected.month() === _month : false;
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
      var _props$months = this.props.months,
          months = _props$months === undefined ? MONTHS : _props$months;


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
      var _moment = _this.state.moment.clone();

      _moment.year(year);

      _this.setState({
        moment: _moment,
        selected: _moment
      });
      _this.props.onSelect(_moment);
    };

    _this.state = {
      moment: props.moment ? props.moment.clone() : moment(),
      selected: props.moment ? props.moment.clone() : null
    };
    return _this;
  }

  createClass(Year, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment ? props.moment.clone() : moment(),
        selected: props.moment ? props.moment.clone() : null
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

      var isSelected = selected ? selected.year() === year : false;
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
      var panel = _this.state.panel;
      var onChange = _this.props.onChange;

      var nextPanel = panel === 'year' ? 'month' : 'day';
      var currentPanel = panel;

      _this.changePanel(nextPanel, moment$$1);
      onChange && onChange(moment$$1, currentPanel);
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
        panel: 'day',
        moment: props.moment
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
      var panel = this.state.panel;

      var isDayPanel = panel === 'day';
      var isMonthPanel = panel === 'month';
      var isYearPanel = panel === 'year';

      return React__default.createElement(
        'div',
        { style: this.props.style },
        React__default.createElement(
          'div',
          { className: className },
          React__default.createElement(Day, _extends({}, props, {
            style: { display: isDayPanel ? 'block' : 'none' } })),
          React__default.createElement(Month, _extends({}, props, {
            style: { display: isMonthPanel ? 'block' : 'none' } })),
          React__default.createElement(Year, _extends({}, props, {
            style: { display: isYearPanel ? 'block' : 'none' } }))
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
      var onChange = _this.props.onChange;

      var _moment = _this.state.moment.clone();

      _moment[type](value);

      _this.setState({
        moment: _moment
      });
      onChange && onChange(_moment);
    };

    _this.state = {
      moment: moment ? props.moment.clone() : moment().hours(0).minutes(0)
    };
    return _this;
  }

  createClass(Time, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment ? props.moment.clone() : moment().hours(0).minutes(0)
      });
    }
  }, {
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

var Buttons = function (_Component) {
  inherits(Buttons, _Component);

  function Buttons() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Buttons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (value) {
      var onChange = _this.props.onChange;


      onChange && onChange(value);
    }, _this._renderButton = function (key, value) {
      return React__default.createElement(
        "button",
        { className: "btn", key: key, type: "button", onClick: _this.handleClick.bind(_this, value) },
        key
      );
    }, _this._renderButtons = function () {
      var buttons = _this.props.buttons;


      return Object.keys(buttons).map(function (key) {
        return _this._renderButton(key, buttons[key]);
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Buttons, [{
    key: "render",
    value: function render() {

      return React__default.createElement(
        "div",
        { className: "buttons-bar" },
        this._renderButtons()
      );
    }
  }]);
  return Buttons;
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

      var _props = this.props,
          _props$isOpen = _props.isOpen,
          isOpen = _props$isOpen === undefined ? true : _props$isOpen,
          buttons = _props.buttons,
          splitPanel = _props.splitPanel,
          _props$showTimePicker = _props.showTimePicker,
          showTimePicker = _props$showTimePicker === undefined ? true : _props$showTimePicker,
          _props$showCalendarPi = _props.showCalendarPicker,
          showCalendarPicker = _props$showCalendarPi === undefined ? true : _props$showCalendarPi;
      var panel = this.state.panel;

      var isTimePanel = panel === 'time';
      var isCalendarPanel = panel === 'calendar';
      var className = classNames('datetime-picker', this.props.className, {
        split: splitPanel
      });
      var props = blacklist(this.props, 'className', 'isOpen', 'splitPanel');

      return React__default.createElement(
        'div',
        { className: className, style: { display: isOpen ? 'block' : 'none' }, onClick: function onClick(evt) {
            return evt.stopPropagation();
          } },
        buttons ? React__default.createElement(Buttons, props) : undefined,
        splitPanel ? React__default.createElement(
          'div',
          { className: 'panel-nav' },
          React__default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.changePanel('calendar');
              }, className: isCalendarPanel ? 'active' : '' },
            React__default.createElement('i', { className: 'fa fa-calendar-o' }),
            'Date'
          ),
          React__default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.changePanel('time');
              }, className: isTimePanel ? 'active' : '' },
            React__default.createElement('i', { className: 'fa fa-clock-o' }),
            'Time'
          )
        ) : undefined,
        showCalendarPicker ? React__default.createElement(Calendar, _extends({}, props, { style: { display: isCalendarPanel || !splitPanel ? 'block' : 'none' } })) : undefined,
        showTimePicker ? React__default.createElement(Time, _extends({}, props, { style: { display: isTimePanel || !splitPanel ? 'block' : 'none' } })) : undefined
      );
    }
  }]);
  return Picker;
}(React.Component);

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

// var CSSProperty = require('./CSSProperty');

var warning$1 = require('fbjs/lib/warning');

var isUnitlessNumber$1 = CSSProperty.isUnitlessNumber;
var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber$1.hasOwnProperty(name) && isUnitlessNumber$1[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (process.env.NODE_ENV !== 'production') {
      // Allow '0' to pass through without warning. 0 is already special and
      // doesn't require units, so we don't need to warn about it.
      if (component && value !== '0') {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
          process.env.NODE_ENV !== 'production' ? warning$1(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

// var CSSProperty = require('./CSSProperty.js');
var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var camelizeStyleName = require('fbjs/lib/camelizeStyleName');
// var dangerousStyleValue = require('./dangerousStyleValue.js');
var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');
var memoizeStringOnly = require('fbjs/lib/memoizeStringOnly');
var warning = require('fbjs/lib/warning');

var processStyleName = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var hasShorthandPropertyBug = false;
var styleFloatAccessor = 'cssFloat';
if (ExecutionEnvironment.canUseDOM) {
  var tempStyle = document.createElement('div').style;
  try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = '';
  } catch (e) {
    hasShorthandPropertyBug = true;
  }
  // IE8 only supports accessing cssFloat (standard) as styleFloat
  if (document.documentElement.style.cssFloat === undefined) {
    styleFloatAccessor = 'styleFloat';
  }
}

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {

  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */
  createMarkupForStyles: function createMarkupForStyles(styles, component) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue, component) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */
  setValueForStyles: function setValueForStyles(node, styles, component) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
      if (styleName === 'float' || styleName === 'cssFloat') {
        styleName = styleFloatAccessor;
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

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
          splitPanel = _props.splitPanel,
          buttons = _props.buttons;


      return React__default.createElement(Picker, {
        className: 'datetime-picker-popup',
        buttons: buttons,
        isOpen: isOpen,
        moment: moment$$1,
        onChange: this.handleChange,
        splitPanel: splitPanel });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          appendToBody = _props2.appendToBody;

      var className = classNames('datetime-trigger', this.props.className);

      return React__default.createElement(
        'div',
        { className: className },
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

Object.defineProperty(exports, '__esModule', { value: true });

})));
