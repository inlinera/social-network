import { useEffect } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//MOBX
import postsApi from '@/shared/store/api/posts/posts-api'
//COMPONENTS
import { PostListWidget } from '@/widgets/posts'
import { InView } from 'react-intersection-observer'

const PostsPage = observer(() => {
  const { getPosts, posts, loading } = postsApi

  useEffect(() => {
    if (!posts) getPosts()
  }, [])

  return (
    <div className={`${s.postListPage} flex fdc aic jcc`}>
      <h1>Latest posts</h1>
      <PostListWidget posts={posts!} loading={loading} isUserPosts={false} />
      <InView
        as="div"
        onChange={inView => inView && !loading && getPosts()}
        style={{ height: 20, width: '100%' }}
        threshold={0.1}
      />
    </div>
  )
})

export default PostsPage
