import { useState } from 'react'
import s from './profile.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import { AvatarSetting } from './components/avatar'
import { BannerSetting } from './components/banner'

export const profile = () => {
  const { user } = authApi
  const { editField } = EditPrivacySettings

  const { t } = useTranslation()

  const [name, setName] = useState(user?.name ?? '')
  const [description, setDescription] = useState(user?.description ?? '')

  return {
    name: t('settings.profile._'),
    content: [
      {
        name: t('settings.profile.avatar'),
        content: <AvatarSetting />,
      },
      {
        name: t('settings.profile.banner._'),
        content: <BannerSetting />,
      },
      {
        name: t('settings.profile.name._'),
        content: (
          <div className={`${s.edit} flex aic`}>
            <InputUi value={name} setVal={setName} placeholder={'...'} maxLength={16} />{' '}
            <RedButtonUI
              onClick={() => editField(name, 'name', user?.displayName)}
              style={{ maxWidth: 'max-content' }}
            >
              {t('settings.profile.name.btn')}
            </RedButtonUI>
          </div>
        ),
      },
      {
        name: t('settings.profile.description._'),
        content: (
          <div className={`${s.edit} ${s.max}`}>
            <TextArea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="..."
              maxLength={101}
              rows={5}
              style={{ resize: 'none' }}
            />{' '}
            <RedButtonUI onClick={() => editField(description, 'description', user?.displayName)}>
              {t('settings.profile.description.btn')}
            </RedButtonUI>
          </div>
        ),
      },
    ],
    code: 1,
  }
}
