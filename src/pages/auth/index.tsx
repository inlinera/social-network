import { useState } from 'react'
//COMPONENTS
import { AuthEntity } from '@/entities/auth'
import { setTitle } from '@/shared/constants/setTitle'

const AuthPage = () => {
  const [isReg, setIsReg] = useState(true)
  setTitle('authentication')

  return (
    <div className={`flex jcc aic`}>
      <AuthEntity isReg={isReg} setIsReg={setIsReg} />
    </div>
  )
}

export default AuthPage
