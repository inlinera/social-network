import { useCallback, useState } from 'react'
import s from './profile.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'
import storageApi from '@/shared/store/api/storage/storage-api'
import { Pencil } from 'lucide-react'
import { AvatarUI } from '@/shared/ui/avatar'
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import TextArea from 'antd/es/input/TextArea'

export const profile = () => {
  const { user, loading } = authApi
  const { editField } = EditPrivacySettings
  const { uploadImage, deleteImage } = storageApi

  const [userAvatar, setUserAvatar] = useState<string | null>(user?.avatarUrl || null)
  const [name, setName] = useState(user?.name || '')
  const [description, setDescription] = useState(user?.description || '')

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

  return {
    name: 'Профиль',
    content: [
      {
        name: 'Аватар',
        content: (
          <form className="flex fdc">
            <input type="file" id="avatar" hidden accept="image/*" onChange={handleChangeAvatar} />
            <label htmlFor="avatar" className={s.editAvatar}>
              <AvatarUI loading={loading} src={userAvatar} userName={`${user?.displayName}`} size={175} />
              <button
                type="button"
                className="flex jcc aic"
                onClick={() => document.getElementById('avatar')?.click()}
              >
                <Pencil />
              </button>
            </label>
          </form>
        ),
      },
      {
        name: 'Ваше имя',
        content: (
          <div className={`${s.edit} flex aic`}>
            <InputUi value={name} setVal={setName} placeholder={'Изменить имя...'} maxLength={16} />{' '}
            <RedButtonUI
              onClick={() => editField(name, 'name', user?.displayName)}
              style={{ maxWidth: 'max-content' }}
            >
              Изменить
            </RedButtonUI>
          </div>
        ),
      },
      {
        name: 'Ваше описание',
        content: (
          <div className={`${s.edit} ${s.max}`}>
            <TextArea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={'Изменить опсиание...'}
              maxLength={101}
            />{' '}
            <RedButtonUI onClick={() => editField(description, 'description', user?.displayName)}>
              Изменить
            </RedButtonUI>
          </div>
        ),
      },
    ],
    code: 1,
  }
}
