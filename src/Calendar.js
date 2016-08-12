import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Cell from './Cell'
import getTheme from './styles'
import { VIEWMODE, SELECTMODE } from './constants'

function checkRange(dayMoment, range) {
	return dayMoment.isBetween(
			range['startDate'].clone().startOf('days'),
			range['endDate'].clone().add(1, 'days') );
}
function checkRangex(dayMoment, rangex) {
	return dayMoment.isBetween(
			moment(rangex['rangeMindate']).clone().startOf('days'),
			moment(rangex['rangeMaxdate']).clone().add(1, 'days') )
}

class Calendar extends Component {
	constructor(props) {
		super(props);

		this.oldSelectMode = props.selectMode;

		let { format, dates, theme, firstDayOfWeek, viewMode, selectMode,rangeMindate,rangeMaxdate } = props;

		let state = {
			viewMode,
			selectMode,
			dates,
			rangeMindate, 
			rangeMaxdate,
			shownDate : (dates && rangeMindate && rangeMaxdate && dates['endDate'] || dates || moment()).clone(),
			firstDayOfWeek: (firstDayOfWeek || moment.localeData().firstDayOfWeek()),
		}

		this.selectDateRangeStep = 0;
		this.state	= state;
		this.styles = getTheme(theme);
	}
	
	componentWillReceiveProps(nextProps) {
		let { dates, selectMode,rangeMindate,rangeMaxdate } = nextProps;
		let viewMode, shownDate, range;

		switch(selectMode) {
			case SELECTMODE.DATES:
				shownDate = (dates&&dates['endDate']||moment()).clone();
				viewMode = selectMode>>2<<2;
				break;
			case SELECTMODE.DATEX:
			    shownDate = (rangeMindate || moment()).clone();
				viewMode = selectMode >> 2 << 2;
				break;
			case SELECTMODE.TIME:
			case SELECTMODE.DATE:
			case SELECTMODE.WEEK:
			case SELECTMODE.MONTH:
			case SELECTMODE.YEAR:
				shownDate = (dates||moment()).clone();
				viewMode = selectMode>>2<<2;
				break;
		}

		if( dates !== undefined || (this.oldSelectMode != selectMode && dates === undefined)){
			this.setState({dates});
		}

		if(this.oldSelectMode != selectMode){
			this.oldSelectMode = selectMode;
		}

		this.setState({
			selectMode,
			viewMode,
			shownDate,
			rangeMindate,
			rangeMaxdate
		});
	}

	componentDidMount() {
		const { onInit } = this.props;
		onInit && onInit(this.state.dates)&& onInit(this.state.rangeMaxdate);
	}

	render() {
		switch(this.state.viewMode) {
			case VIEWMODE.DAY:
				return this.renderDayView()
			case VIEWMODE.MONTH:
				return this.renderMonthView()
			case VIEWMODE.YEAR:
				return this.renderYearView()
			case VIEWMODE.YEARS:
				return this.renderYearsView()
		}
	}

	cellClickHandle(newDate) {
		const { onChange } = this.props;
		const { dates, selectMode, viewMode } = this.state;

		//是否是selectMode对应的viewMode
		const isCorrelateVM = viewMode>>2 == selectMode>>2;
		switch(true) {
			case isCorrelateVM && selectMode == SELECTMODE.DATES:
				//是对应的viewMode且selectMode为选择日期范围
				this.selectDateRange(newDate)
				break;
			case isCorrelateVM:
				//是对应的viewMode, 则修改选择的日期
				onChange && onChange(newDate);
				this.setState({ dates : newDate });
				break;
			case viewMode>>2 > selectMode>>2:
				//viewMode层级大于selectMode层级，则切换viewMode更小的层级
				this.setState({
					viewMode : viewMode>>2,
					shownDate: newDate
				});
				break;
			case viewMode>>2 < selectMode>>2:
				//不应该出现这种情况，说明传入的viewMode与selectMode不合理
				break;
		}
	}

	orderRange(range) {
		const { startDate, endDate } = range;
		const swap = startDate.isAfter(endDate);

		if (!swap) return range;

		return {
			startDate : endDate,
			endDate   : startDate
		}
	}

	selectDateRange(date) {
		const { onChange } = this.props
		const { startDate, endDate } = this.state.dates||{};
		
		let range = { startDate, endDate };

		switch (this.selectDateRangeStep) {
			case 0:
				range['startDate'] = date;
				range['endDate'] = date;
				this.selectDateRangeStep = 1;
				break;
			case 1:
				range['endDate'] = date;
				this.selectDateRangeStep = 2;
				break;
		}

		range = this.orderRange(range);

		this.setState({ dates: range });

		if(this.selectDateRangeStep == 2) {
			this.selectDateRangeStep = 0;
			onChange && onChange(range);
		}
	}

	transitionBtnClickHandle(direction, event) {
		event.preventDefault();

		const { viewMode, shownDate } = this.state;
		let newShownDate = shownDate;

		switch(viewMode) {
			case VIEWMODE.DAY:
				newShownDate = shownDate.clone().add(direction, 'hours');
				break;
			case VIEWMODE.MONTH:
				newShownDate = shownDate.clone().add(direction, 'months');
				break;
			case VIEWMODE.YEAR:
				newShownDate = shownDate.clone().add(direction, 'years');
				break;
			case VIEWMODE.YEARS:
				newShownDate = shownDate.clone().add(direction*16, 'years');
				break;
			default:
				break;
		}

		this.setState({
			shownDate : newShownDate
		});
	}

	headerTitleClickHandle() {
		let newViewMode = VIEWMODE.MONTH;
		const { viewMode } = this.state;

		switch(true) {
			case viewMode < VIEWMODE.YEARS:
				this.setState({viewMode: viewMode<<2});
				break;
		}
	}

	ganerateDays() {
		const { firstDayOfWeek, shownDate } = this.state;

		const monthNumber = shownDate.month();
		const dayCount = shownDate.daysInMonth();
		const startOfMonth = shownDate.clone().startOf('month').isoWeekday();
		const endOfMonth = shownDate.clone().endOf('month').date();
		const days = [];

		const diff = (firstDayOfWeek - startOfMonth) % 7;
		for (let i = diff + 1; i <= 42 + diff; i++) {
			const dayMoment	= shownDate.clone().date(i);
			days.push({ dayMoment, isPassive : i < 1 || i > dayCount });
		}
		
		return days;
	}

	ganerateMonths() {
		const { shownDate } = this.state;
		const days = [];
		for (let i = -1; i <= 14; i++ ) {
			const dayMoment	= shownDate.clone().month(i);
			days.push({ dayMoment, isPassive: (i < 0 || i > 11) });
		}
		return days
	}

	ganerateYears() {
		const { shownDate } = this.state;
		const minYear = 1915;
		const maxYear = 2115;
		let year = shownDate.year();
		year = Math.min(maxYear, Math.max(minYear, year));
		shownDate.year(year);

		const indexInPage = (year-minYear)%16;
		const startYear = Math.min(Math.max(minYear, year-indexInPage));
		const endYear = Math.min(maxYear, year-indexInPage+15);
		const days = [];
		for (let i = startYear; i <= endYear; i++ ) {
			const dayMoment	= shownDate.clone().year(i);
			days.push({ dayMoment });
		}
		return days;
	}

	renderHeader(title) {
		const { styles } = this;

		return (
			<div style={styles['Header']} className='rdr-header-inner'>
				<button
					style={{ ...styles['TransitionBtn'], float : 'left' }}
					className='rdr-header-button prev'
					onClick={this.transitionBtnClickHandle.bind(this, -1)}>
					<i style={{ ...styles['TransitionBtnArrow'], ...styles['TransitionBtnArrowPrev'] }}></i>
				</button>
				<span className='rdr-header-title'
					onClick={this.headerTitleClickHandle.bind(this)}
					style={{ ...styles['HeaderTitle']}}>
					{title}
				</span>
				<button
					style={{ ...styles['TransitionBtn'], float : 'right' }}
					className='rdr-header-button next'
					onClick={this.transitionBtnClickHandle.bind(this, +1)}>
					<i style={{ ...styles['TransitionBtnArrow'], ...styles['TransitionBtnArrowNext'] }}></i>
				</button>
			</div>
		)
	}

	renderWeekdays() {
		const dow		= this.state.firstDayOfWeek;
		const weekdays	 = [];
		const { styles } = this;

		for (let i = dow; i < 7 + dow; i++) {
			const day = moment.weekdaysMin(i);

			weekdays.push(
				<span style={styles['Weekday']} className='rdr-WeekDay' key={day}>{day}</span>
			);
		}

		return weekdays;
	}

	renderDays() {
		const { styles } = this;
		const { dates, selectMode,rangeMindate, rangeMaxdate } = this.state;
		const days = this.ganerateDays();

		return days.map((data, index) => {
			const { dayMoment, isPassive } = data;
			const isToday = dayMoment.isSame(new Date(), 'day'); 
			let isSelected, isInRange;

			switch(selectMode) {
				case SELECTMODE.DATES:
					isInRange = dates ? checkRange(dayMoment, dates) : false;
					break;
				case SELECTMODE.DATE:
					isSelected = dates ? dayMoment.isSame(dates, 'day') : false;
					break;
				case SELECTMODE.DATEX:
					let rangex = { rangeMindate, rangeMaxdate };
			        isInRange = rangex ? checkRangex(dayMoment, rangex) : false;
					break;
				case SELECTMODE.WEEK:
					isInRange = dates ? dayMoment.isSame(dates, 'week') : false;
					break;
			}

			return (
				<Cell
					className="rdr-Day"
					onSelect={ this.cellClickHandle.bind(this) }
					{ ...data }
					theme={ styles }
					cellStyleKey="DayCell"
					isSelected={ isSelected }
					isInRange={ isInRange }
					isToday={ isToday }
					key={ index } >{ dayMoment.date() }</Cell>
			);
		})
	}

	renderMonths() {
		const { styles } = this;
		const { dates, selectMode } = this.state;
		const months = this.ganerateMonths();

		return months.map((data, index) => {
			const { dayMoment, isPassive } = data;
			//修改判断isSelected判断条件为同一天
			const isSelected = (selectMode != SELECTMODE.DATES && 
				selectMode != SELECTMODE.WEEK && dates && dayMoment.isSame(dates, 'month'));
			//新增isToday状态
			const isSameMonth = dayMoment.isSame(new Date(), 'month'); 

			return (
				<Cell
					className="rdr-month"
					onSelect={ this.cellClickHandle.bind(this) }
					{ ...data }
					theme={ styles }
					cellStyleKey="MonthCell"
					isSelected={ isSelected }
					isToday={ isSameMonth }
					key={ index } >{ moment.months(dayMoment.month()) }</Cell>
			);
		})
	}

	renderYears() {
		const { styles } = this;
		const { dates, selectMode } = this.state;
		const years = this.ganerateYears();

		return years.map((data, index) => {
			const { dayMoment, isPassive } = data;
			const isSelected = (selectMode != SELECTMODE.DATES && 
				selectMode != SELECTMODE.WEEK && dates && dayMoment.isSame(dates, 'year'));
			const isSameYear = dayMoment.isSame(new Date(), 'year'); 

			return (
				<Cell
					className="rdr-year"
					onSelect={ this.cellClickHandle.bind(this) }
					{ ...data }
					theme={ styles }
					cellStyleKey="YearCell"
					isSelected={ isSelected }
					isToday={ isSameYear }
					key={ index } >{ dayMoment.year() }</Cell>
			);
		})
	}

	renderDayView() {
		const { styles } = this;
		const headerTitle = '';
		return (
			<div style={{ ...styles['Calendar'], ...this.props.style }} className='rdr-Calendar'>
				//TODO: 待实现
			</div>
		)
	}

	renderMonthView() {
		const { styles } = this;
		const { shownDate } = this.state;
		const headerTitle = moment.months(shownDate.month()) + ' - ' + shownDate.year();

		return (
			<div style={{ ...styles['Calendar'], ...this.props.style }} className='rdr-Calendar'>
				<div className='rdr-header'>{ this.renderHeader(headerTitle) }</div>
				<div className='rdr-body'>
					<div className='rdr-WeekDays'>{ this.renderWeekdays() }</div>
					<div className='rdr-Days'>{ this.renderDays() }</div>
				</div>
			</div>
		)
	}

	renderYearView() {
		const { styles } = this;
		const headerTitle = this.state.shownDate.year();

		return (
			<div style={{ ...styles['Calendar'], ...this.props.style }} className='rdr-Calendar'>
				<div className='rdr-header'>{ this.renderHeader(headerTitle) }</div>
				<div className='rdr-body'>
					{ this.renderMonths() }
				</div>
			</div>
		)
	}

	renderYearsView() {
		const { styles } = this;
		const headerTitle = '';

		return (
			<div style={{ ...styles['Calendar'], ...this.props.style }} className='rdr-Calendar'>
				<div className='rdr-header'>{ this.renderHeader(headerTitle) }</div>
				<div className='rdr-body'>
					{ this.renderYears() }
				</div>
			</div>
		)
	}
}

Calendar.defaultProps = {
	selectMode: SELECTMODE.DATE,
	viewMode : VIEWMODE.MONTH,
	format	 : 'YYYY-MM-DD',
	theme	 : {},
}

let DatePropType = PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]);
Calendar.propTypes = {
	minDate         : DatePropType,
	maxDate         : DatePropType,
	dates			: DatePropType,
	format		    : PropTypes.string.isRequired,
	firstDayOfWeek  : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange		: PropTypes.func,
	onInit		    : PropTypes.func,
	theme			: PropTypes.object,
	viewMode        : PropTypes.oneOf([
						VIEWMODE.DAY,
						VIEWMODE.MONTH,
						VIEWMODE.YEAR,
						VIEWMODE.YEARS
					]),
	selectMode      : PropTypes.oneOf([
						SELECTMODE.TIME,
						SELECTMODE.DATE,
						SELECTMODE.DATEX,
						SELECTMODE.DATES,
						SELECTMODE.WEEK,
						SELECTMODE.MONTH,
						SELECTMODE.YEAR
					]),
}

export default Calendar;
