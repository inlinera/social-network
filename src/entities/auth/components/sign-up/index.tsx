import { useState } from 'react'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { nullUser } from '@/shared/data/null-user'

export const AuthRegEntity = () => {
  const { signUp } = authApi
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')

  // РУТИНА С ТЕГОМ
  const [displayName, setDisplayName] = useState('')

  const validateString = (str: string) => {
    if (/^\d/.test(str)) {
      alert('Первый символ в теге не может быть числом')
    }

    if (/[^a-zA-Z]/.test(str)) {
      alert('тег содержит недопустимые символы')
    }

    return true
  }

  const isNumLess = (str: string, min: number) => str.trim().length < min

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formattedTag = useFormatInput(displayName)
    const nameValid = !isNumLess(name, 5)
    const emailValid = !isNumLess(email, 6)
    const passwordValid = !isNumLess(password, 6)
    const tagValid = validateString(formattedTag)

    if (!nameValid || !emailValid || !passwordValid || !tagValid) {
      return alert('Что-то у тя🦆 не так')
    }
    signUp({ ...nullUser, displayName, email, password, name })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex aic">
        <InputUi value={name} setVal={setName} placeholder={'Ваше имя...'} maxLength={16} />
        <InputUi value={displayName} setVal={setDisplayName} placeholder={'Желаемый тег...'} maxLength={15} />
      </div>
      <div className="flex fdc jcc aic">
        <InputUi type="email" value={email} setVal={setEmail} placeholder={'Адрес вашей почты...'} />
        <InputUi
          type="password"
          value={password}
          setVal={setPassword}
          placeholder={'Ваш пароль...'}
          maxLength={40}
        />
        <InputUi
          type="text"
          value={description}
          setVal={setDescription}
          placeholder={'Ваше описание..'}
          maxLength={101}
        />
      </div>
      <RedButtonUI>Зарегистрироваться</RedButtonUI>
    </form>
  )
}
