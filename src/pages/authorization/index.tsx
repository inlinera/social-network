import { useState } from 'react'
import s from './index.module.scss'
//COMPONENTS
import { SignUp } from './signUp'
import { SignIn } from './signIn'

export const AuthPage = () => {
  const [isReg, setIsReg] = useState(true)

  return (
    <div className={`${s.authForm} felx aic jcc`}>
      {isReg ? <SignUp setIsReg={setIsReg} /> : <SignIn />}
    </div>
  )
}
