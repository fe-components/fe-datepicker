import React, { Component, PropTypes } from 'react'
import Datepicker from 'react-datepicker'
import CSSModules from 'react-css-modules'

import 'react-datepicker/dist/react-datepicker.min.css'
import moment from 'moment'
import styles from './index.styl'

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })

export default class extends Component {
  static propTypes = {
    inputWidth: PropTypes.string,
    labelWidth: PropTypes.string,
    formater: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    todayButton: PropTypes.string,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    inputWidth: '200px',
    formater: 'YYYY-MM-DD HH:mm:ss',
    value: '',
    todayButton: '今日',
    clearable: true
  }
  state = {
    format: this.props.formater.split(' ')[0].toUpperCase(),
    formatTime: this.props.formater.split(' ')[1],
    timeAfterParse: '',
    firstBlur: true
  }
  componentDidMount () {
    if (this.props.autofocus) {
      this.refs.datepicker.refs.input.focus()
    }
  }
  handleChange (v) {
    let e = {}
    e.target = {value: this.state.formatTime ? v.format(this.state.format) + ' ' + (this.props.value.split(' ')[1] || '00:00:00') : v.format(this.state.format)}
    this.props.onChange(e)
  }
  handleBlur (e) {
    if (typeof this.props.onBlur === 'function') {
      let inputValue = e.target.value
      let timepicker = this.refs.timepicker
      let newE
      if (this.state.formatTime) {
        newE = {target: {value: inputValue + (this.props.value.split(' ')[1] ? (' ' + this.props.value.split(' ')[1]) : '')}}
      } else {
        newE = {target: {value: inputValue}}
      }
      setTimeout(() => {
        if (timepicker !== document.activeElement) {
          this.props.onBlur(newE)
        }
      })
    }
  }
  handleTimeChange (e) {
    let inputValue = e.target.value
    let newE = {}
    let timeAfterParse = moment(inputValue, this.state.formatTime).format(this.state.formatTime)
    let value = this.props.value.split(' ')[1] ? inputValue : (timeAfterParse === 'Invalid date' ? '00:00:00' : timeAfterParse)
    newE.target = {}
    newE.target.value = (this.props.value.split(' ')[0] || moment(new Date()).format(this.state.format)) + ' ' + value
    this.props.onChange(newE)
    if (this.state.firstBlur) {
      this.setState({firstBlur: false})
    }
  }

  parseTime (e) {
    let inputValue = e.target.value
    if (inputValue || !this.state.firstBlur) {
      let timeAfterParse = moment(inputValue, this.state.formatTime).format(this.state.formatTime)
      if (timeAfterParse === 'Invalid date') {
        this.handleTimeChange({target: {value: this.state.lastCorrectTime}})
      } else {
        this.handleTimeChange({target: {value: timeAfterParse}})
        this.setState({lastCorrectTime: timeAfterParse})
      }
    }
    if (typeof this.props.onBlur === 'function') {
      let newE = {}
      let value = inputValue
      newE.target = {}
      newE.target.value = this.props.value.split(' ')[0] + (value ? (' ' + value) : '')
      let datepicker = this.refs.datepicker.refs.input.refs.input
      setTimeout(() => {
        if (datepicker !== document.activeElement) {
          this.props.onBlur(newE)
        }
      })
    }
  }

  handleClear = () => {
    this.props.onChange({target: {value: ''}})
    this.setState({firstBlur: true})
  }

  render () {
    return (
      <div styleName='Datepicker'>
        <label styleName='outer'>
          {
            this.props.label
            ? <span styleName='label' style={Object.assign({}, {width: this.props.labelWidth})}>{this.props.label}</span>
            : <span></span>
          }
          <div styleName='container' style={Object.assign({}, {width: this.props.inputWidth})}>
            <div>
              <Datepicker
                ref='datepicker'
                {...this.props}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                dateFormat={this.state.format}
                selected={this.props.value ? moment(this.props.value.split(' ')[0]) : null} />
              {
                this.state.formatTime ? <div>
                  <input ref='timepicker' onBlur={this.parseTime.bind(this)} disabled={this.props.disabled} type='text' styleName='timeInput' value={this.props.value.split(' ')[1] || ''} onChange={this.handleTimeChange.bind(this)} />
                </div>
                : null
              }
            </div>
          </div>
          {
            this.props.clearable
            ? <span styleName='clearButton' onClick={this.handleClear}>&times;</span>
            : null
          }
        </label>
      </div>
    )
  }
}
