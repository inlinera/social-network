import { SubmitHandler, useForm } from 'react-hook-form'

import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

import authApi from '@/shared/store/api/user/auth/auth-api'

import { nullUser } from '@/shared/data/null-user'
import { IUser } from '@/shared/interfaces/IUser'
import { ILogin } from '../sign-in'

import { email, handleBlur, password } from '@/shared/data/hook-form'

interface IRegister extends ILogin {
  name: string | null
  description: string | null
  displayName: string
}

export const AuthRegEntity = () => {
  const { signUp } = authApi

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegister>({
    mode: 'onChange',
  })

  const submit: SubmitHandler<IRegister> = data => {
    signUp({ ...nullUser, ...data } as unknown as IUser)
  }

  const tagErr = errors.displayName?.message
  const emailErr = errors.email?.message
  const passErr = errors.password?.message

  return (
    <form onSubmit={handleSubmit(submit)} className="flex fdc jcc aic">
      <div className="flex aic">
        <InputUi
          placeholder={'Ваше имя...'}
          maxLength={16}
          {...register('name')}
          onBlur={e => handleBlur(e, setValue)}
        />
        <InputUi
          placeholder={'Желаемый тег...'}
          maxLength={15}
          {...register('displayName', {
            required: 'Тег обязателен для заполнения',
            minLength: {
              value: 5,
              message: 'Тег должен содержать минимум 5 символов',
            },
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Тег может содержать только английские буквы'
            }
          })}
          onBlur={e => handleBlur(e, setValue)}
        />
      </div>
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
            maxLength={30}
            {...register('password', password)}
            onBlur={e => handleBlur(e, setValue)}
          />
          {passErr && <p>{passErr}</p>}
        </div>
        <InputUi
          type="text"
          placeholder={'Ваше описание..'}
          maxLength={100}
          {...register('description')}
          onBlur={e => handleBlur(e, setValue)}
        />
      </div>
      <RedButtonUI>Зарегистрироваться</RedButtonUI>
      {tagErr && <p>{tagErr}</p>}
    </form>
  )
}
