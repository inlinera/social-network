import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import s from './index.module.scss'

import { useChangeImage, useDeleteImage } from '@/shared/hooks/details/useUploadImg'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { Pencil, Trash } from 'lucide-react'
import { LoadingUI } from '@/shared/ui/loading'

export const AvatarSetting = observer(() => {
  const { user, loading } = authApi
  const { editField } = EditPrivacySettings

  const [userAvatar, setUserAvatar] = useState<string | null>(user?.avatarUrl ?? null)
  const [isAvatarLoading, setIsAvatarLoading] = useState(false)

  const handleChangeAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setIsAvatarLoading(true)
      try {
        await editField(`${await useChangeImage(e, setUserAvatar, userAvatar)}`, 'avatarUrl')
      } finally {
        setIsAvatarLoading(false)
      }
    },
    [userAvatar]
  )

  const handleDeleteAvatar = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      if (userAvatar) useDeleteImage(`${userAvatar}`)
      await editField(null, 'avatarUrl')
      setUserAvatar(null)
    },
    [userAvatar]
  )

  return (
    <form className="flex fdc">
      <input type="file" id="avatar" hidden accept=".png,.jpg,.jpeg,.gif" onChange={handleChangeAvatar} />
      <label htmlFor="avatar" className={s.editAvatar}>
        {isAvatarLoading && <LoadingUI />}
        <AvatarUI loading={loading} src={userAvatar} userName={`${user?.displayName}`} size={175} />
        <div
          className={`${s.editAvatarButton} flex jcc aic`}
          style={userAvatar ? { right: '-30px' } : { right: '10px' }}
        >
          <button
            type="button"
            className="flex jcc aic"
            onClick={() => document.getElementById('avatar')?.click()}
            disabled={isAvatarLoading}
          >
            <Pencil />
          </button>
          {userAvatar && (
            <button type="button" className="flex jcc aic" onClick={handleDeleteAvatar} disabled={isAvatarLoading}>
              <Trash />
            </button>
          )}
        </div>
      </label>
    </form>
  )
})
