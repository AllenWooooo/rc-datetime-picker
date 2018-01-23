# Rc-Datetime-Picker

Rc-Datetime-Picker is a react component for datetime picker by [Moment.js].

## Requirements

- React
- [Moment.js]
- Modern browsers (IE>=9 is required)

## Installation

### Install with NPM

```
$ npm install rc-datetime-picker
```

### Manual download

Besides npm package, UMD module is placed under `dist/` directory:

- dist/rc-datetime-picker.js
- dist/rc-datetime-picker.min.js

## Usage

See the [demo] page.


[Moment.js]: http://momentjs.com/
[demo]: https://allenwooooo.github.io/rc-datetime-picker/

## Props

### DatetimePicker Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>moment</td>
      <td>moment</td>
      <td></td>
      <td>Set the selected date.</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>Function(datetime: moment)</td>
      <td></td>
      <td>`onChange` will be triggered while datetime changing.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td></td>
      <td>Additional css class of root dom node.</td>
    </tr>
    <tr>
      <td>isOpen</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the picker.</td>
    </tr>
    <tr>
      <td>showCalendarPicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the calendar picker.</td>
    </tr>
    <tr>
      <td>showTimePicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the time picker.</td>
    </tr>
    <tr>
      <td>splitPanel</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Enable `split-panel` mode.</td>
    </tr>
    <tr>
      <td>shortcuts</td>
      <td>Object:{name: value}</td>
      <td></td>
      <td>Add shortcuts on the top `shortcuts-bar` for selecting a date.</td>
    </tr>
    <tr>
      <td>maxDate</td>
      <td>moment</td>
      <td></td>
      <td>Max Date limit.</td>
    </tr>
    <tr>
      <td>minDate</td>
      <td>moment</td>
      <td></td>
      <td>Min Date limit.</td>
    </tr>
    <tr>
      <td>weeks</td>
      <td>Array</td>
      <td>['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']</td>
      <td>Text for weekdays.</td>
    </tr>
    <tr>
      <td>months</td>
      <td>Array</td>
      <td>[Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']</td>
      <td>Text for months.</td>
    </tr>
    <tr>
      <td>dayFormat</td>
      <td>String</td>
      <td>'MMMM, YYYY'</td>
      <td>Formatting current date of the day panel.</td>
    </tr>
    <tr>
      <td>minPanel</td>
      <td>String</td>
      <td>'day'</td>
      <td>Min panel for select.</td>
    </tr>
  </tbody>
</table>

### DatetimePickerTrigger Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>moment</td>
      <td>moment</td>
      <td></td>
      <td>Set the selected date.</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>Function(datetime: moment)</td>
      <td></td>
      <td>`onChange` will be triggered while datetime changing.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td></td>
      <td>Additional css class of root dom node.</td>
    </tr>
    <tr>
      <td>showCalendarPicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the calendar picker.</td>
    </tr>
    <tr>
      <td>showTimePicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the time picker.</td>
    </tr>
    <tr>
      <td>splitPanel</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Enable `split-panel` mode.</td>
    </tr>
    <tr>
      <td>shortcuts</td>
      <td>Object:{name: value}</td>
      <td></td>
      <td>Add shortcuts on the top `shortcuts-bar` for selecting a date.</td>
    </tr>
    <tr>
      <td>maxDate</td>
      <td>moment</td>
      <td></td>
      <td>Max Date limit.</td>
    </tr>
    <tr>
      <td>minDate</td>
      <td>moment</td>
      <td></td>
      <td>Min Date limit.</td>
    </tr>
    <tr>
      <td>weeks</td>
      <td>Array</td>
      <td>['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']</td>
      <td>Text for weekdays.</td>
    </tr>
    <tr>
      <td>months</td>
      <td>Array</td>
      <td>[Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']</td>
      <td>Text for months.</td>
    </tr>
    <tr>
      <td>dayFormat</td>
      <td>String</td>
      <td>'MMMM, YYYY'</td>
      <td>Formatting current date of the day panel.</td>
    </tr>
    <tr>
      <td>appendToBody</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to render the picker to `body`.</td>
    </tr>
    <tr>
      <td>closeOnSelectDay</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to close the picker when selecting a date on day panel.</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Disabled triggering.</td>
    </tr>
    <tr>
      <td>minPanel</td>
      <td>String</td>
      <td>'day'</td>
      <td>Min panel for select.</td>
    </tr>
  </tbody>
</table>

### DatetimeRangePicker Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>moment</td>
      <td>Object: {start: moment, end: moment}</td>
      <td></td>
      <td>Set the selected date range.</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>Function(datetime: {start: moment, end: moment})</td>
      <td></td>
      <td>`onChange` will be triggered while confirm button or shortcuts clicked.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td></td>
      <td>Additional css class of root dom node.</td>
    </tr>
    <tr>
      <td>showCalendarPicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the calendar picker.</td>
    </tr>
    <tr>
      <td>showTimePicker</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to show the time picker.</td>
    </tr>
    <tr>
      <td>splitPanel</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Enable `split-panel` mode.</td>
    </tr>
    <tr>
      <td>shortcuts</td>
      <td>Object:{name: {start: moment, end: moment}}</td>
      <td></td>
      <td>Add shortcuts on the top `shortcuts-bar` for selecting a date range.</td>
    </tr>
    <tr>
      <td>maxDate</td>
      <td>moment</td>
      <td></td>
      <td>Max Date limit.</td>
    </tr>
    <tr>
      <td>minDate</td>
      <td>moment</td>
      <td></td>
      <td>Min Date limit.</td>
    </tr>
    <tr>
      <td>weeks</td>
      <td>Array</td>
      <td>['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']</td>
      <td>Text for weekdays.</td>
    </tr>
    <tr>
      <td>months</td>
      <td>Array</td>
      <td>[Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']</td>
      <td>Text for months.</td>
    </tr>
    <tr>
      <td>dayFormat</td>
      <td>String</td>
      <td>'MMMM, YYYY'</td>
      <td>Formatting current date of the day panel.</td>
    </tr>
    <tr>
      <td>format</td>
      <td>String</td>
      <td>'YYYY/MM/DD HH:mm' / 'YYYY/MM/DD'</td>
      <td>Formatting current date of each panel.</td>
    </tr>
    <tr>
      <td>showCustomButton</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to show the custom button.</td>
    </tr>
    <tr>
      <td>customButtonText</td>
      <td>String</td>
      <td>Custom</td>
      <td>Text for custom button.</td>
    </tr>
    <tr>
      <td>customRange</td>
      <td>Object: {start: moment, end: moment}</td>
      <td>Last 30 days</td>
      <td>Set the custom button value.</td>
    </tr>
    <tr>
      <td>confirmButtonText</td>
      <td>String</td>
      <td>Confirm</td>
      <td>Text for confirm button.</td>
    </tr>
    <tr>
      <td>startDateText</td>
      <td>String</td>
      <td>Start Date:</td>
      <td>Text for start date label.</td>
    </tr>
    <tr>
      <td>endDateText</td>
      <td>String</td>
      <td>End date:</td>
      <td>Text for end date label.</td>
    </tr>
    <tr>
      <td>dateLimit</td>
      <td>Object: {name: value}</td>
      <td></td>
      <td>Date range limt.</td>
    </tr>
    <tr>
      <td>minPanel</td>
      <td>String</td>
      <td>'day'</td>
      <td>Min panel for select.</td>
    </tr>
  </tbody>
</table>

### DatetimeRangePickerTrigger Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>moment</td>
      <td>Object: {start: moment, end: moment}</td>
      <td></td>
      <td>Set the selected date range.</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>Function(datetime: {start: moment, end: moment})</td>
      <td></td>
      <td>`onChange` will be triggered while confirm button or shortcuts clicked.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td></td>
      <td>Additional css class of root dom node.</td>
    </tr>
    <tr>
      <td>showCalendarPicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the calendar picker.</td>
    </tr>
    <tr>
      <td>showTimePicker</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to show the time picker.</td>
    </tr>
    <tr>
      <td>splitPanel</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Enable `split-panel` mode.</td>
    </tr>
    <tr>
      <td>shortcuts</td>
      <td>Object:{name: {start: moment, end: moment}}</td>
      <td></td>
      <td>Add shortcuts on the top `shortcuts-bar` for selecting a date range.</td>
    </tr>
    <tr>
      <td>maxDate</td>
      <td>moment</td>
      <td></td>
      <td>Max Date limit.</td>
    </tr>
    <tr>
      <td>minDate</td>
      <td>moment</td>
      <td></td>
      <td>Min Date limit.</td>
    </tr>
    <tr>
      <td>weeks</td>
      <td>Array</td>
      <td>['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']</td>
      <td>Text for weekdays.</td>
    </tr>
    <tr>
      <td>months</td>
      <td>Array</td>
      <td>[Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']</td>
      <td>Text for months.</td>
    </tr>
    <tr>
      <td>dayFormat</td>
      <td>String</td>
      <td>'MMMM, YYYY'</td>
      <td>Formatting current date of the day panel.</td>
    </tr>
    <tr>
      <td>format</td>
      <td>String</td>
      <td>'YYYY/MM/DD HH:mm' / 'YYYY/MM/DD'</td>
      <td>Formatting current date of each panel.</td>
    </tr>
    <tr>
      <td>showCustomButton</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to show the custom button.</td>
    </tr>
    <tr>
      <td>customButtonText</td>
      <td>String</td>
      <td>Custom</td>
      <td>Text for custom button.</td>
    </tr>
    <tr>
      <td>customRange</td>
      <td>Object: {start: moment, end: moment}</td>
      <td>Last 30 days</td>
      <td>Set the custom button value.</td>
    </tr>
    <tr>
      <td>confirmButtonText</td>
      <td>String</td>
      <td>Confirm</td>
      <td>Text for confirm button.</td>
    </tr>
    <tr>
      <td>startDateText</td>
      <td>String</td>
      <td>Start Date:</td>
      <td>Text for start date label.</td>
    </tr>
    <tr>
      <td>endDateText</td>
      <td>String</td>
      <td>End date:</td>
      <td>Text for end date label.</td>
    </tr>
    <tr>
      <td>dateLimit</td>
      <td>Object: {name: value}</td>
      <td></td>
      <td>Date range limt.</td>
    </tr>
    <tr>
      <td>appendToBody</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to render the picker to `body`.</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Disabled triggering.</td>
    </tr>
    <tr>
      <td>minPanel</td>
      <td>String</td>
      <td>'day'</td>
      <td>Min panel for select.</td>
    </tr>
  </tbody>
</table>