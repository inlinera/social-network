import { useEffect } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import postsApi from '@/shared/store/api/posts/posts-api'

import { PostListWidget } from '@/widgets/posts'
import { InView } from 'react-intersection-observer'
import { PostsPageHeader } from './ui/header'

import { setTitle } from '@/shared/constants/setTitle'

const PostsPage = observer(() => {
  const { getPosts, posts, loading } = postsApi
  setTitle('2la')

  const isLoading = !posts && loading

  useEffect(() => {
    if (!posts) getPosts()
  }, [])

  return (
    <div className={`${s.postListPage} flex fdc aic jcc`}>
      <PostsPageHeader />
      <PostListWidget posts={posts!} loading={isLoading} isUserPosts={false} />
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
