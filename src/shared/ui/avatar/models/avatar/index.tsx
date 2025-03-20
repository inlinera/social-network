import s from './index.module.scss'

interface AvatarProps {
  src: string | null
  userName: string
}

export const Avatar = ({ src, userName }: AvatarProps) => {
  return src ? (
    <img className={s.avatar} src={src} alt="" />
  ) : (
    <div className={`${s.textAvatar} flex jcc aic`}>{userName?.charAt(0)?.toUpperCase()}</div>
  )
}
