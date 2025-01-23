import { useState } from 'react'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

export const AuthRegEntity = () => {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  // РУТИНА С ТЕГОМ
  const [tag, setTag] = useState('')
  const [, setIsTagFocused] = useState(false)

  const handleFocus = () => {
    if (!tag.startsWith('@')) {
      setTag('@')
    }
    setIsTagFocused(true)
  }

  const handleBlur = () => {
    if (tag === '@') {
      setTag('')
    }
    setIsTagFocused(false)
  }

  const handleChange = (value: string) => {
    if (value.startsWith('@')) {
      setTag(value)
    } else {
      setTag('@' + value.replace('@', ''))
    }
  }

  return (
    <form>
      <div className="flex aic">
        <InputUi value={name} setVal={setName} placeholder={'Ваше имя...'} maxLength={16} />
        <InputUi
          value={tag}
          setVal={handleChange}
          placeholder={'Желаемый тег...'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={15}
        />
      </div>
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
          maxLength={40}
        />
      </div>
      <RedButtonUI>Зарегистрироваться</RedButtonUI>
    </form>
  )
}
