import s from './view.module.scss'
import Settings, { ISettings } from '@/shared/store/functional/start-app'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import i18next from 'i18next'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

const { $change } = Settings

const path = 'settings.visual.'
const languages = ['ru', 'en'] as const
const themes = ['dark', 'light'] as const

const updateSettings = (updatedSettings: ISettings, setNewSettings: Dispatch<SetStateAction<ISettings>>) => {
  setNewSettings(updatedSettings)
  $change(updatedSettings)
}

export const view = () => {
  const { t } = useTranslation()

  const initialSettings: ISettings = JSON.parse(localStorage.getItem('2la-settings') || '{}')
  const [newSettings, setNewSettings] = useState<ISettings>(initialSettings)

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fz = +e.target.value
    updateSettings({ ...newSettings, fz }, setNewSettings)
  }

  const handleThemeChange = useCallback(() => {
    const theme = newSettings.theme === themes[0] ? themes[1] : themes[0]
    updateSettings({ ...newSettings, theme }, setNewSettings)
  }, [newSettings])

  const handleLangChange = useCallback(() => {
    const lang = newSettings.lang === languages[0] ? languages[1] : languages[0]
    updateSettings({ ...newSettings, lang }, setNewSettings)
    i18next.changeLanguage(lang)
  }, [newSettings])

  return {
    name: t(`${path}_`),
    content: [
      {
        name: t(`${path}font_size`),
        value: `${newSettings.fz}`,
        content: (
          <input
            type="range"
            min="12"
            max="20"
            className={s.rangeInput}
            value={newSettings.fz}
            onChange={handleFontSizeChange}
          />
        ),
      },
      {
        name: t(`${path}theme._`),
        value: t(`${path}theme.${newSettings.theme}`),
        content: <RedButtonUI onClick={handleThemeChange}>{t(`${path}theme.btn`)}</RedButtonUI>,
      },
      {
        name: t(`${path}lang._`),
        value: `${newSettings.lang}`,
        content: <RedButtonUI onClick={handleLangChange}>{t(`${path}lang.btn`)}</RedButtonUI>,
      },
    ],
    code: 2,
  }
}
