import { CommentUi } from '@/entities/posts/components/comments/ui/comment'
import { IPost } from '@/shared/interfaces/IPost'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface PostCommentProps {
  post: IPost
}

export const PostComment = observer(({ post }: PostCommentProps) => {
  const { user } = authApi
  const { t } = useTranslation()

  return post.comments?.[0] ? (
    <CommentUi
      userName={`${post.comments[0].userName}`}
      postId={post.id}
      content={post.comments[0].content}
      isPreview
    />
  ) : (
    <CommentUi
      content={
        <>
          {user ? (
            <Link to={`/posts/${post.id}`}>{t('posts.comment')} ;)</Link>
          ) : (
            <>
              {t('posts.comment')}. <Link to={'/auth'}>{t('auth.reg._')}</Link>
            </>
          )}
        </>
      }
      isPreview={false}
    />
  )
})
