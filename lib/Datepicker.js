'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParaDatepicker = function (_Component) {
    _inherits(ParaDatepicker, _Component);

    function ParaDatepicker(props) {
        _classCallCheck(this, ParaDatepicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ParaDatepicker).call(this, props));

        _this.oldSelectMode = props.selectMode;

        var value = props.value;
        var theme = props.theme;


        _this.state = {
            value: value,
            formattedDate: ''
        };

        _this.styles = (0, _styles2.default)(theme);
        _this.handleCalendarClick = _this.handleCalendarClick.bind(_this);
        _this.handleBodyClick = _this.handleBodyClick.bind(_this);
        return _this;
    }

    _createClass(ParaDatepicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            var selectMode = nextProps.selectMode;

            if (value !== undefined || this.oldSelectMode != selectMode && value === undefined) {
                this.setState({ value: value });
            }

            if (this.oldSelectMode != selectMode) {
                this.oldSelectMode = selectMode;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.calendarContainer.addEventListener('click', this.handleCalendarClick, true);
            document.addEventListener('click', this.handleBodyClick, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.calendarContainer.removeEventListener('click', this.handleCalendarClick);
            document.removeEventListener('click', this.handleBodyClick);
        }
    }, {
        key: 'render',
        value: function render() {
            var styles = this.styles;
            var _props = this.props;
            var className = _props.className;
            var placeholder = _props.placeholder;
            var selectMode = _props.selectMode;
            var theme = _props.theme;
            var _state = this.state;
            var value = _state.value;
            var isOpen = _state.isOpen;

            var formattedDate = this.getFormattedDate();
            var dropdownSty = _extends({}, styles['Dropdown'], {
                display: isOpen ? 'block' : 'none'
            });
            console.log(styles);
            var clearButton = styles['ClearButton'];
            return _react2.default.createElement(
                'div',
                { style: styles['Datepicker'], __self: this
                },
                _react2.default.createElement(
                    'div',
                    { className: 'input-group',
                        onClick: this.toggleClickHandle.bind(this), __self: this
                    },
                    _react2.default.createElement('input', {
                        type: 'text',
                        className: 'form-control',
                        placeholder: placeholder,
                        value: formattedDate, __self: this
                    }),
                    _react2.default.createElement('span', { className: 'input-group-clear', style: clearButton, __self: this
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'input-group-addon', __self: this
                        },
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-calendar', __self: this
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: dropdownSty, ref: 'calendarContainer', __self: this
                    },
                    _react2.default.createElement(_Calendar2.default, {
                        selectMode: selectMode,
                        dates: value,
                        theme: theme,
                        onChange: this.handleSelectDate.bind(this), __self: this
                    })
                )
            );
        }
    }, {
        key: 'handleCalendarClick',
        value: function handleCalendarClick() {
            clearTimeout(this.hidenTimer);
        }
    }, {
        key: 'handleBodyClick',
        value: function handleBodyClick() {
            var _this2 = this;

            if (this.state.isOpen) {
                this.hidenTimer = setTimeout(function () {
                    return _this2.setState({ isOpen: false });
                }, 50);
            }
            document.removeEventListener('click', this.handleBodyClick);
        }
    }, {
        key: 'handleSelectDate',
        value: function handleSelectDate(value) {
            var _props2 = this.props;
            var selectMode = _props2.selectMode;
            var onChange = _props2.onChange;


            this.setState({ value: value, isOpen: false });

            onChange(value);
        }
    }, {
        key: 'toggleClickHandle',
        value: function toggleClickHandle(e) {
            if (e.target.className == 'input-group-clear') {
                var onChange = this.props.onChange;

                this.setState({
                    isOpen: false,
                    value: null
                });
                onChange(null);
            } else {
                this.setState({ isOpen: true });
            }
        }
    }, {
        key: 'clearDate',
        value: function clearDate() {}
    }, {
        key: 'getFormattedDate',
        value: function getFormattedDate() {
            var _props3 = this.props;
            var format = _props3.format;
            var selectMode = _props3.selectMode;
            var value = this.state.value;

            var range = void 0;

            var formattedDate = void 0;
            switch (selectMode) {
                case _constants.SELECTMODE.DATE:
                    return value ? (0, _moment2.default)(value).format(format) : '';
                case _constants.SELECTMODE.WEEK:
                    return value ? value.clone().startOf('week').format(format) + ' ~ ' + value.clone().endOf('week').format(format) : '';
                case _constants.SELECTMODE.DATES:
                    return value ? (0, _moment2.default)(value.startDate).format(format) + ' ~ ' + (0, _moment2.default)(value.endDate).format(format) : '';
                case _constants.SELECTMODE.MONTH:
                    return value ? (0, _moment2.default)(value).format('YYYY-MM') : '';
                case _constants.SELECTMODE.YEAR:
                    return value ? (0, _moment2.default)(value).format('YYYY') : '';
            }
        }
    }]);

    return ParaDatepicker;
}(_react.Component);

ParaDatepicker.defaultProps = {
    className: '',
    placeholder: '',
    format: 'L',
    selectMode: _constants.SELECTMODE.DATE
};

var DatePropType = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]);
ParaDatepicker.propTypes = {
    minDate: DatePropType,
    maxDate: DatePropType,
    theme: _react.PropTypes.object,
    value: DatePropType,
    format: _react.PropTypes.string,
    placeholder: _react.PropTypes.string,
    selectMode: _react.PropTypes.oneOf([_constants.SELECTMODE.TIME, _constants.SELECTMODE.DATE, _constants.SELECTMODE.DATES, _constants.SELECTMODE.WEEK, _constants.SELECTMODE.MONTH, _constants.SELECTMODE.YEAR])
};

exports.default = ParaDatepicker;