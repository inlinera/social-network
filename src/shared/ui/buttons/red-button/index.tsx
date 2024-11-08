import React from 'react'
import s from './index.module.scss'

interface RedButtonUIProps {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const RedButtonUI = ({ children, ...params }: RedButtonUIProps) => {
  return (
    <button className={`${s.button} cw`} {...params}>
      {children}
    </button>
  )
}
