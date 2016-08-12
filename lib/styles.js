'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultTheme = {
	Datepicker: {
		position: 'relative',
		display: 'inline-block'
	},

	Dropdown: {
		position: 'absolute',
		top: '100%',
		left: 0,
		zIndex: 1000,
		backgroundColor: '#fff',
		border: '1px solid rgba(0, 0, 0, 0.15)',
		boxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
		backgroundClip: 'padding-box'
	},

	Calendar: {
		width: 280,
		padding: 10,
		background: '#ffffff',
		borderRadius: '2px',
		display: 'inline-block',
		boxSizing: 'border-box',
		letterSpacing: 0,
		color: '#000000'
	},

	Cell: {
		boxSizing: 'border-box',
		display: 'inline-block',
		letterSpacing: 'initial',
		textAlign: 'center',
		fontSize: 12,
		cursor: 'pointer',
		transition: 'transform .1s ease',
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: '#fff'
	},

	DayCell: {},

	MonthCell: {},

	YearCell: {},

	DayPassive: {
		color: '#999',
		cursor: 'normal'
	},

	DayHover: {
		borderColor: '#999'
	},

	DayActive: {
		transform: 'scale(0.9)'
	},

	DaySelected: {
		borderColor: '#23537d'
	},

	DayIsToday: {
		background: '#337ab7',
		color: '#ffffff'
	},

	DayInRange: {
		background: '#34495e',
		color: '#95a5a6'
	},

	Weekday: {
		boxSizing: 'border-box',
		display: 'inline-block',
		letterSpacing: 'initial',
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '600',
		marginBottom: 1
	},

	Header: {
		textAlign: 'center',
		boxSizing: 'border-box',
		fontSize: 12,
		padding: '10px 0',
		height: 38,
		lineHeight: '18px'
	},

	HeaderTitle: {
		fontSize: 14,
		cursor: 'pointer'
	},

	TransitionBtn: {
		display: 'block',
		boxSizing: 'border-box',
		height: 18,
		width: 18,
		padding: 0,
		margin: '0 10px',
		border: 'none',
		background: '#bdc3c7',
		boxShadow: 'none',
		outline: 'none',
		borderRadius: '50%',
		cursor: 'pointer'
	},

	TransitionBtnArrow: {
		display: 'block',
		width: 0,
		height: 0,
		padding: 0,
		margin: 0,
		border: '4px solid transparent',
		textAlign: 'center'
	},

	TransitionBtnArrowPrev: {
		borderRightWidth: '6px',
		borderRightColor: '#34495e',
		marginLeft: 1
	},

	TransitionBtnArrowNext: {
		borderLeftWidth: '6px',
		borderLeftColor: '#34495e',
		marginLeft: 7
	}
};

exports.default = function () {
	var customTheme = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	var calendarWidth = defaultTheme.Calendar.width;
	var calendarPadding = defaultTheme.Calendar.padding;

	if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('width')) {
		calendarWidth = customTheme.Calendar.width;
	}

	if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('padding')) {
		calendarPadding = customTheme.Calendar.padding;
	}

	var dayCellSize = (parseInt(calendarWidth) - parseInt(calendarPadding) * 2) / 7;

	var monthCellSize = (parseInt(calendarWidth) - parseInt(calendarPadding) * 2) / 4;

	return {

		Datepicker: _extends({}, defaultTheme.Datepicker),

		Dropdown: _extends({}, defaultTheme.Dropdown, customTheme.Dropdown),

		Calendar: _extends({}, defaultTheme.Calendar, customTheme.Calendar),

		Cell: _extends({}, defaultTheme.Cell, customTheme.Cell),

		DayCell: _extends({
			width: dayCellSize,
			height: dayCellSize,
			lineHeight: dayCellSize + 'px'
		}, defaultTheme.Cell, defaultTheme.DayCell, customTheme.DayCell),

		MonthCell: _extends({
			width: monthCellSize,
			height: monthCellSize,
			lineHeight: monthCellSize + 'px'
		}, defaultTheme.Cell, defaultTheme.MonthCell, customTheme.MonthCell),

		YearCell: _extends({
			width: monthCellSize,
			height: monthCellSize,
			lineHeight: monthCellSize + 'px'
		}, defaultTheme.Cell, defaultTheme.YearCell, customTheme.YearCell),

		DayPassive: _extends({}, defaultTheme.DayPassive, customTheme.DayPassive),

		DayHover: _extends({}, defaultTheme.DayHover, customTheme.DayHover),

		DayActive: _extends({}, defaultTheme.DayActive, customTheme.DayActive),

		DaySelected: _extends({}, defaultTheme.DaySelected, customTheme.DaySelected),

		DayIsToday: _extends({}, defaultTheme.DayIsToday, customTheme.DayIsToday),

		DayInRange: _extends({}, defaultTheme.DayInRange, customTheme.DayInRange),

		Weekday: _extends({
			width: dayCellSize,
			height: dayCellSize / 2,
			lineHeight: dayCellSize / 2 + 'px'
		}, defaultTheme.Cell, defaultTheme.Weekday, customTheme.Weekday, {
			cursor: 'default'
		}),

		Header: _extends({}, defaultTheme.Header, customTheme.Header),

		HeaderTitle: _extends({}, defaultTheme.HeaderTitle, customTheme.HeaderTitle),

		TransitionBtn: _extends({}, defaultTheme.TransitionBtn, customTheme.TransitionBtn),

		TransitionBtnArrow: _extends({}, defaultTheme.TransitionBtnArrow, customTheme.TransitionBtnArrow),

		TransitionBtnArrowPrev: _extends({}, defaultTheme.TransitionBtnArrowPrev, customTheme.TransitionBtnArrowPrev),

		TransitionBtnArrowNext: _extends({}, defaultTheme.TransitionBtnArrowNext, customTheme.TransitionBtnArrowNext)
	};
};