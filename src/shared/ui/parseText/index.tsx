import s from './index.module.scss'

interface LinkifyTextProps {
  text: string
}

export const LinkifyText = ({ text }: LinkifyTextProps) => {
  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return text?.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={s.link_text}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return linkifyText(text)
}
