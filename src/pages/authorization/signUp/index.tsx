import { FC, useState } from "react"
import s from '@/pages/authorization/_styles/index.module.scss'
import { observer } from "mobx-react-lite"
//MOBX
import AuthorizationStore from '@/shared/store/auth-api'
//COMPONENTS
import { Button, Input } from 'antd'
//DATA
import { nullUser } from "@/shared/data/null-user"

interface SignUpProps {
  setIsReg: (isReg: boolean) => void
}

export const SignUp: FC<SignUpProps> = observer(({setIsReg}) => {
  const { signUp, errorReg } = AuthorizationStore

  const { TextArea } = Input

  const [userData, setUserData] = useState(nullUser)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await signUp(userData)
    setUserData(nullUser)
  }

  return (
    <div className={`${s.signForm} jcc aic tac grid`}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            placeholder="name"
            value={userData.displayName}
            onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <TextArea
            placeholder="description"
            maxLength={200}
            value={userData.description}
            onChange={(e) => setUserData({ ...userData, description: e.target.value })}
            style={{ height: 120, resize: 'none' }}
          />
        </div>
        <Button type="primary" onClick={handleSubmit}>Sign Up</Button>
      </form>
      <button onClick={() => setIsReg(false)}>I'm already have account</button>
      {errorReg && errorReg}
    </div>
  )
})
