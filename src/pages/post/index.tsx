import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//INTERFACES
import { IComment } from '@/shared/interfaces/IComment'
import { IPost } from '@/shared/interfaces/IPost'
//MOBX
import postApi from '@/shared/store/post-api'
//COMPONENTS
import { PostWidget } from '@/widgets/post'
import { PostCommentsList } from '@/entities/posts/index'
//HOOKS
import { useParams } from 'react-router-dom'

export const PostPage = observer(() => {
  const { getPost, post, error } = postApi

  const { postId } = useParams()

  useEffect(() => {
    getPost(postId!)
  }, [])

  if (error) return 'Error'

  return (
    <div className={s.postPage}>
      {post && (
        <>
          <PostWidget post={post as IPost} />
          <PostCommentsList comments={post?.comments as IComment[]} />
        </>
      )}
    </div>
  )
})
