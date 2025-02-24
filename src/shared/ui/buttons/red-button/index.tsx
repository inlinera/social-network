import { memo } from 'react'
import s from './index.module.scss'

interface RedButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const RedButtonUI = memo(({ children, ...params }: RedButtonUIProps) => {
  return (
    <button className={`${s.button} cw`} {...params}>
      {children}
    </button>
  )
})
