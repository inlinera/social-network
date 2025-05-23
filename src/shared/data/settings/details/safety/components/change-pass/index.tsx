import { observer } from 'mobx-react-lite'

import { handleBlur, password } from '@/shared/data/hook-form'

import authApi from '@/shared/store/api/user/auth/auth-api'

import { InputUi } from '@/shared/ui/input'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const path = 'settings.safety.'

interface FormData {
  currentPassword: string
  newPassword: string
}

export const ChangePassComponent = observer(() => {
  const { changePassword } = authApi
  const { t } = useTranslation()

  const { register, handleSubmit, reset, setValue } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    changePassword(data.newPassword, data.currentPassword).then(() => {
      reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex fdc">
      <InputUi
        {...register('currentPassword', password)}
        placeholder={t(`${path}pass.currPass`)}
        maxLength={30}
        onBlur={e => handleBlur(e, setValue)}
      />
      <div className="flex jcc aic">
        <InputUi
          {...register('newPassword', password)}
          placeholder={t(`${path}pass.newPass`)}
          maxLength={30}
          onBlur={e => handleBlur(e, setValue)}
        />
        <button type="submit">{t(`${path}pass.btn`)}</button>
      </div>
    </form>
  )
})
