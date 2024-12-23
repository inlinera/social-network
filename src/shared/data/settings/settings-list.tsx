import React, { useState } from 'react'

export interface ISetting {
  name: string
  content?: IContent[]
}

interface IContent {
  name: string
  value?: string | number
  info?: React.ReactNode
  content?: React.ReactNode
}

export const items = (): ISetting[] => {
  const [fz, setFz] = useState(14)
  return [
    {
      name: 'Безопасность',
    },
    {
      name: 'Вид',
      content: [
        {
          name: 'font-size',
          value: fz,
          content: (
            <input
              type="range"
              min="12"
              max="20"
              style={{ color: '#fff' }}
              value={fz}
              onChange={e => setFz(+e.target.value)}
            />
          ),
        },
        {
          name: 'theme',
          value: 'dark',
          content: <button>Change theme</button>,
        },
        {
          name: 'wallpaper(chat)',
          info: (
            <div className="fz10">
              <span style={{ color: '#e63946' }}>*</span>
              <i>Phone only</i>
            </div>
          ),
          content: <div></div>,
        },
      ],
    },
    {
      name: 'Конфиденциальность',
    },
  ]
}
