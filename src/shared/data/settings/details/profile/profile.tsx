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
import { useTranslation } from 'react-i18next'

export const profile = () => {
  const { user, loading } = authApi
  const { editField } = EditPrivacySettings
  const { uploadImage, deleteImage } = storageApi

  const { t } = useTranslation()

  const [userAvatar, setUserAvatar] = useState<string | null>(user?.avatarUrl || null)
  const [name, setName] = useState(user?.name || '')
  const [description, setDescription] = useState(user?.description || '')

  const handleChangeAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const avatar = e.target.files?.[0]!
      const url = await uploadImage(avatar, 'avatars')
      if (!url) return
      await deleteImage(`${userAvatar}`).then(
        async () => await editField(url, 'avatarUrl').then(() => setUserAvatar(url))
      )
    },
    [userAvatar]
  )

  return {
    name: t('settings.profile._'),
    content: [
      {
        name: t('settings.profile.avatar'),
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
