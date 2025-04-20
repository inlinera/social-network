import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import { IPost } from '@/shared/interfaces/IPost'

import postApi from '@/shared/store/api/posts/post/post-api'

import { PostWidget } from '@/entities/posts/components/post'
import { PostCommentsList } from '@/entities/posts/index'

import { useParams } from 'react-router-dom'
import { setTitle } from '@/shared/constants/setTitle'

const PostPage = observer(() => {
  const { getPost, post, error, loading } = postApi

  const { postId } = useParams()

  useEffect(() => {
    getPost(postId!)
  }, [])

  if (error) return 'Error'

  if (post) setTitle(`2la • ${post.value?.charAt(0).toUpperCase()}${post.value?.slice(1)}`)

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
