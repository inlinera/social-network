import { useCallback, useState } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-field-api'

import { useDeleteImage, useUploadImg } from '@/shared/hooks/details/useUploadImg'
import { LoadingUI } from '@/shared/ui/loading'
import { useTranslation } from 'react-i18next'
import { Plus, Check } from 'lucide-react'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

export const BannerSetting = observer(() => {
  const { user } = authApi
  const { editField } = EditPrivacySettings

  const { t } = useTranslation()

  const [banner, setBanner] = useState<string | null>(user?.bannerUrl ?? null)
  const [newBanner, setNewBanner] = useState<string | null>(null)
  const [isBannerLoading, setIsBannerLoading] = useState(false)

  const handleChangeBanner = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsBannerLoading(true)
      try {
        await useDeleteImage(`${banner}`)
        await editField(`${newBanner}`, 'bannerUrl')
        setBanner(newBanner)
        setNewBanner(null)
      } finally {
        setIsBannerLoading(false)
      }
    },
    [banner, newBanner]
  )

  const handleTestChangeBanner = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setIsBannerLoading(true)
      try {
        const url = await useUploadImg(e.target.files?.[0]!)
        setNewBanner(url)
      } finally {
        setIsBannerLoading(false)
      }
    },
    [newBanner]
  )

  const cancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      useDeleteImage(`${newBanner}`)
      setNewBanner(null)
    },
    [newBanner]
  )

  return (
    <div className={`${s.banner} flex aic jcc fdc`}>
      <input type="file" id="banner" hidden accept="image/*" onChange={handleTestChangeBanner} />
      <label htmlFor="banner" className={s.bannerLabel}>
        <div
          className={s.bannerImage}
          style={
            newBanner || banner
              ? { backgroundImage: `url(${newBanner || banner})` }
              : { backgroundColor: '#dd6e13' }
          }
        >
          {isBannerLoading && <LoadingUI />}
          {newBanner && (
            <div className={`${s.newBannerBtns} flex aic`}>
              <button type="button" onClick={cancel}>
                <Plus style={{ rotate: '45deg' }} />
              </button>
              <button type="button" onClick={handleChangeBanner}>
                <Check />
              </button>
            </div>
          )}
        </div>
      </label>
      {!newBanner && (
        <RedButtonUI
          type="button"
          onClick={() => document.getElementById('banner')?.click()}
          disabled={isBannerLoading}
        >
          {t('settings.profile.banner.btn')}
        </RedButtonUI>
      )}
    </div>
  )
})
