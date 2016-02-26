import React, { Component, PropTypes } from 'react'

class DayCell extends Component {

	constructor(props) {
		super(props)

		this.state = {
			hover		 : false,
			active		: false
		}

		this.styles = props.theme
	}

	handleMouseEvent(event) {
		event.preventDefault()

		const newState = {}

		switch (event.type) {
			case 'mouseenter':
				newState['hover'] = true
				break

			case 'mouseup':
			case 'mouseleave':
				newState['hover'] = false
				newState['active'] = false
				break

			case 'mousedown':
				newState['active'] = true
				break
		}

		this.setState(newState)
	}

	handleSelect(event) {
		event.preventDefault()

		this.props.onSelect(this.props.dayMoment)
	}

	getStateStyles() {
		const { hover, active } = this.state
		const { isSelected, isInRange, isPassive, isToday } = this.props
		const { styles } = this

		const hoverStyle		 = hover ? styles['DayHover'] : {}
		const activeStyle		= active ? styles['DayActive'] : {}
		const passiveStyle	 = isPassive ? styles['DayPassive'] : {}
		const selectedStyle	= isSelected ? styles['DaySelected'] : {}
		const todayStyle	= isToday ? styles['DayIsToday'] : {}
		const inRangeStyle	 = isInRange ? styles['DayInRange'] : {}

		return {
			...passiveStyle,
			...selectedStyle,
			...todayStyle,
			...activeStyle,
			...inRangeStyle,
			...hoverStyle
		}
	}

	getClassNames() {
		const { isSelected, isInRange, isPassive, className } = this.props

		let classNames = className
		classNames = (isSelected) ? classNames + 'is-selected ' : classNames
		classNames = (isInRange) ? classNames + 'is-inRange ' : classNames
		classNames = (isPassive) ? classNames + 'is-passive ' : classNames

		return classNames
	}

	render() {
		const { styles } = this
		const { dayMoment, cellStyleKey } = this.props
		const stateStyle = this.getStateStyles()
		const classNames = this.getClassNames()

		return (
			<span
				onMouseEnter={ this.handleMouseEvent.bind(this) }
				onMouseLeave={ this.handleMouseEvent.bind(this) }
				onMouseDown={ this.handleMouseEvent.bind(this) }
				onMouseUp={ this.handleMouseEvent.bind(this) }
				onClick={ this.handleSelect.bind(this) }
				className={ classNames }
				style={{...styles['Cell'], ...styles[cellStyleKey], ...stateStyle}}>
				{ this.props.children }
			</span>
		)
	}
}

DayCell.defaultProps = {
	theme: { 'Cell' : {} },
	cellStyleKey: 'DayCell'
}

DayCell.propTypes = {
	cellStyleKey: PropTypes.string,
	dayMoment : PropTypes.object.isRequired,
	onSelect : PropTypes.func,
	isSelected : PropTypes.bool,
	isInRange : PropTypes.bool,
	isPassive : PropTypes.bool,
	theme : PropTypes.object
}

export default DayCell