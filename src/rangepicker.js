import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Calendar from './Calendar'
import getTheme from './styles'
import { VIEWMODE, SELECTMODE } from './constants'

class ParaDatepicker extends Component {
    constructor(props) {
        super(props)

        this.oldSelectMode = props.selectMode

        let { rangeStartdate, rangeEnddate, theme } = props

        this.state = {
            rangeStartdate,
            rangeEnddate: null,
            formattedDate: ''
        }

        this.styles = getTheme(theme)
        this.handleCalendarClick = this.handleCalendarClick.bind(this)
        this.handleBodyClick = this.handleBodyClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        let { rangeStartdate, rangeEnddate, selectMode } = nextProps
        if ((rangeStartdate !== undefined) && (rangeEnddate !== undefined) || (this.oldSelectMode != selectMode && rangeStartdate === undefined && rangeEnddate === undefined)) {
            this.setState({ rangeStartdate, rangeEnddate })
        }

        if (this.oldSelectMode != selectMode) {
            this.oldSelectMode = selectMode
        }
    }
    componentDidMount() {
        this.refs.calendarContainer.addEventListener('click', this.handleCalendarClick, true)
        document.addEventListener('click', this.handleBodyClick, true)
    }

    componentWillUnmount() {
        this.refs.calendarContainer.removeEventListener('click', this.handleCalendarClick)
        document.removeEventListener('click', this.handleBodyClick)
    }

    render() {
        const { styles } = this
        let { className, placeholder, selectMode, theme, id} = this.props
        let { rangeStartdate, rangeEnddate, isOpen } = this.state
        const formattedDate = this.getFormattedDate()
        const dropdownSty = {
            display: isOpen ? 'block' : 'none'
        }
        return (
            <div style={styles['Datepicker']}>
                <div className="input-group"
                    onClick={this.toggleClickHandle.bind(this) }>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={formattedDate}/>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <div style={dropdownSty} ref="calendarContainer">
                    <Calendar
                        selectMode={selectMode}
                        viewMode={VIEWMODE.MONTH}
                        rangeMindate={rangeStartdate}
                        rangeMaxdate={rangeEnddate}
                        onChange={this.handleSelectDate.bind(this) }
                        />
                    <Calendar
                        selectMode={selectMode}
                        viewMode={VIEWMODE.MONTH}
                        rangeMindate={rangeStartdate}
                        rangeMaxdate={rangeEnddate}
                        onChange={this.handleSelectDate.bind(this) }
                        />
                </div>
            </div>
        )
    }
    handleCalendarClick() {
        clearTimeout(this.hidenTimer)
    }
    handleBodyClick() {
        if (this.state.isOpen) {
            this.hidenTimer = setTimeout(() => this.setState({ isOpen: false }), 50)
        }
        document.removeEventListener('click', this.handleBodyClick)
    }
    handleSelectDate(value) {
        let { onChange } = this.props
        const {rangeStartdate, rangeEnddate} = this.state
        if (this.secondValue) {
            this.firstValue = value;
            this.setState({
                rangeStartdate: this.firstValue,
                rangeEnddate: this.firstValue
            })
            this.secondValue = undefined
        }
        else if (!this.firstValue) {
            this.firstValue = value;
            this.setState({
                rangeStartdate: this.firstValue,
                rangeEnddate: this.firstValue
            })
        } else {
            this.secondValue = value;
            if (this.firstValue > this.secondValue) {
                this.setState({
                    rangeStartdate: this.secondValue,
                    rangeEnddate: this.firstValue
                })
            } else {
                this.setState({
                    rangeStartdate: this.firstValue,
                    rangeEnddate: this.secondValue
                })
            }
        }
        onChange(rangeStartdate, rangeEnddate)
        if ((this.firstValue) && (this.secondValue)) {
            this.setState({ isOpen: false })
        }
    }
    toggleClickHandle(e) {
        this.setState({ isOpen: true })

    }

    getFormattedDate() {
        let { format, selectMode} = this.props
        let { rangeStartdate, rangeEnddate, value } = this.state
        let range
        let formattedDate
        switch (selectMode) {
            case SELECTMODE.DATEX:
                return rangeStartdate ? moment(rangeStartdate).format(format) +
                    ' ~ ' + moment(rangeEnddate).format(format) : ''
            case SELECTMODE.WEEK:
                return value ? value.clone().startOf('week').format(format) +
                    ' ~ ' + value.clone().endOf('week').format(format) : ''
            case SELECTMODE.DATES:
                return value ? moment(value.startDate).format(format) +
                    ' ~ ' + moment(value.endDate).format(format) : ''
            case SELECTMODE.MONTH:
                return value ? moment(value).format('YYYY-MM') : ''
            case SELECTMODE.YEAR:
                return value ? moment(value).format('YYYY') : ''
        }
    }

}
ParaDatepicker.defaultProps = {
    className: '',
    placeholder: '',
    format: 'L',
    selectMode: SELECTMODE.DATE
}
let DatePropType = PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
ParaDatepicker.propTypes = {
    rangeMindate:DatePropType,
    rangeMaxdate:DatePropType,
    minDate: DatePropType,
    maxDate: DatePropType,
    theme: PropTypes.object,
    firstValue: DatePropType,
    secondValue: DatePropType,
    rangeStartdate: DatePropType,
    rangeEnddate: DatePropType,
    value: DatePropType,
    startDate: DatePropType,
    endDate: DatePropType,
    format: PropTypes.string,
    placeholder: PropTypes.string,
    selectMode: PropTypes.oneOf([
        SELECTMODE.TIME,
        SELECTMODE.DATE,
        SELECTMODE.DATEX,
        SELECTMODE.DATES,
        SELECTMODE.WEEK,
        SELECTMODE.MONTH,
        SELECTMODE.YEAR
    ]),
}

export default ParaDatepicker