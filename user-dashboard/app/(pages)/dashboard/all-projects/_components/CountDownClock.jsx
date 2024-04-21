import { useState, useEffect } from 'react'

const CountdownClock = ({ startDate, endDate, currentTime }) => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateRemainingTime(endDate, currentTime))
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate, startDate, currentTime])

  return (
    <div>
      {time.hours} : {time.minutes} : {time.seconds}
    </div>
  )
}

export const calculateRemainingTime = (endDate, currentTime) => {
  if (endDate < currentTime) {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  }

  let remainingTime = Math.max(0, endDate - new Date().getTime())

  const hours = Math.floor(remainingTime / (1000 * 60 * 60))
  remainingTime -= hours * 1000 * 60 * 60

  const minutes = Math.floor(remainingTime / (1000 * 60))
  remainingTime -= minutes * 1000 * 60

  const seconds = Math.floor(remainingTime / 1000)

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

export default CountdownClock
