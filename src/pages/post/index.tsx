import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
//MOBX
import postApi from '@/shared/store/api/posts/post/post-api'
//COMPONENTS
import { PostWidget } from '@/entities/posts/components/post'
import { PostCommentsList } from '@/entities/posts/index'
//HOOKS
import { useParams } from 'react-router-dom'

const PostPage = observer(() => {
  const { getPost, post, error, loading } = postApi

  const { postId } = useParams()

  useEffect(() => {
    getPost(postId!)
  }, [])

  if (error) return 'Error'

  return (
    <div className={s.postPage}>
      {post?.value ? (
        <>
          <PostWidget post={post as IPost} loadingPost={loading} />
          <PostCommentsList comments={post?.comments} postId={`${postId}`} />
        </>
      ) : (
        'Post is not found'
      )}
    </div>
  )
})

export default PostPage
