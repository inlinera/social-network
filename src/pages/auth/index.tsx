import { useState } from 'react'
//COMPONENTS
import { AuthEntity } from '@/entities/auth'

export const AuthPage = () => {
  const [isReg, setIsReg] = useState(true)

  return (
    <div className={`flex jcc aic`}>
      <AuthEntity isReg={isReg} setIsReg={setIsReg} />
    </div>
  )
}
