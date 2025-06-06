import { ChangeEvent, memo, forwardRef } from 'react'
import s from './index.module.scss'

interface InputUiProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setVal?: (_: string) => void
}

export const InputUi = memo(
  forwardRef<HTMLInputElement, InputUiProps>(({ setVal, maxLength, ...props }: InputUiProps, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!maxLength) return setVal?.(e.target.value)
      if (maxLength && e.target.value.length <= maxLength) {
        return setVal?.(e.target.value)
      }
      navigator.vibrate(50)
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
        ref={ref}
        {...props}
      />
    )
  })
)
