import { ChangeEvent } from 'react'
import s from './index.module.scss'

interface InputUiProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setVal: (_: string) => void
}

export const InputUi = ({ setVal, maxLength, ...props }: InputUiProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length < maxLength) {
      setVal(e.target.value)
    } else {
      navigator.vibrate(50)
      alert(`Максимально допустимое кол-во символов в данном поле: ${maxLength! - 1}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Backspace' || e.key == 'Delete') {
      return
    }
  }

  return (
    <input
      className={`${s['input-ui']}`}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      maxLength={maxLength}
      {...props}
    />
  )
}
