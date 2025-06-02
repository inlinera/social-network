import { useCallback, useState } from 'react'
import s from './index.module.scss'

import { AvatarT, handleView } from '@/shared/constants/components-observer/handleView'
import { PostWidgetProps } from '../..'

import { useTranslation } from 'react-i18next'
import { addZero } from '@/shared/constants/addZero'

import { InView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { TextUi } from '@/shared/ui/text'
import { AvatarUI } from '@/shared/ui/avatar'
import { DropdownMenuEntity } from '../dropdown'

import authApi from '@/shared/store/api/user/auth/auth-api'

import { observer } from 'mobx-react-lite'

const ruDate = Intl.DateTimeFormat()
const formatPostDate = (date: number, at: string) => {
  if (isNaN(date)) return

  const d = new Date(date)
  return `${ruDate.format(d)} ${at} ${addZero(d.getHours())}:${addZero(d.getMinutes())}`
}

export const PostHeader = observer(({ loadingPost, post }: PostWidgetProps) => {
  const { user } = authApi
  const { t } = useTranslation()

  const [avatar, setAvatar] = useState<AvatarT>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleChange = useCallback(
    (inView: boolean) => {
      if (!isLoaded) handleView(`${post?.userName}`, inView, avatar, setAvatar)
      setIsLoaded(true)
    },
    [avatar]
  )

  return (
    <div className={`${s.post__header} flex aic`}>
      <InView as="div" onChange={handleChange} className="flex fdc aic">
        <Link to={`/user/${post?.userName}`} className={`${s.post_user} flex aic`}>
          <AvatarUI loading={!isLoaded} src={avatar} size={45} userName={`${post?.userName}`} />
          <div className="flex fdc">
            <TextUi loading={loadingPost} lines={1}>
              <p style={{ fontSize: document.body.style.fontSize }}>{post?.userName}</p>
            </TextUi>
            <TextUi loading={loadingPost} lines={1}>
              <span className="fz10">{formatPostDate(post?.time as number, t('posts.at'))}</span>
            </TextUi>
          </div>
        </Link>
      </InView>
      <DropdownMenuEntity isAdmin={user?.displayName === post?.userName} post={post!} />
    </div>
  )
})
