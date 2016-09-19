/*
 * rc-datetime-picker v1.0.0
 * https://github.com/AllenWooooo/rc-datetime-picker
 *
 * (c) 2016 Allen Wu
 * License: MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('classnames/bind'), require('blacklist'), require('moment'), require('react-slider'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'classnames/bind', 'blacklist', 'moment', 'react-slider', 'react-dom'], factory) :
  (factory((global.rc-datetime-picker = global.rc-datetime-picker || {}),global.React,global.classNames,global.blacklist,global.moment,global.ReactSlider,global.reactDom));
}(this, (function (exports,React,classNames,blacklist,moment,ReactSlider,reactDom) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
classNames = 'default' in classNames ? classNames['default'] : classNames;
blacklist = 'default' in blacklist ? blacklist['default'] : blacklist;
moment = 'default' in moment ? moment['default'] : moment;
ReactSlider = 'default' in ReactSlider ? ReactSlider['default'] : ReactSlider;

var WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Calendar = function (_Component) {
  _inherits$1(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck$1(this, Calendar);

    var _this = _possibleConstructorReturn$1(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.changeMonth = function (dir) {
      _this.setState({
        moment: _this.state.moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
      });
    };

    _this.selectDate = function (day, isSelected, isPrevMonth, isNextMonth) {
      if (isSelected) return;

      var m = _this.state.moment;

      if (isPrevMonth) m.subtract(1, 'month');
      if (isNextMonth) m.add(1, 'month');

      m.date(day);

      _this.setState({
        moment: m.clone(),
        selected: m.clone()
      });
      _this.props.onChange && _this.props.onChange(m);
    };

    _this.state = {
      moment: props.moment.clone(),
      selected: props.moment.clone()
    };
    return _this;
  }

  _createClass$1(Calendar, [{
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
      var isPrevMonth = week === 0 && day > 7;
      var isNextMonth = week >= 4 && day <= 14;
      var isSelected = this.state.moment.isSame(this.state.selected, 'month') && this.state.selected.date() === day;
      var className = classNames({
        'prev-month': isPrevMonth,
        'next-month': isNextMonth,
        'selected': !isPrevMonth && !isNextMonth && isSelected,
        'today': !isPrevMonth && !isNextMonth && this.state.moment.isSame(now, 'month') && now.date() === day
      });

      return React__default.createElement(
        'td',
        { key: day, className: className, onClick: function onClick() {
            return _this2.selectDate(day, isSelected, isPrevMonth, isNextMonth);
          } },
        day
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var m = this.state.moment;
      var firstDay = m.clone().date(1).day();
      var endOfThisMonth = m.clone().endOf('month').date();
      var endOfLastMonth = m.clone().subtract(1, 'month').endOf('month').date();
      var days = [].concat(range(endOfLastMonth - firstDay + 1, endOfLastMonth + 1), range(1, endOfThisMonth + 1), range(1, 42 - endOfThisMonth - firstDay + 1));
      var weeks = WEEKS;
      var className = classNames('calendar', this.props.className);

      return React__default.createElement(
        'div',
        { className: className },
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
            { className: 'current-date' },
            m.format('MMMM YYYY')
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
            chunk(days, 7).map(function (week, weekIdx) {
              return React__default.createElement(
                'tr',
                { key: weekIdx },
                week.map(function (day) {
                  return _this3._renderDay(day, weekIdx);
                })
              );
            })
          )
        )
      );
    }
  }]);

  return Calendar;
}(React.Component);

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Time = function (_Component) {
  _inherits$2(Time, _Component);

  function Time(props) {
    _classCallCheck$2(this, Time);

    var _this = _possibleConstructorReturn$2(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

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

  _createClass$2(Time, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var moment$$1 = this.state.moment;


      return React__default.createElement(
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
            } }),
          React__default.createElement(
            'span',
            { className: 'slider-text' },
            'Minutes:'
          ),
          React__default.createElement(ReactSlider, { min: 0, max: 59, value: moment$$1.minute(), onChange: function onChange(value) {
              return _this2.handleChange(value, 'minutes');
            } })
        )
      );
    }
  }]);

  return Time;
}(React.Component);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picker = function (_Component) {
  _inherits(Picker, _Component);

  function Picker() {
    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this));

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

  _createClass(Picker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = classNames('datetime-picker', {
        hide: !this.props.isOpen,
        split: this.props.splitPanel,
        'calendar-panel': this.state.panel === 'calendar',
        'time-panel': this.state.panel === 'time'
      });
      var props = blacklist(this.props, 'className', 'isOpen');

      return React__default.createElement(
        'div',
        { className: className },
        React__default.createElement(
          'div',
          { className: 'panel-nav' },
          React__default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.changePanel('calendar');
              } },
            React__default.createElement('i', { className: 'fa fa-calendar-o' }),
            'Date'
          ),
          React__default.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this2.changePanel('time');
              } },
            React__default.createElement('i', { className: 'fa fa-clock-o' }),
            'Time'
          )
        ),
        React__default.createElement(Calendar, props),
        React__default.createElement(Time, props)
      );
    }
  }]);

  return Picker;
}(React.Component);

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Trigger = function (_Component) {
  _inherits$3(Trigger, _Component);

  function Trigger() {
    _classCallCheck$3(this, Trigger);

    var _this = _possibleConstructorReturn$3(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this));

    _this.handleDocumentClick = function (evt) {
      if (!reactDom.findDOMNode(_this).contains(evt.target)) {
        _this.togglePicker(false);
      }
    };

    _this.togglePicker = function (isOpen) {
      _this.setState({
        isOpen: isOpen
      });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass$3(Trigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var moment$$1 = _props.moment;
      var onChange = _props.onChange;
      var children = _props.children;


      return React__default.createElement(
        'div',
        { className: 'datetime-trigger' },
        React__default.createElement(
          'div',
          { onClick: function onClick() {
              return _this2.togglePicker(true);
            } },
          children
        ),
        React__default.createElement(Picker, { isOpen: this.state.isOpen, moment: moment$$1, onChange: onChange })
      );
    }
  }]);

  return Trigger;
}(React.Component);

exports.DatetimePicker = Picker;
exports.DatetimePickerTrigger = Trigger;

Object.defineProperty(exports, '__esModule', { value: true });

})));
