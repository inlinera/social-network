import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import s from './index.module.scss'

import { useChangeImage } from '@/shared/hooks/details/useUploadImg'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { Pencil } from 'lucide-react'

export const AvatarSetting = observer(() => {
  const { user, loading } = authApi
  const { editField } = EditPrivacySettings

  const [userAvatar, setUserAvatar] = useState<string | null>(user?.avatarUrl ?? null)

  const handleChangeAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      await editField(`${await useChangeImage(e, setUserAvatar, userAvatar)}`, 'avatarUrl')
    },
    [userAvatar]
  )

  return (
    <form className="flex fdc">
      <input type="file" id="avatar" hidden accept="image/*" onChange={handleChangeAvatar} />
      <label htmlFor="avatar" className={s.editAvatar}>
        <AvatarUI loading={loading} src={userAvatar} userName={`${user?.displayName}`} size={175} />
        <button type="button" className="flex jcc aic" onClick={() => document.getElementById('avatar')?.click()}>
          <Pencil />
        </button>
      </label>
    </form>
  )
})
