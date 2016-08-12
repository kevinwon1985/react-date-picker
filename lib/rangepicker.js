'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        var rangeStartdate = props.rangeStartdate;
        var rangeEnddate = props.rangeEnddate;
        var theme = props.theme;


        _this.state = {
            rangeStartdate: rangeStartdate,
            rangeEnddate: null,
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
            var rangeStartdate = nextProps.rangeStartdate;
            var rangeEnddate = nextProps.rangeEnddate;
            var selectMode = nextProps.selectMode;

            if (rangeStartdate !== undefined && rangeEnddate !== undefined || this.oldSelectMode != selectMode && rangeStartdate === undefined && rangeEnddate === undefined) {
                this.setState({ rangeStartdate: rangeStartdate, rangeEnddate: rangeEnddate });
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
            var id = _props.id;
            var _state = this.state;
            var rangeStartdate = _state.rangeStartdate;
            var rangeEnddate = _state.rangeEnddate;
            var isOpen = _state.isOpen;

            var formattedDate = this.getFormattedDate();
            var dropdownSty = {
                display: isOpen ? 'block' : 'none'
            };
            return _react2.default.createElement(
                'div',
                { style: styles['Datepicker'] },
                _react2.default.createElement(
                    'div',
                    { className: 'input-group',
                        onClick: this.toggleClickHandle.bind(this) },
                    _react2.default.createElement('input', {
                        type: 'text',
                        className: 'form-control',
                        placeholder: placeholder,
                        value: formattedDate }),
                    _react2.default.createElement(
                        'span',
                        { className: 'input-group-addon' },
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-calendar' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: dropdownSty, ref: 'calendarContainer' },
                    _react2.default.createElement(_Calendar2.default, {
                        selectMode: selectMode,
                        viewMode: _constants.VIEWMODE.MONTH,
                        rangeMindate: rangeStartdate,
                        rangeMaxdate: rangeEnddate,
                        onChange: this.handleSelectDate.bind(this)
                    }),
                    _react2.default.createElement(_Calendar2.default, {
                        selectMode: selectMode,
                        viewMode: _constants.VIEWMODE.MONTH,
                        rangeMindate: rangeStartdate,
                        rangeMaxdate: rangeEnddate,
                        onChange: this.handleSelectDate.bind(this)
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
            var onChange = this.props.onChange;
            var _state2 = this.state;
            var rangeStartdate = _state2.rangeStartdate;
            var rangeEnddate = _state2.rangeEnddate;

            if (this.secondValue) {
                this.firstValue = value;
                this.setState({
                    rangeStartdate: this.firstValue,
                    rangeEnddate: this.firstValue
                });
                this.secondValue = undefined;
            } else if (!this.firstValue) {
                this.firstValue = value;
                this.setState({
                    rangeStartdate: this.firstValue,
                    rangeEnddate: this.firstValue
                });
            } else {
                this.secondValue = value;
                if (this.firstValue > this.secondValue) {
                    this.setState({
                        rangeStartdate: this.secondValue,
                        rangeEnddate: this.firstValue
                    });
                } else {
                    this.setState({
                        rangeStartdate: this.firstValue,
                        rangeEnddate: this.secondValue
                    });
                }
            }
            onChange(rangeStartdate, rangeEnddate);
            if (this.firstValue && this.secondValue) {
                this.setState({ isOpen: false });
            }
        }
    }, {
        key: 'toggleClickHandle',
        value: function toggleClickHandle(e) {
            this.setState({ isOpen: true });
        }
    }, {
        key: 'getFormattedDate',
        value: function getFormattedDate() {
            var _props2 = this.props;
            var format = _props2.format;
            var selectMode = _props2.selectMode;
            var _state3 = this.state;
            var rangeStartdate = _state3.rangeStartdate;
            var rangeEnddate = _state3.rangeEnddate;
            var value = _state3.value;

            var range = void 0;
            var formattedDate = void 0;
            switch (selectMode) {
                case _constants.SELECTMODE.DATEX:
                    return rangeStartdate ? (0, _moment2.default)(rangeStartdate).format(format) + ' ~ ' + (0, _moment2.default)(rangeEnddate).format(format) : '';
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
    rangeMindate: DatePropType,
    rangeMaxdate: DatePropType,
    minDate: DatePropType,
    maxDate: DatePropType,
    theme: _react.PropTypes.object,
    firstValue: DatePropType,
    secondValue: DatePropType,
    rangeStartdate: DatePropType,
    rangeEnddate: DatePropType,
    value: DatePropType,
    startDate: DatePropType,
    endDate: DatePropType,
    format: _react.PropTypes.string,
    placeholder: _react.PropTypes.string,
    selectMode: _react.PropTypes.oneOf([_constants.SELECTMODE.TIME, _constants.SELECTMODE.DATE, _constants.SELECTMODE.DATEX, _constants.SELECTMODE.DATES, _constants.SELECTMODE.WEEK, _constants.SELECTMODE.MONTH, _constants.SELECTMODE.YEAR])
};

exports.default = ParaDatepicker;