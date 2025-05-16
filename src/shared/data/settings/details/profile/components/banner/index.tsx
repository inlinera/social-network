import { useCallback, useState } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import { useChangeImage } from '@/shared/hooks/details/useUploadImg'
import { useTranslation } from 'react-i18next'

export const BannerSetting = observer(() => {
  const { user } = authApi
  const { editField } = EditPrivacySettings
  const { t } = useTranslation()

  const [banner, setBanner] = useState<string | null>(user?.bannerUrl ?? null)

  const handleChangeBanner = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      await editField(`${await useChangeImage(e, setBanner, banner)}`, 'bannerUrl')
    },
    [banner]
  )

  return (
    <div className={`${s.banner} flex aic jcc fdc`}>
      <div
        className={s.bannerImage}
        style={banner ? { backgroundImage: `url(${banner})` } : { backgroundColor: '#dd6e13' }}
      />
      <input type="file" id="banner" hidden accept="image/*" onChange={handleChangeBanner} />
      <label htmlFor="banner" className={s.bannerLabel}>
        {t('settings.profile.banner.btn')}
      </label>
    </div>
  )
})
