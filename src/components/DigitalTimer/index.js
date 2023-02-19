// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitValue: 25,
    isStart: false,
    isReset: true,
    timeElapsed: 0,
  }

  onToggleTimer = () => {
    const {isStart} = this.state
    if (isStart) {
      clearInterval(this.timeId)
      return this.setState({isStart: false})
    }
    this.timeId = setInterval(this.isTimeELapsed, 1000)
    return this.timeId
  }

  onResetTimer = () => {
    clearInterval(this.timeId)
    this.setState({
      timeElapsed: 0,
      timerLimitValue: 25,
      isStart: false,
      isReset: true,
    })
  }

  isTimeELapsed = () => {
    const {timeElapsed, timerLimitValue} = this.state
    const timeDiff = timerLimitValue * 60 - timeElapsed
    if (timeDiff === 0) {
      clearInterval(this.timeId)
      return this.setState({
        isStart: false,
        timerLimitValue: 25,
        timeElapsed: 0,
        isReset: true,
      })
    }
    return this.setState(prevState => ({
      timeElapsed: prevState.timeElapsed + 1,
      isStart: true,
      isReset: false,
    }))
  }

  onIncSetVal = () => {
    const {isReset} = this.state
    if (isReset) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue + 1,
      }))
    }
  }

  onDecSetVal = () => {
    const {isReset} = this.state
    if (isReset) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue - 1,
      }))
    }
  }

  render() {
    const {isStart, timerLimitValue, timeElapsed} = this.state
    const minutes = Math.floor((timerLimitValue * 60 - timeElapsed) / 60)
    const seconds = Math.floor((timerLimitValue * 60 - timeElapsed) % 60)
    const min = minutes < 10 ? `0${minutes}` : minutes
    const sec = seconds < 10 ? `0${seconds}` : seconds
    const time = `${min}:${sec}`
    const statusText = isStart ? 'Running' : 'Paused'
    const url = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isStart ? 'pause icon' : 'play icon'
    const buttonType = isStart ? 'Pause' : 'Start'

    return (
      <div className="app-container">
        <h1 className="digital-timer">Digital Timer</h1>
        <div className="timer-app-container">
          <div className="timer-elapsed-container">
            <div className="timer-card">
              <h1 className="time-value">{time}</h1>
              <p className="timer-status">{statusText}</p>
            </div>
          </div>
          <div className="timer-start-reset-container">
            <div className="start-reset-container">
              <div className="pause-container">
                <button
                  type="button"
                  onClick={this.onToggleTimer}
                  className="buttons"
                >
                  <img src={url} alt={altText} className="play-image" />
                  <p>{buttonType}</p>
                </button>
              </div>
              <div className="reset-container">
                <button
                  type="button"
                  onClick={this.onResetTimer}
                  className="buttons"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-image"
                  />
                  <p className="reset">Reset</p>
                </button>
              </div>
            </div>
            <p>Set Timer limit</p>
            <div className="timer-limit-container">
              <button
                type="button"
                className="symbol"
                onClick={this.onDecSetVal}
              >
                -
              </button>
              <p className="timer-limit">{timerLimitValue}</p>
              <button
                type="button"
                className="symbol"
                onClick={this.onIncSetVal}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
