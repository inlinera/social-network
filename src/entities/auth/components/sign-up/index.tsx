import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { useRegisterForm } from './use-register-form'

export const AuthRegEntity = () => {
  const {
    register,
    handleSubmit,
    setValue,
    submit,
    errors: { tagErr, emailErr, passErr },
    validation,
    handleBlur,
  } = useRegisterForm()

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
          {...register('displayName', validation.displayName)}
          onBlur={e => handleBlur(e, setValue)}
        />
      </div>
      <div className="flex fdc jcc aic">
        <div className="flex fdc">
          <InputUi
            type="email"
            placeholder={'Адрес вашей почты...'}
            {...register('email', validation.email)}
            onBlur={e => handleBlur(e, setValue)}
          />
          {emailErr && <p>{emailErr}</p>}
        </div>
        <div className="flex fdc">
          <InputUi
            type="password"
            placeholder={'Ваш пароль...'}
            maxLength={30}
            {...register('password', validation.password)}
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
