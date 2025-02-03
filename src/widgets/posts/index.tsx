import s from './index.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
// COMPONENTS
import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'
import { CommentUi } from '@/entities/posts/components/comments/ui/comment'
import { Link } from 'react-router-dom'
// MOBX
import userApi from '@/shared/store/api/user/profile/user-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

interface PostListWidgetProps {
  posts?: IPost[]
  loading: boolean
  isUserPosts?: boolean
}

export const PostListWidget = ({ posts, loading, isUserPosts }: PostListWidgetProps) => {
  const { userInfo } = userApi
  const { user } = authApi

  const postsMap = posts?.map((p, arrId) => {
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
            />
          ))}
      </div>
    )
  })

  return (
    <div className={`${s.postsList} flex fdc`}>
      {isUserPosts && <h1>@{userInfo?.displayName}'s posts</h1>}
      {posts
        ? postsMap
        : Array.from({ length: 5 }, (_, index) => <PostWidget loadingPost key={index} />)}
    </div>
  )
}
