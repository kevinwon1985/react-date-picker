const defaultTheme = {
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
		color: '#000000',
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
		borderColor: '#fff',
	},

	DayCell: {

	},

	MonthCell: {

	},

	YearCell: {

	},

	DayPassive : {
		color: '#999',
		cursor: 'normal'
	},

	DayHover: {
		borderColor: '#999',
	},

	DayActive: {
		transform: 'scale(0.9)',
	},

	DaySelected: {
		borderColor: '#23537d',
	},

	DayIsToday: {
		background: '#337ab7',
		color: '#ffffff',
	},

	DayInRange: {
		background: '#34495e',
		color: '#95a5a6',
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
		cursor: 'pointer',
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
		marginLeft: 1,
	},

	TransitionBtnArrowNext: {
		borderLeftWidth: '6px',
		borderLeftColor: '#34495e',
		marginLeft: 7,
	},
	ClearButton:{
	    'width':'10px',
	    'height':'10px',
	    'background-image':'url(data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAACMuAAAjLgAAAAAAAAAAAAAgHyPDIB8jXiAfIwAgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI10gHyPEIB8jayAfI9AgHyNRIB8jACAfIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI1EgHyPQIB8jbCAfIwEgHyNeIB8j0yAfI1IgHyMAIB8jAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI1EgHyPTIB8jXiAfIwEgHyMAIB8jASAfI18gHyPTIB8jUSAfIwAgHyMAAAAAAAAAAAAgHyMAIB8jACAfI1EgHyPTIB8jXyAfIwEgHyMAAAAAACAfIwAgHyMBIB8jXyAfI9MgHyNRIB8jACAfIwAgHyMAIB8jACAfI1EgHyPTIB8jXyAfIwEgHyMAAAAAAAAAAAAAAAAAIB8jACAfIwEgHyNfIB8j0yAfI1EgHyMAIB8jACAfI1EgHyPTIB8jXyAfIwEgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jASAfI18gHyPSIB8jUCAfI1AgHyPSIB8jYCAfIwEgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAfIwAgHyMBIB8jXyAfI90gHyPdIB8jXyAfIwEgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI1QgHyPhIB8j4SAfI1QgHyMAIB8jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI1MgHyPTIB8jXiAfI14gHyPTIB8jUyAfIwAgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI1IgHyPTIB8jXiAfIwEgHyMBIB8jXiAfI9MgHyNTIB8jACAfIwAAAAAAAAAAAAAAAAAgHyMAIB8jACAfI1IgHyPTIB8jXiAfIwEgHyMAIB8jACAfIwEgHyNeIB8j0yAfI1MgHyMAIB8jAAAAAAAgHyMAIB8jACAfI1IgHyPTIB8jXiAfIwEgHyMAAAAAAAAAAAAgHyMAIB8jASAfI14gHyPTIB8jUiAfIwAgHyMAIB8jACAfI1EgHyPTIB8jXyAfIwEgHyMAAAAAAAAAAAAAAAAAAAAAACAfIwAgHyMBIB8jXiAfI9MgHyNSIB8jACAfI10gHyPQIB8jXiAfIwEgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB8jACAfIwEgHyNeIB8j0CAfI10gHyPMIB8jbCAfIwEgHyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHyMAIB8jASAfI2wgHyPNH/wAAB/4AAAP8AAAh+EAAMPDAADhhwAA8A8AAPgfAAD8PwAA8A8AAOAHAADBgwAAg8EAAIfgAAAP8AAAH/gAAA==)',
	    'display': 'block',
	    'background-size': '100%',
	    'position': 'absolute',
	    'top': '50%',
    	'margin-top': '-5px',
	    'right': '5px',
	    'cursor': 'pointer',
	}
}

export default (customTheme = {}) => {

	let calendarWidth = defaultTheme.Calendar.width;
	let calendarPadding = defaultTheme.Calendar.padding;

	if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('width')) {
		calendarWidth = customTheme.Calendar.width;
	}

	if (customTheme.Calendar && customTheme.Calendar.hasOwnProperty('padding')) {
		calendarPadding = customTheme.Calendar.padding;
	}

	const dayCellSize = (parseInt(calendarWidth) - parseInt(calendarPadding) * 2) / 7;

	const monthCellSize = (parseInt(calendarWidth) - parseInt(calendarPadding) * 2) / 4;

	return {

		Datepicker: {
			...defaultTheme.Datepicker
		},

		Dropdown: {
			...defaultTheme.Dropdown,
			...customTheme.Dropdown
		},

		Calendar: { ...defaultTheme.Calendar, ...customTheme.Calendar },

		Cell: {
			...defaultTheme.Cell,
			...customTheme.Cell,
		},

		DayCell: {
			width: dayCellSize,
			height: dayCellSize,
			lineHeight: dayCellSize + 'px',
			...defaultTheme.Cell,
			...defaultTheme.DayCell,
			...customTheme.DayCell,
		},

		MonthCell: {
			width: monthCellSize,
			height: monthCellSize,
			lineHeight: monthCellSize + 'px',
			...defaultTheme.Cell,
			...defaultTheme.MonthCell,
			...customTheme.MonthCell,
		},

		YearCell: {
			width: monthCellSize,
			height: monthCellSize,
			lineHeight: monthCellSize + 'px',
			...defaultTheme.Cell,
			...defaultTheme.YearCell,
			...customTheme.YearCell,
		},

		DayPassive : { ...defaultTheme.DayPassive, ...customTheme.DayPassive },

		DayHover: { ...defaultTheme.DayHover, ...customTheme.DayHover },

		DayActive: { ...defaultTheme.DayActive, ...customTheme.DayActive },

		DaySelected: { ...defaultTheme.DaySelected, ...customTheme.DaySelected },

		DayIsToday: { ...defaultTheme.DayIsToday, ...customTheme.DayIsToday },

		DayInRange: { ...defaultTheme.DayInRange, ...customTheme.DayInRange },

		Weekday: {
			width: dayCellSize,
			height: dayCellSize / 2,
			lineHeight: dayCellSize / 2 + 'px',
			...defaultTheme.Cell,
			...defaultTheme.Weekday,
			...customTheme.Weekday,
			cursor: 'default'
		},

		Header: { ...defaultTheme.Header, ...customTheme.Header },
		
		HeaderTitle: { ...defaultTheme.HeaderTitle, ...customTheme.HeaderTitle },

		TransitionBtn: { ...defaultTheme.TransitionBtn, ...customTheme.TransitionBtn },

		TransitionBtnArrow: { ...defaultTheme.TransitionBtnArrow, ...customTheme.TransitionBtnArrow },

		TransitionBtnArrowPrev: { ...defaultTheme.TransitionBtnArrowPrev, ...customTheme.TransitionBtnArrowPrev },

		TransitionBtnArrowNext: { ...defaultTheme.TransitionBtnArrowNext, ...customTheme.TransitionBtnArrowNext },
		
		ClearButton:{...defaultTheme.ClearButton}
	}
}
