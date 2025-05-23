import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { IRegister } from '@/entities/auth/components/sign-up/use-register-form'

import { handleBlur } from '@/shared/data/hook-form'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { InputUi } from '@/shared/ui/input'

export const NameSetting = observer(() => {
  const { user } = authApi
  const { editField } = EditPrivacySettings

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Pick<IRegister, 'name'>>({
    defaultValues: {
      name: user?.name ?? '',
    },
  })

  const { t } = useTranslation()

  const onSubmit = handleSubmit(data => {
    editField(data.name ?? '', 'name', user?.displayName)
  })

  return (
    <form onSubmit={onSubmit} className={`${s.edit} flex aic`}>
      <InputUi {...register('name')} placeholder={'...'} maxLength={16} onBlur={e => handleBlur(e, setValue)} />
      {errors.name && <p className={s.error}>{errors.name.message}</p>}
      <RedButtonUI type="submit" style={{ maxWidth: 'max-content' }}>
        {t('settings.profile.name.btn')}
      </RedButtonUI>
    </form>
  )
})
