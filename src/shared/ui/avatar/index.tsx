import { memo } from 'react'
import s from './index.module.scss'
import { AvatarSkeleton } from './models/skeleton'
import { Avatar } from './models/avatar'

interface AvatarUIProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean
  src: string | null
  size: string | number
  userName: string
}

export const AvatarUI = memo(({ loading, size, src, userName, ...props }: AvatarUIProps) => {
  return (
    <div className={`${s['avatar-ui']}`} style={{ height: size, width: size }} {...props}>
      {loading ? <AvatarSkeleton /> : <Avatar src={src} userName={userName} />}
    </div>
  )
})
