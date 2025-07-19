import { useEffect } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import postsApi from '@/shared/store/api/posts/posts-api'

import { PostListWidget } from '@/widgets/posts'
import { InView } from 'react-intersection-observer'
import { PostsPageHeader } from './ui/header'

import { setTitle } from '@/shared/constants/setTitle'
import { PostsSider } from './ui/sider'
import { useMobile } from '@/shared/hooks/useMobile'

const PostsPage = observer(() => {
  const {
    getPosts,
    posts: { posts },
    loading: { loading },
    empty: { empty },
  } = postsApi
  setTitle('', true)
  const isMobile = useMobile()

  useEffect(() => {
    if (!posts) getPosts()
  }, [])

  return (
    <div className={`${s.postListPage} flex jcc`}>
      <div className={`${s.posts} flex fdc`}>
        <PostsPageHeader />
        <PostListWidget posts={posts!} loading={loading} isUserPosts={false} empty={empty} />
        {empty ? (
          <img src="https://i.postimg.cc/vmx8V37m/20250420-115413.png" alt="2la" width={125} height={125} />
        ) : (
          <InView
            as="div"
            onChange={inView => inView && !loading && getPosts()}
            style={{ height: 10, width: '100%' }}
            threshold={0.5}
          />
        )}
      </div>
      {!isMobile && <PostsSider />}
    </div>
  )
})

export default PostsPage
