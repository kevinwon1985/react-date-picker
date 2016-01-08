#说明
fork自https://github.com/Adphorus/react-date-range
因原版本仍然以来老版本的React，所以fork一份，自行维护
新增Datepicker
##改动记录
###Calendar
新增today状态样式，调整hover，active，selected状态样式，区分开selected和today
从外部接收到date改变后，也修改shownDate，使calendar日历界面显示的月份也渲染到对应的月份
重构， 新增月视图，年试图，类似windows日历；新增选周，选月模式。

# react-date-range

A React component for choosing dates and date ranges. Uses [Moment.js](http://momentjs.com/) for date operations.

## Getting Started
### Installation

```
$ npm install --save react-date-range
```

## Usage
### Date Picker
```javascript
import React, { Component } from 'react';
import { Calendar } from 'react-date-range';

class MyComponent extends Component {
	handleSelect(date){
		console.log(date); // Momentjs object
	}

	render(){
		return (
			<div>
				<Calendar
					onInit={this.handleSelect}
					onChange={this.handleSelect}
				/>
			</div>
		)
	}
}

```

###### Available Options (props)
* **date:** *(String, Moment.js object, Function)* - default: today
* **format:** *(String)* - default: DD/MM/YYY
* **firstDayOfWeek** *(Number)* - default: [moment.localeData().firstDayOfWeek()](http://momentjs.com/docs/#/i18n/locale-data/)
* **theme:** *(Object)* see [Demo's source](https://github.com/Adphorus/react-date-range/blob/master/demo/src/components/Main.js#L130)
* **onInit:** *(Function)* default: none
* **onChange:** *(Function)* default: none

### Range Picker
```javascript
import React, { Component } from 'react';
import { DateRange } from 'react-date-range';

class MyComponent extends Component {
	handleSelect(range){
		console.log(range);
		// An object with two keys,
		// 'startDate' and 'endDate' which are Momentjs objects.
	}

	render(){
		return (
			<div>
				<DateRange
					onInit={this.handleSelect}
					onChange={this.handleSelect}
				/>
			</div>
		)
	}
}

```

###### Available Options (props)
* **date:** *(String, Moment.js object, Function)* - default: today
* **format:** *(String)* - default: DD/MM/YYY
* **firstDayOfWeek** *(Number)* - default: [moment.localeData().firstDayOfWeek()](http://momentjs.com/docs/#/i18n/locale-data/)
* **theme:** *(Object)* see [Demo's source](https://github.com/Adphorus/react-date-range/blob/master/demo/src/components/Main.js#L143)
* **onInit:** *(Function)* default: none
* **onChange:** *(Function)* default: none
* **linkedCalendars:** *(Boolean)* default: false
* **calendars:** *(Number)* default: 2
* **ranges:** *(Object)* default: none
