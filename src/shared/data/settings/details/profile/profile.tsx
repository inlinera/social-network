import { useTranslation } from 'react-i18next'

import { AvatarSetting } from './components/avatar'
import { BannerSetting } from './components/banner'
import { NameSetting } from './components/name'
import { DescriptionSetting } from './components/description'

export const profile = () => {
  const { t } = useTranslation()

  return {
    name: t('settings.profile._'),
    content: [
      {
        name: t('settings.profile.avatar'),
        content: <AvatarSetting />,
      },
      {
        name: t('settings.profile.banner._'),
        content: <BannerSetting />,
      },
      {
        name: t('settings.profile.name._'),
        content: <NameSetting />,
      },
      {
        name: t('settings.profile.description._'),
        content: <DescriptionSetting />,
      },
    ],
    code: 1,
  }
}
