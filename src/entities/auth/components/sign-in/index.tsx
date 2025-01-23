import { useState } from 'react'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

export const AuthLoginEntity = () => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form>
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
}
