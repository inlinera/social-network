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
  const [birthday, setBirthday] = useState('')
  const [description, setDescription] = useState('')

  // РУТИНА С ТЕГОМ
  const [displayName, setDisplayName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isNumLess = (str: string, min: number) => str.trim().length < min
    const isValidDateFormat = (date: string) => {
      const regex = /^\d{2}-\d{2}-\d{4}$/
      return !regex.test(date)
    }
    const validateString = (str: string) => {
      if (/^\d/.test(str)) {
        alert('Первый символ не может быть числом')
      }

      if (/[^a-zA-Z]/.test(str)) {
        alert('тег содержит недопустимые символы')
      }

      return true
    }
    const formattedTag = useFormatInput(displayName)
    if (
      (isNumLess(useFormatInput(name), 5) ||
        isNumLess(email, 6) ||
        isNumLess(password, 6) ||
        validateString(formattedTag),
      isValidDateFormat(birthday))
    ) {
      return alert('Формат ввода др: dd-mm-yyyy')
    }
    return signUp({ ...nullUser, displayName, email, password, birthday, name })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex aic">
        <InputUi value={name} setVal={setName} placeholder={'Ваше имя...'} maxLength={16} />
        <InputUi
          value={displayName}
          setVal={setDisplayName}
          placeholder={'Желаемый тег...'}
          maxLength={15}
        />
      </div>
      <div className="flex fdc jcc aic">
        <InputUi
          type="email"
          value={email}
          setVal={setEmail}
          placeholder={'Адрес вашей почты...'}
        />
        <InputUi
          type="password"
          value={password}
          setVal={setPassword}
          placeholder={'Ваш пароль...'}
          maxLength={40}
        />
        <InputUi
          type="text"
          value={birthday}
          setVal={setBirthday}
          placeholder={'Дата вашего др...'}
          maxLength={11}
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
