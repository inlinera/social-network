import { useEffect } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//MOBX
import postsApi from '@/shared/store/api/posts/posts-api'
//COMPONENTS
import { PostListWidget } from '@/widgets/posts'
import { InView } from 'react-intersection-observer'

export const PostsPage = observer(() => {
  const { getPosts, posts, loading } = postsApi

  useEffect(() => {
    getPosts(false)
  }, [])

  return (
    <div className={`${s.postListPage} flex fdc aic jcc`}>
      <h1>Latest posts</h1>
      <PostListWidget posts={posts!} loading={loading} isUserPosts={false} />
      <InView
        as="div"
        onChange={inView => inView && getPosts(true)}
        style={{ height: 20, width: '100%' }}
      />
      <button onClick={() => getPosts(true)}>load more</button>
    </div>
  )
})
