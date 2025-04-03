import s from './view.module.scss'

import Settings, { ISettings, ThemeT } from '@/shared/store/functional/start-app'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { useCallback, useState } from 'react'

export const view = () => {
  const { $change } = Settings
  const settings: ISettings = JSON.parse(`${localStorage.getItem('2la-settings')}`)

  const [newSettings, setNewSettings] = useState<ISettings>({
    fz: settings.fz,
    theme: settings.theme,
  })

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFz = +e.target.value
    setNewSettings(prev => {
      const updatedSettings = { ...prev, fz: updatedFz }
      $change(updatedSettings)
      return updatedSettings
    })
  }

  const handleThemeChange = useCallback(() => {
    setNewSettings(prev => {
      const updatedTheme = prev.theme == 'dark' ? 'light' : ('dark' as ThemeT)
      const updatedSettings = { ...prev, theme: updatedTheme }
      $change(updatedSettings)
      return updatedSettings
    })
  }, [])

  return {
    name: 'Вид',
    content: [
      {
        name: 'Размер шрифта',
        value: `${newSettings.fz}px`,
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
        name: 'Тема',
        value: `${newSettings.theme == 'dark' ? 'Темная' : 'Светлая'}`,
        content: <RedButtonUI onClick={handleThemeChange}>Change theme</RedButtonUI>,
      },
    ],
    code: 2,
  }
}
