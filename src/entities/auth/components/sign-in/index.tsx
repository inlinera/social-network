import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'

export interface ILogin {
  email: string
  password: string
}

export const AuthLoginEntity = observer(() => {
  const { signIn } = authApi

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILogin>({ mode: 'onChange' })

  const submit: SubmitHandler<ILogin> = data => {
    signIn(data.email, data.password)
  }

  const emailErr = errors.email?.message
  const passErr = errors.password?.message

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setValue(e.target.name as keyof ILogin, value)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex fdc jcc aic">
        <div className="flex fdc">
          <InputUi
            type="email"
            placeholder={'Адрес вашей почты...'}
            {...register('email', {
              required: 'Это поле необходимо для заполнения',
              minLength: {
                value: 8,
                message: 'Почта должна содержать минимум 8 символов',
              },
              maxLength: {
                value: 40,
                message: 'Почта не должна превышать 40 символов',
              },
            })}
            onBlur={handleBlur}
          />
          {emailErr && <p>{emailErr}</p>}
        </div>
        <div className="flex fdc">
          <InputUi
            type="password"
            placeholder={'Ваш пароль...'}
            {...register('password', {
              required: 'Это поле необходимо для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов',
              },
              maxLength: {
                value: 30,
                message: 'Пароль не должен превышать 30 символов',
              },
            })}
            onBlur={handleBlur}
          />
          {passErr && <p>{passErr}</p>}
        </div>
      </div>
      <RedButtonUI>Войти</RedButtonUI>
    </form>
  )
})
