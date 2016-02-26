'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function checkRange(dayMoment, range) {
	return dayMoment.isBetween(range['startDate'].clone().startOf('days'), range['endDate'].clone().add(1, 'days'));
}

var Calendar = function (_Component) {
	_inherits(Calendar, _Component);

	function Calendar(props) {
		_classCallCheck(this, Calendar);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props));

		_this.oldSelectMode = props.selectMode;

		var format = props.format;
		var dates = props.dates;
		var theme = props.theme;
		var firstDayOfWeek = props.firstDayOfWeek;
		var viewMode = props.viewMode;
		var selectMode = props.selectMode;

		var state = {
			viewMode: viewMode,
			selectMode: selectMode,
			dates: dates,
			shownDate: (dates && dates['endDate'] || dates || (0, _moment2.default)()).clone(),
			firstDayOfWeek: firstDayOfWeek || _moment2.default.localeData().firstDayOfWeek()
		};

		_this.selectDateRangeStep = 0;
		_this.state = state;
		_this.styles = (0, _styles2.default)(theme);
		return _this;
	}

	_createClass(Calendar, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var dates = nextProps.dates;
			var selectMode = nextProps.selectMode;

			var viewMode = undefined,
			    shownDate = undefined,
			    range = undefined;

			switch (selectMode) {
				case _constants.SELECTMODE.DATES:
					shownDate = (dates && dates['endDate'] || (0, _moment2.default)()).clone();
					viewMode = selectMode >> 2 << 2;
					break;
				case _constants.SELECTMODE.TIME:
				case _constants.SELECTMODE.DATE:
				case _constants.SELECTMODE.WEEK:
				case _constants.SELECTMODE.MONTH:
				case _constants.SELECTMODE.YEAR:
					shownDate = (dates || (0, _moment2.default)()).clone();
					viewMode = selectMode >> 2 << 2;
					break;
			}

			if (dates !== undefined || this.oldSelectMode != selectMode && dates === undefined) {
				this.setState({ dates: dates });
			}

			if (this.oldSelectMode != selectMode) {
				this.oldSelectMode = selectMode;
			}

			this.setState({
				selectMode: selectMode,
				viewMode: viewMode,
				shownDate: shownDate
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var onInit = this.props.onInit;

			onInit && onInit(this.state.dates);
		}
	}, {
		key: 'render',
		value: function render() {
			switch (this.state.viewMode) {
				case _constants.VIEWMODE.DAY:
					return this.renderDayView();
				case _constants.VIEWMODE.MONTH:
					return this.renderMonthView();
				case _constants.VIEWMODE.YEAR:
					return this.renderYearView();
				case _constants.VIEWMODE.YEARS:
					return this.renderYearsView();
			}
		}
	}, {
		key: 'cellClickHandle',
		value: function cellClickHandle(newDate) {
			var onChange = this.props.onChange;
			var _state = this.state;
			var dates = _state.dates;
			var selectMode = _state.selectMode;
			var viewMode = _state.viewMode;

			//是否是selectMode对应的viewMode

			var isCorrelateVM = viewMode >> 2 == selectMode >> 2;
			switch (true) {
				case isCorrelateVM && selectMode == _constants.SELECTMODE.DATES:
					//是对应的viewMode且selectMode为选择日期范围
					this.selectDateRange(newDate);
					break;
				case isCorrelateVM:
					//是对应的viewMode, 则修改选择的日期
					onChange && onChange(newDate);
					this.setState({ dates: newDate });
					break;
				case viewMode >> 2 > selectMode >> 2:
					//viewMode层级大于selectMode层级，则切换viewMode更小的层级
					this.setState({
						viewMode: viewMode >> 2,
						shownDate: newDate
					});
					break;
				case viewMode >> 2 < selectMode >> 2:
					//不应该出现这种情况，说明传入的viewMode与selectMode不合理
					break;
			}
		}
	}, {
		key: 'orderRange',
		value: function orderRange(range) {
			var startDate = range.startDate;
			var endDate = range.endDate;

			var swap = startDate.isAfter(endDate);

			if (!swap) return range;

			return {
				startDate: endDate,
				endDate: startDate
			};
		}
	}, {
		key: 'selectDateRange',
		value: function selectDateRange(date) {
			var onChange = this.props.onChange;

			var _ref = this.state.dates || {};

			var startDate = _ref.startDate;
			var endDate = _ref.endDate;

			var range = { startDate: startDate, endDate: endDate };

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

			if (this.selectDateRangeStep == 2) {
				this.selectDateRangeStep = 0;
				onChange && onChange(range);
			}
		}
	}, {
		key: 'transitionBtnClickHandle',
		value: function transitionBtnClickHandle(direction, event) {
			event.preventDefault();

			var _state2 = this.state;
			var viewMode = _state2.viewMode;
			var shownDate = _state2.shownDate;

			var newShownDate = shownDate;

			switch (viewMode) {
				case _constants.VIEWMODE.DAY:
					newShownDate = shownDate.clone().add(direction, 'hours');
					break;
				case _constants.VIEWMODE.MONTH:
					newShownDate = shownDate.clone().add(direction, 'months');
					break;
				case _constants.VIEWMODE.YEAR:
					newShownDate = shownDate.clone().add(direction, 'years');
					break;
				case _constants.VIEWMODE.YEARS:
					newShownDate = shownDate.clone().add(direction * 16, 'years');
					break;
				default:
					break;
			}

			this.setState({
				shownDate: newShownDate
			});
		}
	}, {
		key: 'headerTitleClickHandle',
		value: function headerTitleClickHandle() {
			var newViewMode = _constants.VIEWMODE.MONTH;
			var viewMode = this.state.viewMode;

			switch (true) {
				case viewMode < _constants.VIEWMODE.YEARS:
					this.setState({ viewMode: viewMode << 2 });
					break;
			}
		}
	}, {
		key: 'ganerateDays',
		value: function ganerateDays() {
			var _state3 = this.state;
			var firstDayOfWeek = _state3.firstDayOfWeek;
			var shownDate = _state3.shownDate;

			var monthNumber = shownDate.month();
			var dayCount = shownDate.daysInMonth();
			var startOfMonth = shownDate.clone().startOf('month').isoWeekday();
			var endOfMonth = shownDate.clone().endOf('month').date();
			var days = [];

			var diff = (firstDayOfWeek - startOfMonth) % 7;
			for (var i = diff + 1; i <= 42 + diff; i++) {
				var dayMoment = shownDate.clone().date(i);
				days.push({ dayMoment: dayMoment, isPassive: i < 1 || i > dayCount });
			}

			return days;
		}
	}, {
		key: 'ganerateMonths',
		value: function ganerateMonths() {
			var shownDate = this.state.shownDate;

			var days = [];
			for (var i = -1; i <= 14; i++) {
				var dayMoment = shownDate.clone().month(i);
				days.push({ dayMoment: dayMoment, isPassive: i < 0 || i > 11 });
			}
			return days;
		}
	}, {
		key: 'ganerateYears',
		value: function ganerateYears() {
			var shownDate = this.state.shownDate;

			var minYear = 1915;
			var maxYear = 2115;
			var year = shownDate.year();
			year = Math.min(maxYear, Math.max(minYear, year));
			shownDate.year(year);

			var indexInPage = (year - minYear) % 16;
			var startYear = Math.min(Math.max(minYear, year - indexInPage));
			var endYear = Math.min(maxYear, year - indexInPage + 15);
			var days = [];
			for (var i = startYear; i <= endYear; i++) {
				var dayMoment = shownDate.clone().year(i);
				days.push({ dayMoment: dayMoment });
			}
			return days;
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader(title) {
			var styles = this.styles;

			return _react2.default.createElement(
				'div',
				{ style: styles['Header'], className: 'rdr-header-inner' },
				_react2.default.createElement(
					'button',
					{
						style: _extends({}, styles['TransitionBtn'], { float: 'left' }),
						className: 'rdr-header-button prev',
						onClick: this.transitionBtnClickHandle.bind(this, -1) },
					_react2.default.createElement('i', { style: _extends({}, styles['TransitionBtnArrow'], styles['TransitionBtnArrowPrev']) })
				),
				_react2.default.createElement(
					'span',
					{ className: 'rdr-header-title',
						onClick: this.headerTitleClickHandle.bind(this),
						style: _extends({}, styles['HeaderTitle']) },
					title
				),
				_react2.default.createElement(
					'button',
					{
						style: _extends({}, styles['TransitionBtn'], { float: 'right' }),
						className: 'rdr-header-button next',
						onClick: this.transitionBtnClickHandle.bind(this, +1) },
					_react2.default.createElement('i', { style: _extends({}, styles['TransitionBtnArrow'], styles['TransitionBtnArrowNext']) })
				)
			);
		}
	}, {
		key: 'renderWeekdays',
		value: function renderWeekdays() {
			var dow = this.state.firstDayOfWeek;
			var weekdays = [];
			var styles = this.styles;

			for (var i = dow; i < 7 + dow; i++) {
				var day = _moment2.default.weekdaysMin(i);

				weekdays.push(_react2.default.createElement(
					'span',
					{ style: styles['Weekday'], className: 'rdr-WeekDay', key: day },
					day
				));
			}

			return weekdays;
		}
	}, {
		key: 'renderDays',
		value: function renderDays() {
			var _this2 = this;

			var styles = this.styles;
			var _state4 = this.state;
			var dates = _state4.dates;
			var selectMode = _state4.selectMode;

			var days = this.ganerateDays();

			return days.map(function (data, index) {
				var dayMoment = data.dayMoment;
				var isPassive = data.isPassive;

				var isToday = dayMoment.isSame(new Date(), 'day');
				var isSelected = undefined,
				    isInRange = undefined;

				switch (selectMode) {
					case _constants.SELECTMODE.DATES:
						isInRange = dates ? checkRange(dayMoment, dates) : false;
						break;
					case _constants.SELECTMODE.DATE:
						isSelected = dates ? dayMoment.isSame(dates, 'day') : false;
						break;
					case _constants.SELECTMODE.WEEK:
						isInRange = dates ? dayMoment.isSame(dates, 'week') : false;
						break;
				}

				return _react2.default.createElement(
					_Cell2.default,
					_extends({
						className: 'rdr-Day',
						onSelect: _this2.cellClickHandle.bind(_this2)
					}, data, {
						theme: styles,
						cellStyleKey: 'DayCell',
						isSelected: isSelected,
						isInRange: isInRange,
						isToday: isToday,
						key: index }),
					dayMoment.date()
				);
			});
		}
	}, {
		key: 'renderMonths',
		value: function renderMonths() {
			var _this3 = this;

			var styles = this.styles;
			var _state5 = this.state;
			var dates = _state5.dates;
			var selectMode = _state5.selectMode;

			var months = this.ganerateMonths();

			return months.map(function (data, index) {
				var dayMoment = data.dayMoment;
				var isPassive = data.isPassive;
				//修改判断isSelected判断条件为同一天

				var isSelected = selectMode != _constants.SELECTMODE.DATES && selectMode != _constants.SELECTMODE.WEEK && dates && dayMoment.isSame(dates, 'month');
				//新增isToday状态
				var isSameMonth = dayMoment.isSame(new Date(), 'month');

				return _react2.default.createElement(
					_Cell2.default,
					_extends({
						className: 'rdr-month',
						onSelect: _this3.cellClickHandle.bind(_this3)
					}, data, {
						theme: styles,
						cellStyleKey: 'MonthCell',
						isSelected: isSelected,
						isToday: isSameMonth,
						key: index }),
					_moment2.default.months(dayMoment.month())
				);
			});
		}
	}, {
		key: 'renderYears',
		value: function renderYears() {
			var _this4 = this;

			var styles = this.styles;
			var _state6 = this.state;
			var dates = _state6.dates;
			var selectMode = _state6.selectMode;

			var years = this.ganerateYears();

			return years.map(function (data, index) {
				var dayMoment = data.dayMoment;
				var isPassive = data.isPassive;

				var isSelected = selectMode != _constants.SELECTMODE.DATES && selectMode != _constants.SELECTMODE.WEEK && dates && dayMoment.isSame(dates, 'year');
				var isSameYear = dayMoment.isSame(new Date(), 'year');

				return _react2.default.createElement(
					_Cell2.default,
					_extends({
						className: 'rdr-year',
						onSelect: _this4.cellClickHandle.bind(_this4)
					}, data, {
						theme: styles,
						cellStyleKey: 'YearCell',
						isSelected: isSelected,
						isToday: isSameYear,
						key: index }),
					dayMoment.year()
				);
			});
		}
	}, {
		key: 'renderDayView',
		value: function renderDayView() {
			var styles = this.styles;

			var headerTitle = '';
			return _react2.default.createElement(
				'div',
				{ style: _extends({}, styles['Calendar'], this.props.style), className: 'rdr-Calendar' },
				'//TODO: 待实现'
			);
		}
	}, {
		key: 'renderMonthView',
		value: function renderMonthView() {
			var styles = this.styles;
			var shownDate = this.state.shownDate;

			var headerTitle = _moment2.default.months(shownDate.month()) + ' - ' + shownDate.year();

			return _react2.default.createElement(
				'div',
				{ style: _extends({}, styles['Calendar'], this.props.style), className: 'rdr-Calendar' },
				_react2.default.createElement(
					'div',
					{ className: 'rdr-header' },
					this.renderHeader(headerTitle)
				),
				_react2.default.createElement(
					'div',
					{ className: 'rdr-body' },
					_react2.default.createElement(
						'div',
						{ className: 'rdr-WeekDays' },
						this.renderWeekdays()
					),
					_react2.default.createElement(
						'div',
						{ className: 'rdr-Days' },
						this.renderDays()
					)
				)
			);
		}
	}, {
		key: 'renderYearView',
		value: function renderYearView() {
			var styles = this.styles;

			var headerTitle = this.state.shownDate.year();

			return _react2.default.createElement(
				'div',
				{ style: _extends({}, styles['Calendar'], this.props.style), className: 'rdr-Calendar' },
				_react2.default.createElement(
					'div',
					{ className: 'rdr-header' },
					this.renderHeader(headerTitle)
				),
				_react2.default.createElement(
					'div',
					{ className: 'rdr-body' },
					this.renderMonths()
				)
			);
		}
	}, {
		key: 'renderYearsView',
		value: function renderYearsView() {
			var styles = this.styles;

			var headerTitle = '';

			return _react2.default.createElement(
				'div',
				{ style: _extends({}, styles['Calendar'], this.props.style), className: 'rdr-Calendar' },
				_react2.default.createElement(
					'div',
					{ className: 'rdr-header' },
					this.renderHeader(headerTitle)
				),
				_react2.default.createElement(
					'div',
					{ className: 'rdr-body' },
					this.renderYears()
				)
			);
		}
	}]);

	return Calendar;
}(_react.Component);

Calendar.defaultProps = {
	selectMode: _constants.SELECTMODE.DATE,
	viewMode: _constants.VIEWMODE.MONTH,
	format: 'YYYY-MM-DD',
	theme: {}
};

var DatePropType = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]);
Calendar.propTypes = {
	minDate: DatePropType,
	maxDate: DatePropType,
	dates: DatePropType,
	format: _react.PropTypes.string.isRequired,
	firstDayOfWeek: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	onChange: _react.PropTypes.func,
	onInit: _react.PropTypes.func,
	theme: _react.PropTypes.object,
	viewMode: _react.PropTypes.oneOf([_constants.VIEWMODE.DAY, _constants.VIEWMODE.MONTH, _constants.VIEWMODE.YEAR, _constants.VIEWMODE.YEARS]),
	selectMode: _react.PropTypes.oneOf([_constants.SELECTMODE.TIME, _constants.SELECTMODE.DATE, _constants.SELECTMODE.DATES, _constants.SELECTMODE.WEEK, _constants.SELECTMODE.MONTH, _constants.SELECTMODE.YEAR])
};

exports.default = Calendar;