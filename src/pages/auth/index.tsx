import { useState } from 'react'
import s from './index.module.scss'
//COMPONENTS
import { SignUp } from './ui/sign-up'
import { SignIn } from './ui/sign-in'

export const AuthPage = () => {
  const [isReg, setIsReg] = useState(true)

  return (
    <div className={`${s.authForm} felx aic jcc`}>
      {isReg ? <SignUp setIsReg={setIsReg} /> : <SignIn />}
    </div>
  )
}
