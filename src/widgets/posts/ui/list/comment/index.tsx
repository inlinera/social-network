import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { CommentUi } from '@/entities/posts/components/comments/ui/comment'

import { IPost } from '@/shared/interfaces/IPost'

import authApi from '@/shared/store/api/user/auth/auth-api'

import { useTranslation } from 'react-i18next'

interface PostCommentProps {
  post: IPost
}

export const PostComment = observer(({ post }: PostCommentProps) => {
  const { user } = authApi
  const { t } = useTranslation()

  const firstComment = post.comments[0]

  return post.comments?.[0] ? (
    <CommentUi {...firstComment} isPreview />
  ) : (
    <CommentUi
      content={
        <>
          {user ? (
            <Link to={`/posts/${post.id}`}>{t('posts.comment')} ;)</Link>
          ) : (
            <>
              {t('posts.comment')}.<Link to={'/auth'}>{t('auth.reg._')}</Link>
            </>
          )}
        </>
      }
      isPreview={false}
      id={''}
    />
  )
})
