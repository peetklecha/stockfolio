/* eslint-disable react/display-name */
import React from 'react'
import {Snackbar} from '@material-ui/core'
import {Alert} from '@material-ui/lab'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.flag && this.props.flag) {
      this.setState({show: true})
    }
  }

  onClose() {
    if (this.props.onClose) this.props.onClose()
    this.setState({show: false})
  }

  render() {
    return (
      <Snackbar
        open={this.state.show}
        autoHideDuration={3500}
        onClose={this.onClose.bind(this)}
      >
        <Alert severity="error">{this.props.children}</Alert>
      </Snackbar>
    )
  }
}
