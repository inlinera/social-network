import { SubmitHandler, useForm } from 'react-hook-form'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { nullUser } from '@/shared/data/null-user'
import { IUser } from '@/shared/interfaces/IUser'
import { ILogin } from '../sign-in'

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setValue(e.target.name as keyof IRegister, value)
  }

  const tagErr = errors.displayName?.message
  const emailErr = errors.email?.message
  const passErr = errors.password?.message

  return (
    <form onSubmit={handleSubmit(submit)} className="flex fdc jcc aic">
      <div className="flex aic">
        <InputUi placeholder={'Ваше имя...'} maxLength={16} {...register('name')} onBlur={handleBlur} />
        <InputUi
          placeholder={'Желаемый тег...'}
          maxLength={15}
          {...register('displayName', {
            required: 'Тег обязателен для заполнения',
            minLength: {
              value: 5,
              message: 'Тег должен содержать минимум 5 символов',
            },
          })}
          onBlur={handleBlur}
        />
      </div>
      <div className="flex fdc jcc aic">
        <div className="flex fdc">
          <InputUi
            type="email"
            placeholder={'Адрес вашей почты...'}
            {...register('email', {
              required: 'Это поле обязательно для заполнения',
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
            maxLength={30}
            {...register('password', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов',
              },
            })}
            onBlur={handleBlur}
          />
          {passErr && <p>{passErr}</p>}
        </div>
        <InputUi
          type="text"
          placeholder={'Ваше описание..'}
          maxLength={100}
          {...register('description')}
          onBlur={handleBlur}
        />
      </div>
      <RedButtonUI>Зарегистрироваться</RedButtonUI>
      {tagErr && <p>{tagErr}</p>}
    </form>
  )
}
