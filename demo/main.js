import React, { Component } from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import { Calendar, Datepicker, Rangepicker, VIEWMODE, SELECTMODE } from '../src/index';

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			selectedDate: undefined,
			selectedWeekDate: undefined,
			selectedMonthDate: undefined,
			selectedYearDate: undefined,
			selectedDates: undefined,
			selectedDatex1: undefined,
			selectedDatex2: undefined
		}
	}

	render() {
		const { selectedDate, selectedWeekDate, selectedMonthDate, selectedYearDate, selectedDates, selectedDatex2, selectedDatex1} = this.state;
		const format = 'dddd, D MMMM YYYY';

		return (
			<div>
				<h1>选择时间范围</h1>
				<Rangepicker
					placeholder="选择时间范围"
					rangeStartdate={selectedDatex1}
					rangeEnddate={selectedDatex2}
					selectMode={SELECTMODE.DATEX}
					onChange={this.handleSelectDates.bind(this, 'selectedDatex1', 'selectedDatex2') } />
				<h1>选择时间范围</h1>
				<Datepicker
					placeholder="选择时间范围"
					value1={selectedDates}
					selectMode={SELECTMODE.DATES}
					onChange={this.handleSelectDates.bind(this, 'selectedDates') } />
				<h1>选择日期</h1>
				<Datepicker
					placeholder="选择日期"
					value={selectedDate}
					selectMode={SELECTMODE.DATE}
					onChange={this.handleSelectDates.bind(this, 'selectedDate') } />

				<h1>选择周</h1>
				<Datepicker
					placeholder="选择周"
					value={selectedWeekDate}
					selectMode={SELECTMODE.WEEK}
					onChange={this.handleSelectDates.bind(this, 'selectedWeekDate') } />

				<h1>选择月</h1>
				<Datepicker
					placeholder="选择月"
					value={selectedMonthDate}
					selectMode={SELECTMODE.MONTH}
					onChange={this.handleSelectDates.bind(this, 'selectedMonthDate') } />

				<h1>选择年</h1>
				<Datepicker
					placeholder="选择年"
					value={selectedYearDate}
					selectMode={SELECTMODE.YEAR}
					onChange={this.handleSelectDates.bind(this, 'selectedYearDate') } />

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