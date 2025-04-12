import s from './index.module.scss'

interface LinkifyTextProps {
  text: string
}

const urlRegex = /(https?:\/\/[^\s]+)/g

export const LinkifyText = ({ text }: LinkifyTextProps) => {
  return text?.split(urlRegex).map((part, id) => {
    if (!urlRegex.test(part)) return part

    return (
      <a key={id} href={part} target="_blank" rel="noopener noreferrer" className={s.link_text}>
        {part}
      </a>
    )
  })
}
