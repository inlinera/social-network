import { useCallback, useState } from 'react'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import { RedButtonUI } from '@/shared/ui/buttons/red-button'

import { useTranslation } from 'react-i18next'

const path = 'settings.privacy.'
const PRIVACY_FIELDS = [
  { key: 'isPrivate', label: 'type' },
  { key: 'isNameVisible', label: 'name' },
  { key: 'areFriendsVisible', label: 'friends' },
]

export const privacy = () => {
  const { user } = authApi
  const { editField } = EditPrivacySettings
  const { t } = useTranslation()

  const [privacySettings, setPrivacySettings] = useState({
    isPrivate: user?.isPrivate ?? false,
    isNameVisible: user?.isNameVisible ?? false,
    areFriendsVisible: user?.areFriendsVisible ?? false,
  })

  const handleChange = useCallback(
    (key: keyof typeof privacySettings) => {
      const newValue = !privacySettings[key]
      editField(Boolean(newValue), key)
      setPrivacySettings(prev => ({ ...prev, [key]: newValue }))
    },
    [privacySettings]
  )

  return {
    name: t(`${path}_`),
    content: PRIVACY_FIELDS.map(({ key, label }) => ({
      name: t(`${path}${label}._`),
      value: t(
        `${path}${
          label === 'type'
            ? privacySettings[key as keyof typeof privacySettings]
              ? 'type.pri'
              : 'type.pub'
            : privacySettings[key as keyof typeof privacySettings]
            ? 'vis'
            : 'hid'
        }`
      ),
      content: (
        <RedButtonUI onClick={() => handleChange(key as keyof typeof privacySettings)}>
          {t(`${path}${label}.btn`)}
        </RedButtonUI>
      ),
    })),
    code: 3,
  }
}
