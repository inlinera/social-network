import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import TextArea from 'antd/es/input/TextArea'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

import { IRegister } from '@/entities/auth/components/sign-up/use-register-form'

import { handleBlur } from '@/shared/data/hook-form'

export const DescriptionSetting = observer(() => {
  const { user } = authApi
  const { editField } = EditPrivacySettings

  const { t } = useTranslation()

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Pick<IRegister, 'description'>>({
    defaultValues: {
      description: user?.description ?? '',
    },
  })

  const description = watch('description') ?? ''

  const onSubmit = handleSubmit(data => {
    editField(data.description ?? '', 'description', user?.displayName)
  })

  return (
    <form onSubmit={onSubmit} className={`${s.edit}`}>
      <TextArea
        value={description}
        onChange={e => setValue('description', e.target.value)}
        maxLength={100}
        placeholder="..."
        rows={5}
        style={{ resize: 'none' }}
        onBlur={e => handleBlur(e, setValue)}
      />
      {errors.description && <p className={s.error}>{errors.description.message}</p>}
      <RedButtonUI type="submit">{t('settings.profile.description.btn')}</RedButtonUI>
    </form>
  )
})
