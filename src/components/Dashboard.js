import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import StopIcon from '@material-ui/icons/Stop'
import Typography from '@material-ui/core/Typography'

import * as TimerActions from '../actions/timer'
import { TimerDisplay } from '../components'
import { STATUSES } from '../constants'
import store from '../store'


/** Timer and its controls */
export class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.timeToDisplay = 0

    this.startFocus = this.startFocus.bind(this)
    this.startBreak = this.startBreak.bind(this)
    this.stopTimer = this.stopTimer.bind(this)

    this.startTest = this.startTest.bind(this)
  }


  startBreak() {
    store.dispatch(TimerActions.startBreak(5 * 60))
  }

  startFocus() {
    store.dispatch(TimerActions.startFocus(25 * 60))
  }

  stopTimer() {
    store.dispatch(TimerActions.stop())
  }


  startTest() {
    store.dispatch(TimerActions.startFocus(1))
  }


  render() {
    const isRunning = this.props.seconds > 0

    if (isRunning) {
      this.timeToDisplay = this.props.seconds
    }

    return <React.Fragment>

      {
        Object.values(STATUSES).map(status => (
          <Collapse in={status === this.props.status} key={status}>
            <Typography variant="display3" gutterBottom>
              {status}
            </Typography>
          </Collapse>
        ))
      }

      <Collapse in={isRunning}>
        <TimerDisplay seconds={this.timeToDisplay} />
      </Collapse>

      <Collapse in={isRunning}>
        <IconButton
          className={this.props.classes.stopButton}
          onClick={this.stopTimer}
          aria-label="Stop"
        >
          <StopIcon />
        </IconButton>
      </Collapse>

      <Collapse in={!isRunning}>
        <Button
          className={this.props.classes.focusButton}
          onClick={this.startFocus}
          size="large"
          variant="contained"
        >
          Focus
        </Button>
        <Button
          className={this.props.classes.breakButton}
          onClick={this.startBreak}
          size="large"
          variant="contained"
        >
          Break
          </Button>

        {document.location.search === '?showTestButton' &&
          <Button
            onClick={this.startTest}
            size="large"
          >
            Test
        </Button>
        }

      </Collapse>

    </React.Fragment>
  }

}


Dashboard.propTypes = {
  /** Material UI Classes */
  classes: PropTypes.object.isRequired,
  /** remaining seconds */
  seconds: PropTypes.number.isRequired,
  /** Timer Status */
  status: PropTypes.string.isRequired
}
