import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import { email, handleBlur, password } from '@/shared/data/hook-form'

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

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex fdc jcc aic">
        <div className="flex fdc">
          <InputUi
            type="email"
            placeholder={'Адрес вашей почты...'}
            {...register('email', email)}
            onBlur={e => handleBlur(e, setValue)}
          />
          {emailErr && <p>{emailErr}</p>}
        </div>
        <div className="flex fdc">
          <InputUi
            type="password"
            placeholder={'Ваш пароль...'}
            {...register('password', password)}
            onBlur={e => handleBlur(e, setValue)}
          />
          {passErr && <p>{passErr}</p>}
        </div>
      </div>
      <RedButtonUI>Войти</RedButtonUI>
    </form>
  )
})
