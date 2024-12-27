import React from 'react'
import s from './settings.module.scss'
//MOBX
import FontSizeState from '@/shared/store/functional/settings/visual/font-size'
import ThemeState from '@/shared/store/functional/settings/visual/theme'
//HOOKS
import { useFontSize } from '@/shared/hooks/settings/useFontSize'

export interface ISetting {
  name: string
  content?: IContent[]
  code: number
}

export interface IContent {
  name: string
  value?: string | number | React.ReactNode
  info?: React.ReactNode
  content?: React.ReactNode
}

export const items = (): ISetting[] => {
  const { fz, setFz } = FontSizeState
  const { dark, setDark } = ThemeState
  return [
    {
      name: 'Безопасность',
      code: 0,
    },
    {
      name: 'Вид',
      content: [
        {
          name: 'font-size',
          value: `${fz}px`,
          content: (
            <input
              type="range"
              min="12"
              max="17"
              className={s.rangeInput}
              value={fz}
              onChange={e => setFz(+e.target.value)}
              onTouchEnd={() => useFontSize(fz).edit()}
              onMouseUp={() => useFontSize(fz).edit()}
            />
          ),
        },
        {
          name: 'theme',
          value: `${dark ? 'Dark' : 'Light'}`,
          content: (
            <button className={s.themeButton} onClick={() => setDark(!dark)}>
              Change theme
            </button>
          ),
        },
      ],
      code: 1,
    },
    {
      name: 'Конфиденциальность',
      code: 2,
    },
  ]
}
