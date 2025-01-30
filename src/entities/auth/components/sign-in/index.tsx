import { useState } from 'react'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import { observer } from 'mobx-react-lite'

export const AuthLoginEntity = observer(() => {
  const { signIn } = authApi
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn(mail, password)
  }
  return (
    <form onSubmit={handleSumbit}>
      <div className="flex fdc jcc aic">
        <InputUi
          type="email"
          value={mail}
          setVal={setMail}
          placeholder={'Адрес вашей почты...'}
        />
        <InputUi
          type="password"
          value={password}
          setVal={setPassword}
          placeholder={'Ваш пароль...'}
        />
      </div>
      <RedButtonUI>Войти</RedButtonUI>
    </form>
  )
})
