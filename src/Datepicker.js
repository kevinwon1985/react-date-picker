import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Calendar from './Calendar'
import getTheme from './styles'
import { VIEWMODE, SELECTMODE } from './constants'

class ParaDatepicker extends Component {
    constructor(props) {
        super(props)

        this.oldSelectMode = props.selectMode

        let { value, theme } = props

        this.state = {
            value,
            formattedDate: ''
        }

        this.styles = getTheme(theme)
        this.handleCalendarClick = this.handleCalendarClick.bind(this)
        this.handleBodyClick = this.handleBodyClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        let { value, selectMode } = nextProps
        if (value !== undefined || (this.oldSelectMode != selectMode && value === undefined)) {
            this.setState({ value })
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
        let { className, placeholder, selectMode, theme } = this.props
        let { value, isOpen } = this.state
        const formattedDate = this.getFormattedDate()
        const dropdownSty = {
            ...styles['Dropdown'],
            display: isOpen?'block':'none'
        };
        console.log(styles)
		const clearButton=styles['ClearButton']
        return (
            <div style={styles['Datepicker']}>
                <div className="input-group"
                    onClick={this.toggleClickHandle.bind(this)}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={formattedDate}/>
                    <span className="input-group-clear" style={clearButton}>
                    </span>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <div style={dropdownSty} ref="calendarContainer">
                    <Calendar
                        selectMode={selectMode}
                        dates={value}
                        theme={theme}
                        onChange={this.handleSelectDate.bind(this)} />
                </div>
            </div>
        )
    }
    
    handleCalendarClick() {
        clearTimeout(this.hidenTimer)
    }

    handleBodyClick() {
        if (this.state.isOpen) {
            this.hidenTimer = setTimeout(()=>this.setState({ isOpen: false }), 50)
        }
        document.removeEventListener('click', this.handleBodyClick)
    }

    handleSelectDate(value) {
        let { selectMode, onChange } = this.props

        this.setState({ value, isOpen: false })

        onChange(value)
    }

    toggleClickHandle(e) {
    	if(e.target.className=='input-group-clear'){
    		let {onChange}=this.props
    		this.setState({ 
    			isOpen: false
    		   ,value:null
    		})
    		onChange(null)
    	}else{
    		this.setState({ isOpen: true })
    	}
        
    }
	
	
	clearDate(){
		
	}
	
    getFormattedDate() {
        let { format, selectMode } = this.props
        let { value } = this.state
        let range

        let formattedDate
        switch (selectMode) {
            case SELECTMODE.DATE:
                return value ? moment(value).format(format) : ''
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
    minDate: DatePropType,
    maxDate: DatePropType,
    theme: PropTypes.object,
    value: DatePropType,
    format: PropTypes.string,
    placeholder: PropTypes.string,
    selectMode: PropTypes.oneOf([
        SELECTMODE.TIME,
        SELECTMODE.DATE,
        SELECTMODE.DATES,
        SELECTMODE.WEEK,
        SELECTMODE.MONTH,
        SELECTMODE.YEAR
    ]),
}

export default ParaDatepicker