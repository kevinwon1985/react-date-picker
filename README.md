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
$ npm install --save datepicker-react
```

## Usage
### Date Picker
```javascript
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Calendar, Datepicker, VIEWMODE, SELECTMODE } from 'datepicker-react';

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			selectedDate: undefined,
			selectedWeekDate: undefined,
			selectedYearDate: undefined,
			selectedDates: undefined
		}
	}

	render() {
		const { selectedDate, selectedWeekDate, selectedYearDate, selectedDates } = this.state;
		const format = 'dddd, D MMMM YYYY';

		return (
			<div>
				<h1>选择日期</h1>
				<Datepicker
					placeholder="选择日期"
					value={selectedDate}
					onChange={this.handleSelectDates.bind(this, 'selectedDate')} />

				<h1>选择周</h1>
				<Datepicker
					placeholder="选择周"
					value={selectedWeekDate}
					selectMode={SELECTMODE.WEEK}
					onChange={this.handleSelectDates.bind(this, 'selectedWeekDate')} />

				<h1>选择月</h1>
				<Datepicker
					placeholder="选择月"
					value={selectedYearDate}
					selectMode={SELECTMODE.YEAR}
					onChange={this.handleSelectDates.bind(this, 'selectedYearDate')} />

				<h1>选择时间范围</h1>
				<Datepicker
					placeholder="选择时间范围"
					value={selectedDates}
					selectMode={SELECTMODE.DATES}
					onChange={this.handleSelectDates.bind(this, 'selectedDates')} />
			</div>
		)
	}
	
	handleSelectDates(key, dates) {
		this.setState({
			[key]: dates
		});
	}
}

ReactDom.render(<App />, document.getElementById('root'));
```

###### Available Options (props)
* **value:** *(Moment.js object)* - default: undefined
* **format:** *(String)* - default: L
* **placeholder** *(String)* - default: undefined
* **theme:** *(Object)* 
* **selectMode:** *(Number)* default: SELECTMODE.DATE
* **onChange:** *(Function)* default: none
