import { useCallback, useState } from 'react'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

export const privacy = () => {
  const { user } = authApi
  const { editField } = EditPrivacySettings

  const [isPrivate, setIsPrivate] = useState(user?.isPrivate)
  const [isNameVisible, setIsNameVisible] = useState(user?.isNameVisible)
  const [areFriendsVisible, setAreFriendsVisible] = useState(user?.areFriendsVisible)

  const isVisible = (_: boolean) => (_ ? 'Видно' : 'Скрыто')

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

  return {
    name: 'Конфиденциальность',
    content: [
      {
        name: 'Тип аккаунта',
        value: isPrivate ? 'Закрытый' : 'Открытый',
        content: <RedButtonUI onClick={handleChangePrivate}>Change</RedButtonUI>,
      },
      {
        name: 'Видимость имени',
        value: isVisible(Boolean(isNameVisible)),
        content: <RedButtonUI onClick={handleChangeName}>Change</RedButtonUI>,
      },
      {
        name: 'Видимость друзей',
        value: isVisible(Boolean(areFriendsVisible)),
        content: <RedButtonUI onClick={handleChangeFriends}>Change</RedButtonUI>,
      },
    ],
    code: 3,
  }
}
