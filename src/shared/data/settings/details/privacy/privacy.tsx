import { useCallback, useState } from 'react'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { useTranslation } from 'react-i18next'

const path = 'settings.privacy.'

export const privacy = () => {
  const { user } = authApi
  const { editField } = EditPrivacySettings
  const { t } = useTranslation()

  const [isPrivate, setIsPrivate] = useState(user?.isPrivate)
  const [isNameVisible, setIsNameVisible] = useState(user?.isNameVisible)
  const [areFriendsVisible, setAreFriendsVisible] = useState(user?.areFriendsVisible)

  const handleChangePrivate = useCallback(() => {
    editField(Boolean(!isPrivate), `isPrivate`)
    setIsPrivate(!isPrivate)
  }, [isPrivate])

  const handleChangeName = useCallback(() => {
    editField(Boolean(!isNameVisible), `isNameVisible`)
    setIsNameVisible(!isNameVisible)
  }, [isNameVisible])

  const handleChangeFriends = useCallback(() => {
    editField(Boolean(!areFriendsVisible), `areFriendsVisible`)
    setAreFriendsVisible(!areFriendsVisible)
  }, [areFriendsVisible])

  const isVisible = (_: boolean) => (_ ? t(`${path}vis`) : t(`${path}hid`))

  return {
    name: t(`${path}_`),
    content: [
      {
        name: t(`${path}type._`),
        value: isPrivate ? t(`${path}type.pri`) : t(`${path}type.pub`),
        content: <RedButtonUI onClick={handleChangePrivate}>{t(`${path}type.btn`)}</RedButtonUI>,
      },
      {
        name: t(`${path}name._`),
        value: isVisible(Boolean(isNameVisible)),
        content: <RedButtonUI onClick={handleChangeName}>{t(`${path}name.btn`)}</RedButtonUI>,
      },
      {
        name: t(`${path}friends._`),
        value: isVisible(Boolean(areFriendsVisible)),
        content: <RedButtonUI onClick={handleChangeFriends}>{t(`${path}friends.btn`)}</RedButtonUI>,
      },
    ],
    code: 3,
  }
}
