import React from 'react'
import FontSizeState from '@/shared/store/functional/settings/visual/font-size'
import ThemeState from '@/shared/store/functional/settings/visual/theme'
import { useSliceStr } from '@/shared/hooks/useSliceStr'

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
              max="18"
              style={{ color: '#fff' }}
              value={fz}
              onChange={e => setFz(+e.target.value)}
            />
          ),
        },
        {
          name: 'theme',
          value: `${dark ? 'Dark' : 'Light'}`,
          content: <button onClick={() => setDark(!dark)}>Change theme</button>,
        },
        {
          name: 'wallpaper(chat)',
          value: (
            <a href="/" target="_blank">
              {useSliceStr('tg/@duckowa/dev', 16)}
            </a>
          ),
          info: (
            <div className="fz10">
              <span style={{ color: '#e63946' }}>*</span>
              <i>Phone only</i>
            </div>
          ),
          content: <div></div>,
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
