/*
 * rc-datetime-picker v1.6.1
 * https://github.com/AllenWooooo/rc-datetime-picker
 *
 * (c) 2018 Allen Wu
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

var WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var DAY_FORMAT = 'MMMM, YYYY';
var CONFIRM_BUTTON_TEXT = 'Confirm';
var START_DATE_TEXT = 'Start Date:';
var END_DATE_TEXT = 'End Date:';
var CUSTOM_BUTTON_TEXT = 'Custom';

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

var Day = function (_Component) {
  inherits(Day, _Component);

  function Day(props) {
    classCallCheck(this, Day);

    var _this = possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

    _this.changeMonth = function (dir) {
      var _moment = _this.state.moment.clone();

      _this.setState({
        moment: _moment[dir === 'prev' ? 'subtract' : 'add'](1, 'month')
      });
    };

    _this.select = function (day, isSelected, isDisabled, isPrevMonth, isNextMonth) {
      if (isDisabled) return;
      var _this$props = _this.props,
          range$$1 = _this$props.range,
          onSelect = _this$props.onSelect;

      var _moment = _this.state.moment.clone();

      if (isPrevMonth) _moment.subtract(1, 'month');
      if (isNextMonth) _moment.add(1, 'month');

      _moment.date(day);

      _this.setState({
        moment: range$$1 ? _this.state.moment : _moment
      });
      onSelect(_moment);
    };

    _this._renderWeek = function (week) {
      return React__default.createElement(
        'th',
        { key: week },
        week
      );
    };

    _this._renderDay = function (week, day) {
      var _this$props2 = _this.props,
          maxDate = _this$props2.maxDate,
          minDate = _this$props2.minDate,
          range$$1 = _this$props2.range,
          rangeAt = _this$props2.rangeAt,
          selected = _this$props2.selected,
          dateLimit = _this$props2.dateLimit;

      var now = moment();
      var _moment = _this.state.moment;
      var isPrevMonth = week === 0 && day > 7;
      var isNextMonth = week >= 4 && day <= 14;
      var month = isNextMonth ? _moment.clone().add(1, 'month') : isPrevMonth ? _moment.clone().subtract(1, 'month') : _moment.clone();
      var currentDay = month.clone().date(day);
      var start = selected && range$$1 ? selected.start ? currentDay.isSame(selected.start, 'day') : false : false;
      var end = selected && range$$1 ? selected.end ? currentDay.isSame(selected.end, 'day') : false : false;
      var between = selected && range$$1 ? selected.start && selected.end ? currentDay.isBetween(selected.start, selected.end, 'day') : false : false;
      var isSelected = selected ? range$$1 ? rangeAt === 'start' && start || rangeAt === 'end' && end : currentDay.isSame(selected, 'day') : false;
      var disabledMax = maxDate ? currentDay.isAfter(maxDate, 'day') : false;
      var disabledMin = minDate ? currentDay.isBefore(minDate, 'day') : false;
      var disabled = false;
      var limited = false;

      if (range$$1) {
        if (rangeAt === 'start' && selected && selected.end) {
          disabled = currentDay.isAfter(selected.end, 'day');
        } else if (rangeAt === 'end' && selected && selected.start) {
          disabled = currentDay.isBefore(selected.start, 'day');
        }
      }

      if (dateLimit && range$$1) {
        var limitKey = Object.keys(dateLimit)[0];
        var limitValue = dateLimit[limitKey];
        var minLimitedDate = void 0,
            maxLimitedDate = void 0;

        if (selected) {

          if (rangeAt === 'start' && selected.end) {
            maxLimitedDate = selected.end.clone();
            minLimitedDate = maxLimitedDate.clone().subtract(limitValue, limitKey);
          } else if (rangeAt === 'end' && selected.start) {
            minLimitedDate = selected.start.clone();
            maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
          }

          if (minLimitedDate && maxLimitedDate) {
            limited = !currentDay.isBetween(minLimitedDate, maxLimitedDate, 'day', rangeAt === 'start' ? '(]' : '[)');
          }
        }
      }

      var isDisabled = disabledMax || disabledMin || disabled || limited;
      var className = classNames({
        prev: isPrevMonth,
        next: isNextMonth,
        selected: isSelected,
        now: now.isSame(currentDay, 'day'),
        disabled: isDisabled,
        start: start,
        end: end,
        between: between
      });

      return React__default.createElement(
        'td',
        {
          key: day,
          className: className,
          onClick: _this.select.bind(_this, day, isSelected, isDisabled, isPrevMonth, isNextMonth) },
        day
      );
    };

    _this.state = {
      moment: props.moment
    };
    return _this;
  }

  createClass(Day, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$weeks = _props.weeks,
          weeks = _props$weeks === undefined ? WEEKS : _props$weeks,
          _props$dayFormat = _props.dayFormat,
          dayFormat = _props$dayFormat === undefined ? DAY_FORMAT : _props$dayFormat,
          style = _props.style,
          changePanel = _props.changePanel;

      var _moment = this.state.moment;
      var firstDay = _moment.clone().date(1).day();
      var endOfThisMonth = _moment.clone().endOf('month').date();
      var endOfLastMonth = _moment.clone().subtract(1, 'month').endOf('month').date();
      var days = [].concat(range(endOfLastMonth - firstDay + 1, endOfLastMonth + 1), range(1, endOfThisMonth + 1), range(1, 42 - endOfThisMonth - firstDay + 1));

      return React__default.createElement(
        'div',
        { className: 'calendar-days', style: style },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: this.changeMonth.bind(this, 'prev') },
            React__default.createElement('i', { className: 'fa fa-angle-left' })
          ),
          React__default.createElement(
            'span',
            { className: 'current-date', onClick: changePanel.bind(this, 'month', _moment) },
            _moment.format(dayFormat)
          ),
          React__default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: this.changeMonth.bind(this, 'next') },
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
                return _this2._renderWeek(week);
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
                week.map(_this2._renderDay.bind(_this2, idx))
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
      var _moment = _this.state.moment.clone();

      _this.setState({
        moment: _moment[dir === 'prev' ? 'subtract' : 'add'](1, 'year')
      });
    };

    _this.select = function (month, isDisabled) {
      if (isDisabled) return;
      var onSelect = _this.props.onSelect;

      var _moment = _this.state.moment.clone();

      _moment.month(month);

      _this.setState({
        moment: _moment
      });
      onSelect(_moment);
    };

    _this._renderMonth = function (row, month, idx) {
      var now = moment();
      var _moment = _this.state.moment;
      var _this$props = _this.props,
          maxDate = _this$props.maxDate,
          minDate = _this$props.minDate,
          months = _this$props.months,
          selected = _this$props.selected,
          range$$1 = _this$props.range,
          rangeAt = _this$props.rangeAt,
          dateLimit = _this$props.dateLimit;

      var currentMonth = _moment.clone().month(month);
      var start = selected && range$$1 ? selected.start ? currentMonth.isSame(selected.start, 'month') : false : false;
      var end = selected && range$$1 ? selected.end ? currentMonth.isSame(selected.end, 'month') : false : false;
      var between = selected && range$$1 ? selected.start && selected.end ? currentMonth.isBetween(selected.start, selected.end, 'month') : false : false;
      var isSelected = selected ? range$$1 ? selected[rangeAt] ? currentMonth.isSame(selected[rangeAt], 'month') : false : currentMonth.isSame(selected, 'day') : false;
      var disabledMax = maxDate ? currentMonth.isAfter(maxDate, 'month') : false;
      var disabledMin = minDate ? currentMonth.isBefore(minDate, 'month') : false;
      var disabled = false;
      var limited = false;

      if (range$$1) {
        if (rangeAt === 'start' && selected && selected.end) {
          disabled = selected.end && currentMonth.isAfter(selected.end, 'day');
        } else if (rangeAt === 'end' && selected && selected.start) {
          disabled = selected.start && currentMonth.isBefore(selected.start, 'day');
        }
      }

      if (dateLimit && range$$1) {
        var limitKey = Object.keys(dateLimit)[0];
        var limitValue = dateLimit[limitKey];
        var minLimitedDate = void 0,
            maxLimitedDate = void 0;

        if (selected) {

          if (rangeAt === 'start' && selected.start && selected.end) {
            maxLimitedDate = selected.end.clone();
            minLimitedDate = maxLimitedDate.clone().subtract(limitValue, limitKey);
          } else if (rangeAt === 'end' && selected.start && selected.end) {
            minLimitedDate = selected.start.clone();
            maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
          }

          if (minLimitedDate && maxLimitedDate) {
            limited = !currentMonth.isBetween(minLimitedDate, maxLimitedDate, 'day', rangeAt === 'start' ? '(]' : '[)');
          }
        }
      }

      var isDisabled = disabledMax || disabledMin || disabled || limited;
      var className = classNames({
        selected: isSelected,
        now: now.isSame(currentMonth, 'month'),
        disabled: isDisabled,
        start: start,
        end: end,
        between: between
      });

      return React__default.createElement(
        'td',
        {
          key: month,
          className: className,
          onClick: _this.select.bind(_this, month, isDisabled) },
        months ? months[idx + row * 3] : month
      );
    };

    _this.state = {
      moment: props.moment
    };
    return _this;
  }

  createClass(Month, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _moment = this.state.moment;
      var months = MONTHS;
      var _props = this.props,
          changePanel = _props.changePanel,
          style = _props.style;


      return React__default.createElement(
        'div',
        { className: 'calendar-months', style: style },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: this.changeYear.bind(this, 'prev') },
            React__default.createElement('i', { className: 'fa fa-angle-left' })
          ),
          React__default.createElement(
            'span',
            { className: 'current-date', onClick: changePanel.bind(this, 'year', _moment) },
            _moment.format('YYYY')
          ),
          React__default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: this.changeYear.bind(this, 'next') },
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
                _months.map(_this2._renderMonth.bind(_this2, idx))
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
      var _moment = _this.state.moment.clone();

      _this.setState({
        moment: _moment[dir === 'prev' ? 'subtract' : 'add'](10, 'year')
      });
    };

    _this.select = function (year, isDisabled) {
      if (isDisabled) return;
      var _moment = _this.state.moment.clone();

      _moment.year(year);

      _this.setState({
        moment: _moment,
        selected: _moment
      });
      _this.props.onSelect(_moment);
    };

    _this._renderYear = function (year) {
      var now = moment();
      var _moment = _this.state.moment;
      var firstYear = Math.floor(_moment.year() / 10) * 10;
      var _this$props = _this.props,
          maxDate = _this$props.maxDate,
          minDate = _this$props.minDate,
          selected = _this$props.selected,
          range$$1 = _this$props.range,
          rangeAt = _this$props.rangeAt,
          dateLimit = _this$props.dateLimit;

      var currentYear = _moment.clone().year(year);
      var start = selected && range$$1 ? selected.start ? currentYear.isSame(selected.start, 'year') : false : false;
      var end = selected && range$$1 ? selected.end ? currentYear.isSame(selected.end, 'year') : false : false;
      var between = selected && range$$1 ? selected.start && selected.end ? currentYear.isBetween(selected.start, selected.end, 'year') : false : false;
      var isSelected = selected ? range$$1 ? selected[rangeAt] ? selected[rangeAt].year() === year : false : selected.year() === year : false;
      var disabledMax = maxDate ? year > maxDate.year() : false;
      var disabledMin = minDate ? year < minDate.year() : false;
      var disabled = false;
      var limited = false;

      if (range$$1) {
        if (rangeAt === 'start' && selected && selected.end) {
          disabled = selected.end && currentYear.isAfter(selected.end, 'day');
        } else if (rangeAt === 'end' && selected && selected.start) {
          disabled = selected.start && currentYear.isBefore(selected.start, 'day');
        }
      }

      if (dateLimit && range$$1) {
        var limitKey = Object.keys(dateLimit)[0];
        var limitValue = dateLimit[limitKey];
        var minLimitedDate = void 0,
            maxLimitedDate = void 0;

        if (selected) {

          if (rangeAt === 'start' && selected.start && selected.end) {
            maxLimitedDate = selected.end.clone();
            minLimitedDate = maxLimitedDate.clone().subtract(limitValue, limitKey);
          } else if (rangeAt === 'end' && selected.start && selected.end) {
            minLimitedDate = selected.start.clone();
            maxLimitedDate = minLimitedDate.clone().add(limitValue, limitKey);
          }

          if (minLimitedDate && maxLimitedDate) {
            limited = !currentYear.isBetween(minLimitedDate, maxLimitedDate, 'day', rangeAt === 'start' ? '(]' : '[)');
          }
        }
      }

      var isDisabled = disabledMax || disabledMin || disabled || limited;
      var className = classNames({
        selected: isSelected,
        now: now.year() === year,
        prev: firstYear - 1 === year,
        next: firstYear + 10 === year,
        disabled: isDisabled,
        start: start,
        end: end,
        between: between
      });

      return React__default.createElement(
        'td',
        { key: year, className: className, onClick: _this.select.bind(_this, year, isDisabled) },
        year
      );
    };

    _this.state = {
      moment: props.moment
    };
    return _this;
  }

  createClass(Year, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _moment = this.state.moment;
      var style = this.props.style;

      var firstYear = Math.floor(_moment.year() / 10) * 10;
      var years = range(firstYear - 1, firstYear + 11);

      return React__default.createElement(
        'div',
        { className: 'calendar-years', style: style },
        React__default.createElement(
          'div',
          { className: 'calendar-nav' },
          React__default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: this.changePeriod.bind(this, 'prev') },
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
            { type: 'button', className: 'next-month', onClick: this.changePeriod.bind(this, 'next') },
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
                _years.map(_this2._renderYear)
              );
            })
          )
        )
      );
    }
  }]);
  return Year;
}(React.Component);

// import moment from 'moment';
var moment$1 = require('moment');

var Calendar = function (_Component) {
  inherits(Calendar, _Component);

  function Calendar(props) {
    classCallCheck(this, Calendar);

    var _this = possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      moment: _this.getCurrentMoment(props),
      panel: props.minPanel || 'day'
    };
    return _this;
  }

  createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: this.getCurrentMoment(props)
      });

      if (!props.isOpen) {
        this.setState({
          panel: props.minPanel || 'day'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          weeks = _props.weeks,
          months = _props.months,
          dayFormat = _props.dayFormat,
          style = _props.style,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          dateLimit = _props.dateLimit,
          range = _props.range,
          rangeAt = _props.rangeAt;

      var props = {
        moment: this.state.moment,
        selected: this.props.moment,
        onSelect: this.handleSelect,
        changePanel: this.changePanel,
        weeks: weeks,
        months: months,
        dayFormat: dayFormat,
        maxDate: maxDate,
        minDate: minDate,
        dateLimit: dateLimit,
        range: range,
        rangeAt: rangeAt
      };
      var panel = this.state.panel;

      var isDayPanel = panel === 'day';
      var isMonthPanel = panel === 'month';
      var isYearPanel = panel === 'year';

      return React__default.createElement(
        'div',
        { style: style },
        React__default.createElement(
          'div',
          { className: 'calendar' },
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

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getCurrentMoment = function (props) {
    var range = props.range,
        rangeAt = props.rangeAt;

    var now = _this2.state ? _this2.state.moment || moment$1() : moment$1();
    var result = props.moment;

    if (result) {
      if (range) {
        result = result[rangeAt] || now;
      }
    } else {
      result = now;
    }

    return result;
  };

  this.handleSelect = function (selected) {
    var panel = _this2.state.panel;
    var _props2 = _this2.props,
        onChange = _props2.onChange,
        range = _props2.range,
        rangeAt = _props2.rangeAt,
        minPanel = _props2.minPanel;

    var nextPanel = (panel === 'year' ? 'month' : 'day') === 'month' ? minPanel === 'year' ? 'year' : 'month' : minPanel === 'month' ? 'month' : 'day';
    var _selected = _this2.props.moment;
    var shouldChange = panel === minPanel;

    if (_selected && !shouldChange) {
      if (range) {
        shouldChange = rangeAt === 'start' ? _selected.start : _selected.end;
      } else {
        shouldChange = true;
      }
    }

    if (range) {
      var copyed = _selected ? _extends({}, _selected) : {};

      copyed[rangeAt] = selected;
      _selected = copyed;
    } else {
      _selected = selected;
    }

    _this2.changePanel(nextPanel, selected);

    if (shouldChange) {
      onChange && onChange(_selected, panel);
    }
  };

  this.changePanel = function (panel) {
    var moment$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.state.moment;

    _this2.setState({
      moment: moment$$1,
      panel: panel
    });
  };
};

var Time = function (_Component) {
  inherits(Time, _Component);

  function Time(props) {
    classCallCheck(this, Time);

    var _this = possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

    _initialiseProps$1.call(_this);

    _this.state = {
      moment: _this.getCurrentMoment(props)
    };
    return _this;
  }

  createClass(Time, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: this.getCurrentMoment(props)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _moment = this.state.moment;
      var style = this.props.style;


      return React__default.createElement(
        'div',
        { style: style },
        React__default.createElement(
          'div',
          { className: 'time' },
          React__default.createElement(
            'div',
            { className: 'show-time' },
            React__default.createElement(
              'span',
              { className: 'text' },
              _moment.format('HH')
            ),
            React__default.createElement(
              'span',
              { className: 'separater' },
              ':'
            ),
            React__default.createElement(
              'span',
              { className: 'text' },
              _moment.format('mm')
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
            React__default.createElement(ReactSlider, { min: 0, max: 23, value: _moment.hour(), onChange: this.handleChange.bind(this, 'hours'), withBars: true }),
            React__default.createElement(
              'span',
              { className: 'slider-text' },
              'Minutes:'
            ),
            React__default.createElement(ReactSlider, { min: 0, max: 59, value: _moment.minute(), onChange: this.handleChange.bind(this, 'minutes'), withBars: true })
          )
        )
      );
    }
  }]);
  return Time;
}(React.Component);

var _initialiseProps$1 = function _initialiseProps() {
  var _this2 = this;

  this.getCurrentMoment = function (props) {
    var range = props.range,
        rangeAt = props.rangeAt;

    var result = props.moment;

    if (result) {
      if (range) {
        result = result[rangeAt] || moment().hours(0).minutes(0);
      }
    } else {
      result = moment().hours(0).minutes(0);
    }

    return result;
  };

  this.handleChange = function (type, value) {
    var _props = _this2.props,
        onChange = _props.onChange,
        range = _props.range,
        rangeAt = _props.rangeAt;

    var _moment = _this2.state.moment.clone();
    var selected = _this2.props.moment;

    _moment[type](value);

    if (range) {
      var copyed = selected ? Object.assign(selected, {}) : {};

      copyed[rangeAt] = _moment;
    } else {
      selected = _moment;
    }

    _this2.setState({
      moment: _moment
    });
    onChange && onChange(selected);
  };
};

var isSameRange = function isSameRange(current, value) {
  return current.start && current.end && current.start.isSame(value.start, 'day') && current.end.isSame(value.end, 'day');
};

var Shortcuts = function (_Component) {
  inherits(Shortcuts, _Component);

  function Shortcuts() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Shortcuts);

    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Shortcuts.__proto__ || Object.getPrototypeOf(Shortcuts)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (value, isCustom) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          range = _this$props.range;


      if (range) {
        onChange && onChange(value, isCustom);
      } else {
        onChange && onChange(value, 'day');
      }
    }, _this._renderShortcut = function (key, value) {
      var _this$props2 = _this.props,
          range = _this$props2.range,
          shortcuts = _this$props2.shortcuts,
          _this$props2$customBu = _this$props2.customButtonText,
          customButtonText = _this$props2$customBu === undefined ? CUSTOM_BUTTON_TEXT : _this$props2$customBu;

      var current = _this.props.moment;
      var selected = range ? key !== 'custom' && isSameRange(current, value) : false;
      var isCustomSelected = range ? !Object.keys(shortcuts).some(function (_key) {
        return isSameRange(current, shortcuts[_key]);
      }) && key === 'custom' : false;
      var className = classNames('btn', {
        selected: selected || isCustomSelected
      });

      return React__default.createElement(
        'button',
        {
          className: className,
          key: key,
          type: 'button',
          onClick: _this.handleClick.bind(_this, value, key === 'custom') },
        key === 'custom' ? customButtonText : key
      );
    }, _this._renderShortcuts = function () {
      var _this$props3 = _this.props,
          shortcuts = _this$props3.shortcuts,
          showCustomButton = _this$props3.showCustomButton,
          customRange = _this$props3.customRange;

      var renderShortcuts = showCustomButton ? _extends({}, shortcuts, {
        custom: customRange || {
          start: moment().subtract(29, 'days'),
          end: moment().endOf('day')
        }
      }) : shortcuts;

      return Object.keys(renderShortcuts).map(function (key) {
        return _this._renderShortcut(key, renderShortcuts[key]);
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Shortcuts, [{
    key: 'render',
    value: function render() {

      return React__default.createElement(
        'div',
        { className: 'shortcuts-bar' },
        this._renderShortcuts()
      );
    }
  }]);
  return Shortcuts;
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
      var _props = this.props,
          _props$isOpen = _props.isOpen,
          isOpen = _props$isOpen === undefined ? true : _props$isOpen,
          shortcuts = _props.shortcuts,
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
      var props = blacklist(this.props, 'className', 'splitPanel', 'isOpen');

      return React__default.createElement(
        'div',
        { className: className, style: { display: isOpen ? 'block' : 'none' }, onClick: function onClick(evt) {
            return evt.stopPropagation();
          } },
        shortcuts ? React__default.createElement(Shortcuts, props) : undefined,
        splitPanel ? React__default.createElement(
          'div',
          { className: 'panel-nav' },
          React__default.createElement(
            'button',
            { type: 'button', onClick: this.changePanel.bind(this, 'calendar'), className: isCalendarPanel ? 'active' : '' },
            React__default.createElement('i', { className: 'fa fa-calendar-o' }),
            'Date'
          ),
          React__default.createElement(
            'button',
            { type: 'button', onClick: this.changePanel.bind(this, 'time'), className: isTimePanel ? 'active' : '' },
            React__default.createElement('i', { className: 'fa fa-clock-o' }),
            'Time'
          )
        ) : undefined,
        showCalendarPicker ? React__default.createElement(Calendar, _extends({}, props, { isOpen: isOpen, style: { display: isCalendarPanel || !splitPanel ? 'block' : 'none' } })) : undefined,
        showTimePicker ? React__default.createElement(Time, _extends({}, props, { style: { display: isTimePanel || !splitPanel ? 'block' : 'none' } })) : undefined
      );
    }
  }]);
  return Picker;
}(React.Component);

var Range = function (_Component) {
  inherits(Range, _Component);

  function Range(props) {
    classCallCheck(this, Range);

    var _this = possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, props));

    _this.handleChange = function (moment$$1) {
      _this.setState({
        moment: moment$$1
      });
    };

    _this.handleShortcutChange = function (moment$$1, isCustom) {
      var onChange = _this.props.onChange;


      if (isCustom) {
        _this.setState({
          moment: moment$$1
        });
      } else {
        onChange && onChange(moment$$1);
      }
    };

    _this.onConfirm = function () {
      var moment$$1 = _this.state.moment;
      var onChange = _this.props.onChange;


      onChange && onChange(moment$$1);
    };

    _this.state = {
      moment: props.moment
    };
    return _this;
  }

  createClass(Range, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        moment: props.moment
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var moment$$1 = this.state.moment;
      var _props = this.props,
          format = _props.format,
          _props$showTimePicker = _props.showTimePicker,
          showTimePicker = _props$showTimePicker === undefined ? false : _props$showTimePicker,
          _props$isOpen = _props.isOpen,
          isOpen = _props$isOpen === undefined ? true : _props$isOpen,
          shortcuts = _props.shortcuts,
          _props$confirmButtonT = _props.confirmButtonText,
          confirmButtonText = _props$confirmButtonT === undefined ? CONFIRM_BUTTON_TEXT : _props$confirmButtonT,
          _props$startDateText = _props.startDateText,
          startDateText = _props$startDateText === undefined ? START_DATE_TEXT : _props$startDateText,
          _props$endDateText = _props.endDateText,
          endDateText = _props$endDateText === undefined ? END_DATE_TEXT : _props$endDateText;

      var formatStyle = format || (showTimePicker ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD');
      var className = classNames('datetime-range-picker', this.props.className);
      var props = blacklist(this.props, 'className', 'isOpen', 'format', 'moment', 'showTimePicker', 'shortcuts', 'onChange');

      return React__default.createElement(
        'div',
        { className: className, style: { display: isOpen ? 'block' : 'none' } },
        React__default.createElement(
          'div',
          { className: 'tools-bar' },
          shortcuts ? React__default.createElement(Shortcuts, _extends({}, props, { moment: moment$$1 || {}, range: true, shortcuts: shortcuts, onChange: this.handleShortcutChange })) : undefined,
          React__default.createElement(
            'div',
            { className: 'buttons' },
            React__default.createElement(
              'button',
              { type: 'button', className: 'btn', onClick: this.onConfirm },
              confirmButtonText
            )
          )
        ),
        React__default.createElement(
          'div',
          { className: 'datetime-range-picker-panel' },
          React__default.createElement(
            'table',
            null,
            React__default.createElement(
              'tbody',
              null,
              React__default.createElement(
                'tr',
                null,
                React__default.createElement(
                  'td',
                  { className: 'datetime-text' },
                  React__default.createElement(
                    'span',
                    { className: 'text-label' },
                    startDateText
                  ),
                  React__default.createElement(
                    'span',
                    { className: 'text-value' },
                    moment$$1 && moment$$1.start ? moment$$1.start.format(formatStyle) : undefined
                  )
                ),
                React__default.createElement(
                  'td',
                  { className: 'datetime-text' },
                  React__default.createElement(
                    'span',
                    { className: 'text-label' },
                    endDateText
                  ),
                  React__default.createElement(
                    'span',
                    { className: 'text-value' },
                    moment$$1 && moment$$1.end ? moment$$1.end.format(formatStyle) : undefined
                  )
                )
              ),
              React__default.createElement(
                'tr',
                null,
                React__default.createElement(
                  'td',
                  null,
                  React__default.createElement(Picker, _extends({}, props, {
                    isOpen: isOpen,
                    className: 'range-start-picker',
                    showTimePicker: showTimePicker,
                    moment: moment$$1,
                    range: true,
                    rangeAt: 'start',
                    onChange: this.handleChange
                  }))
                ),
                React__default.createElement(
                  'td',
                  null,
                  React__default.createElement(Picker, _extends({}, props, {
                    isOpen: isOpen,
                    className: 'range-end-picker',
                    showTimePicker: showTimePicker,
                    moment: moment$$1,
                    range: true,
                    rangeAt: 'end',
                    onChange: this.handleChange
                  }))
                )
              )
            )
          )
        )
      );
    }
  }]);
  return Range;
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

var warning = require('fbjs/lib/warning');

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
          process.env.NODE_ENV !== 'production' ? warning(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
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
var warning$1 = require('fbjs/lib/warning');

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

var Portal = function (_Component) {
  inherits(Portal, _Component);

  function Portal() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Portal.__proto__ || Object.getPrototypeOf(Portal)).call.apply(_ref, [this].concat(args))), _this), _this.applyClassNameAndStyle = function (props) {
      if (props.className) {
        _this.node.className = props.className;
      }

      if (props.style) {
        CSSPropertyOperations.setValueForStyles(_this.node, props.style, _this._reactInternalInstance);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
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
}(React.Component);

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
      var _this$props = _this.props,
          closeOnSelectDay = _this$props.closeOnSelectDay,
          onChange = _this$props.onChange;


      if (currentPanel === 'day' && closeOnSelectDay) {
        _this.setState({
          isOpen: false
        });
      }

      onChange && onChange(moment$$1);
    };

    _this.togglePicker = function (isOpen) {
      var disabled = _this.props.disabled;


      if (disabled) return;

      _this.setState({
        isOpen: isOpen,
        pos: _this.getPosition()
      });
    };

    _this.getPosition = function () {
      var elem = _this.refs.trigger;
      var elemBCR = elem.getBoundingClientRect();

      return {
        top: Math.round(elemBCR.top + elemBCR.height),
        left: Math.round(elemBCR.left)
      };
    };

    _this._renderPortal = function () {
      var _this$state = _this.state,
          pos = _this$state.pos,
          isOpen = _this$state.isOpen;

      var style = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: pos.top + 'px',
        left: pos.left + 'px'
      };

      return React__default.createElement(
        Portal,
        { style: style },
        _this._renderPicker(true)
      );
    };

    _this._renderPicker = function (isOpen) {
      var props = blacklist(_this.props, 'className', 'appendToBody', 'children', 'onChange');

      return React__default.createElement(Picker, _extends({}, props, {
        className: 'datetime-picker-popup',
        isOpen: isOpen,
        onChange: _this.handleChange }));
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          appendToBody = _props.appendToBody,
          className = _props.className;
      var isOpen = this.state.isOpen;


      return React__default.createElement(
        'div',
        { className: 'datetime-trigger ' + className },
        React__default.createElement(
          'div',
          { onClick: this.togglePicker.bind(this, !isOpen), ref: 'trigger' },
          children
        ),
        appendToBody ? this._renderPortal() : this._renderPicker(isOpen)
      );
    }
  }]);
  return Trigger;
}(React.Component);

var RangeTrigger = function (_Component) {
  inherits(RangeTrigger, _Component);

  function RangeTrigger() {
    classCallCheck(this, RangeTrigger);

    var _this = possibleConstructorReturn(this, (RangeTrigger.__proto__ || Object.getPrototypeOf(RangeTrigger)).call(this));

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

    _this.handleChange = function (moment$$1) {
      var onChange = _this.props.onChange;


      _this.setState({
        isOpen: false
      });
      onChange && onChange(moment$$1);
    };

    _this.togglePicker = function (isOpen) {
      var disabled = _this.props.disabled;


      if (disabled) return;

      _this.setState({
        isOpen: isOpen,
        pos: _this.getPosition()
      });
    };

    _this.getPosition = function () {
      var elem = _this.refs.trigger;
      var elemBCR = elem.getBoundingClientRect();

      return {
        top: Math.round(elemBCR.top + elemBCR.height),
        left: Math.round(elemBCR.left)
      };
    };

    _this._renderPortal = function () {
      var _this$state = _this.state,
          pos = _this$state.pos,
          isOpen = _this$state.isOpen;

      var style = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: pos.top + 'px',
        left: pos.left + 'px'
      };

      return React__default.createElement(
        Portal,
        { style: style },
        _this._renderPicker(true)
      );
    };

    _this._renderPicker = function (isOpen) {
      var props = blacklist(_this.props, 'className', 'appendToBody', 'children', 'onChange');

      return React__default.createElement(Range, _extends({}, props, {
        className: 'datetime-range-picker-popup',
        isOpen: isOpen,
        onChange: _this.handleChange }));
    };

    _this.state = {
      isOpen: false,
      pos: {}
    };
    return _this;
  }

  createClass(RangeTrigger, [{
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          appendToBody = _props.appendToBody,
          className = _props.className;
      var isOpen = this.state.isOpen;


      return React__default.createElement(
        'div',
        { className: 'datetime-range-trigger ' + className },
        React__default.createElement(
          'div',
          { onClick: this.togglePicker.bind(this, !isOpen), ref: 'trigger' },
          children
        ),
        appendToBody ? this._renderPortal() : this._renderPicker(isOpen)
      );
    }
  }]);
  return RangeTrigger;
}(React.Component);

exports.DatetimePicker = Picker;
exports.DatetimeRangePicker = Range;
exports.DatetimePickerTrigger = Trigger;
exports.DatetimeRangePickerTrigger = RangeTrigger;
