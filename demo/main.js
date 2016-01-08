import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Calendar, Datepicker, VIEWMODE, SELECTMODE } from '../src/index';

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