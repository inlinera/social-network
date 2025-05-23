import { SubmitHandler, useForm } from 'react-hook-form'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { nullUser } from '@/shared/data/null-user'
import { IUser } from '@/shared/interfaces/IUser'
import { ILogin } from '../sign-in'
import { email, handleBlur, password } from '@/shared/data/hook-form'

export interface IRegister extends ILogin {
  name: string | null
  description: string | null
  displayName: string
}

export const useRegisterForm = () => {
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

  const displayNameValidation = {
    required: 'Тег обязателен для заполнения',
    minLength: {
      value: 5,
      message: 'Тег должен содержать минимум 5 символов',
    },
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Тег может содержать только английские буквы',
    },
  }

  return {
    register,
    handleSubmit,
    setValue,
    submit,
    errors: {
      tagErr,
      emailErr,
      passErr,
    },
    validation: {
      displayName: displayNameValidation,
      email,
      password,
    },
    handleBlur,
  }
}
