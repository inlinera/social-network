import { useState } from 'react'
import s from './index.module.scss'
//COMPONENTS
import { AuthEntity } from '@/entities/auth'

export const AuthPage = () => {
  const [isReg, setIsReg] = useState(true)

  return (
    <div className={`${s.authForm} flex aic jcc`}>
      <AuthEntity isReg={isReg} setIsReg={setIsReg} />
    </div>
  )
}
