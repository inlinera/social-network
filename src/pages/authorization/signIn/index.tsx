import { useState } from 'react'
import { observer } from "mobx-react-lite"
import s from '@/pages/authorization/_styles/index.module.scss'
//MOBX
import AuthorizationStore from '@/shared/store/auth-api' 
//COMPONENTS
import { Button, Input } from 'antd'

export const SignIn = observer(() => {
  const { signIn, error } = AuthorizationStore

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await signIn(userData.email, userData.password)
    setUserData({
      email: '',
      password: ''
    })
  }

  return (
    <div className={`${s.signForm} jcc aic tac grid`}>
      Sign In
      <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <Button type='primary' onClick={handleSubmit}>Sign In</Button>
      </form>
      {error && error}
    </div>
  )})
