import React from 'react'

export interface ISetting {
  name: string
  content?: IContent[]
}

interface IContent {
  name: string
  value?: string | number
  content?: React.ReactNode
}

export const items = [
  {
    name: 'Безопасность',
  },
  {
    name: 'Вид',
    content: [
      {
        name: 'font-size',
        value: 14,
      },
      {
        name: 'theme',
        content: <button>Change theme</button>,
      },
    ],
  },
  {
    name: 'Конфиденциальность',
  },
]
