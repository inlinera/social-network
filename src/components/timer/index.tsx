import { useEffect, useState } from 'react'
import moment from 'moment-timezone'

export const CountdownTimer = () => {
  const targetDate = moment.tz('2025-05-25 00:00', 'Asia/Yekaterinburg')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const calculateTimeLeft = () => {
    const now = moment()
    const duration = moment.duration(targetDate.diff(now))

    setTimeLeft({
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    })
  }

  useEffect(() => {
    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  const declension = (num: number, words: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return words[num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]]
  }

  return (
    <h4>
      {timeLeft.days} {declension(timeLeft.days, ['день', 'дня', 'дней'])} {timeLeft.hours}{' '}
      {declension(timeLeft.hours, ['час', 'часа', 'часов'])} {timeLeft.minutes}{' '}
      {declension(timeLeft.minutes, ['минута', 'минуты', 'минут'])} {timeLeft.seconds}{' '}
      {declension(timeLeft.seconds, ['секунда', 'секунды', 'секунд'])}
    </h4>
  )
}
