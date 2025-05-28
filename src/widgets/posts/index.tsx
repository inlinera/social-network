import s from './index.module.scss'

import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'

import userApi from '@/shared/store/api/user/profile/user-api'
import { postsMap } from './ui/list'
import { observer } from 'mobx-react-lite'

import { useTranslation } from 'react-i18next'

interface PostListWidgetProps {
  posts?: IPost[]
  loading: boolean
  isUserPosts?: boolean
  empty?: boolean
}

export const PostListWidget = observer(({ posts, loading, isUserPosts, empty }: PostListWidgetProps) => {
  const { userInfo } = userApi
  const { t } = useTranslation()

  return (
    <div className={`${s.postsList} flex fdc`}>
      {isUserPosts && <h1>{t('profile.posts._', { name: `@${userInfo.displayName}` })}</h1>}
      {postsMap(posts, isUserPosts)}
      {!empty && loading && Array.from({ length: 5 }, (_, index) => <PostWidget loadingPost key={index} />)}
    </div>
  )
})
