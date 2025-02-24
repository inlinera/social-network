import { useCallback, useState } from 'react'
import s from './privacy.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'
import storageApi from '@/shared/store/api/storage/storage-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { ImageUI } from '@/shared/ui/image'
import { Pencil } from 'lucide-react'

export const privacy = () => {
  const { user } = authApi
  const { editField } = EditPrivacySettings
  const { uploadImage, deleteImage } = storageApi
  const [userAvatar, setUserAvatar] = useState(user?.avatarUrl)
  const [isNameVisible, setIsNameVisible] = useState(user?.isNameVisible)
  const [isBirthdayVisible, setIsBirthdayVisible] = useState(user?.isBirthdayVisible)
  const [areFriendsVisible, setAreFriendsVisible] = useState(user?.areFriendsVisible)

  const isVisible = (_: boolean) => (_ ? 'Видно' : 'Скрыто')

  const handleChangeAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const avatar = e.target.files?.[0]!
      const url = await uploadImage(avatar, 'avatars')
      if (!url) return alert('cannot upload img')
      await deleteImage(`${userAvatar}`).then(
        async () => await editField(url, 'avatarUrl').then(() => setUserAvatar(url))
      )
    },
    [userAvatar]
  )

  const handleChangeName = useCallback(() => {
    editField(Boolean(!isNameVisible), `isNameVisible`)
    setIsNameVisible(!isNameVisible)
  }, [isNameVisible])

  const handleChangeBD = useCallback(() => {
    editField(Boolean(!isBirthdayVisible), `isBirthdayVisible`)
    setIsBirthdayVisible(!isBirthdayVisible)
  }, [isBirthdayVisible])

  const handleChangeFriends = useCallback(() => {
    editField(Boolean(!areFriendsVisible), `areFriendsVisible`)
    setAreFriendsVisible(!areFriendsVisible)
  }, [areFriendsVisible])

  return {
    name: 'Конфиденциальность',
    content: [
      {
        name: 'Тип аккаунта',
        value: 'Открытый',
        content: <RedButtonUI onClick={() => console.log('@duckowa')}>Change</RedButtonUI>,
      },
      {
        name: 'Аватар',
        content: (
          <form className="flex fdc">
            <input
              type="file"
              id="avatar"
              hidden
              accept="image/*"
              onChange={handleChangeAvatar}
            />
            <label htmlFor="avatar" className={s.editAvatar}>
              <ImageUI src={userAvatar} alt="avatar" borderRadius={'100%'} className={s.img} />
              <button type="button" className="flex jcc aic">
                <Pencil />
              </button>
            </label>
          </form>
        ),
      },
      {
        name: 'Видимость имени',
        value: isVisible(Boolean(isNameVisible)),
        content: <RedButtonUI onClick={handleChangeName}>Change</RedButtonUI>,
      },
      {
        name: 'Видимость дня рождения',
        value: isVisible(Boolean(isBirthdayVisible)),
        content: <RedButtonUI onClick={handleChangeBD}>Change</RedButtonUI>,
      },
      {
        name: 'Видимость друзей',
        value: isVisible(Boolean(areFriendsVisible)),
        content: <RedButtonUI onClick={handleChangeFriends}>Change</RedButtonUI>,
      },
    ],
    code: 2,
  }
}
