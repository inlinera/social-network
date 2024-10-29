import React from 'react'
import s from './index.module.scss'

interface OrangeButtonUIProps {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const OrangeButtonUI = ({ children, ...params }: OrangeButtonUIProps) => {
  return (
    <button className={`${s.button} cw`} {...params}>
      {children}
    </button>
  )
}
