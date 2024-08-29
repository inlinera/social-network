import React from 'react'
import s from './index.module.scss'

interface Props {
  text: string
}

export const LinkifyText: React.FC<Props> = ({ text }) => {
  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={s.link_text}>
            {part}
          </a>
        )
      }
      return part
    })
  }

  return linkifyText(text)
}