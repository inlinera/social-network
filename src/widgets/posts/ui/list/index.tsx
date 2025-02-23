import { CommentUi } from '@/entities/posts/components/comments/ui/comment'
import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { Link } from 'react-router-dom'

export const postsMap = (posts: IPost[] | null, loading: boolean, isUserPosts?: boolean) => {
  return posts?.map((p, arrId) => {
    const { user } = authApi
    const isEven2 = arrId % 2 === 0

    return (
      <div key={p.id}>
        <PostWidget post={p} loadingPost={loading} />
        {isEven2 &&
          !isUserPosts &&
          (p.comments?.[0] ? (
            <CommentUi
              userName={`${p.comments[0].userName}`}
              postId={p.id}
              content={p.comments[0].content}
              isPreview
            />
          ) : (
            <CommentUi
              content={
                <>
                  {user ? (
                    <Link to={`/posts/${p.id}`}>Напишите комментарий первыми ;)</Link>
                  ) : (
                    <>
                      Напишите первыми. <Link to={'/auth'}>Зарегистрироваться</Link>
                    </>
                  )}
                </>
              }
              isPreview={false}
            />
          ))}
      </div>
    )
  })
}
