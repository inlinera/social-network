import s from './view.module.scss'

import Settings, { ISettings } from '@/shared/store/functional/start-app'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { useMemo, useState } from 'react'

export const view = () => {
  const { $change } = Settings
  const settings = JSON.parse(`${localStorage.getItem('2la-settings')}`)
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

  const handleThemeChange = useMemo(
    () => () => {
      setNewSettings(prev => {
        const updatedTheme = !prev.theme
        const updatedSettings = { ...prev, theme: updatedTheme }
        $change(updatedSettings)
        return updatedSettings
      })
    },
    []
  )

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
            max="17"
            className={s.rangeInput}
            value={newSettings.fz}
            onChange={handleFontSizeChange}
          />
        ),
      },
      {
        name: 'Тема',
        value: `${newSettings.theme ? 'Темная' : 'Светлая'}`,
        content: <RedButtonUI onClick={handleThemeChange}>Change theme</RedButtonUI>,
      },
    ],
    code: 1,
  }
}
