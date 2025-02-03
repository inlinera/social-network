import s from './index.module.scss'

interface AvatarProps {
  src: string
}

export const Avatar = ({ src }: AvatarProps) => {
  return <img className={s.avatar} src={src} alt="" />
}
