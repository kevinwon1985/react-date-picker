'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayCell = function (_Component) {
	_inherits(DayCell, _Component);

	function DayCell(props, context) {
		_classCallCheck(this, DayCell);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DayCell).call(this, props, context));

		_this.state = {
			hover: false,
			active: false
		};

		_this.styles = _this.props.theme;
		return _this;
	}

	_createClass(DayCell, [{
		key: 'handleMouseEvent',
		value: function handleMouseEvent(event) {
			event.preventDefault();

			var newState = {};

			switch (event.type) {
				case 'mouseenter':
					newState['hover'] = true;
					break;

				case 'mouseup':
				case 'mouseleave':
					newState['hover'] = false;
					newState['active'] = false;
					break;

				case 'mousedown':
					newState['active'] = true;
					break;
			}

			this.setState(newState);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(event) {
			event.preventDefault();

			this.props.onSelect(this.props.dayMoment);
		}
	}, {
		key: 'getStateStyles',
		value: function getStateStyles() {
			var _state = this.state;
			var hover = _state.hover;
			var active = _state.active;
			var _props = this.props;
			var isSelected = _props.isSelected;
			var isInRange = _props.isInRange;
			var isPassive = _props.isPassive;
			var isToday = _props.isToday;
			var styles = this.styles;

			var hoverStyle = hover ? styles['DayHover'] : {};
			var activeStyle = active ? styles['DayActive'] : {};
			var passiveStyle = isPassive ? styles['DayPassive'] : {};
			var selectedStyle = isSelected ? styles['DaySelected'] : {};
			var todayStyle = isToday ? styles['DayIsToday'] : {};
			var inRangeStyle = isInRange ? styles['DayInRange'] : {};

			return _extends({}, passiveStyle, selectedStyle, todayStyle, activeStyle, inRangeStyle, hoverStyle);
		}
	}, {
		key: 'getClassNames',
		value: function getClassNames() {
			var _props2 = this.props;
			var isSelected = _props2.isSelected;
			var isInRange = _props2.isInRange;
			var isPassive = _props2.isPassive;
			var className = _props2.className;

			var classNames = className;
			classNames = isSelected ? classNames + 'is-selected ' : classNames;
			classNames = isInRange ? classNames + 'is-inRange ' : classNames;
			classNames = isPassive ? classNames + 'is-passive ' : classNames;

			return classNames;
		}
	}, {
		key: 'render',
		value: function render() {
			var styles = this.styles;
			var _props3 = this.props;
			var dayMoment = _props3.dayMoment;
			var cellStyleKey = _props3.cellStyleKey;

			var stateStyle = this.getStateStyles();
			var classNames = this.getClassNames();

			return _react2.default.createElement(
				'span',
				{
					onMouseEnter: this.handleMouseEvent.bind(this),
					onMouseLeave: this.handleMouseEvent.bind(this),
					onMouseDown: this.handleMouseEvent.bind(this),
					onMouseUp: this.handleMouseEvent.bind(this),
					onClick: this.handleSelect.bind(this),
					className: classNames,
					style: _extends({}, styles['Cell'], styles[cellStyleKey], stateStyle) },
				this.props.children
			);
		}
	}]);

	return DayCell;
}(_react.Component);

DayCell.defaultProps = {
	theme: { 'Cell': {} },
	cellStyleKey: 'DayCell'
};

DayCell.propTypes = {
	cellStyleKey: _react.PropTypes.string,
	dayMoment: _react.PropTypes.object.isRequired,
	onSelect: _react.PropTypes.func,
	isSelected: _react.PropTypes.bool,
	isInRange: _react.PropTypes.bool,
	isPassive: _react.PropTypes.bool,
	theme: _react.PropTypes.object
};

exports.default = DayCell;