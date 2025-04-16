import { useEffect } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import postsApi from '@/shared/store/api/posts/posts-api'

import { PostListWidget } from '@/widgets/posts'
import { InView } from 'react-intersection-observer'

import { useTranslation } from 'react-i18next'

const PostsPage = observer(() => {
  const { getPosts, posts, loading } = postsApi

  const { t } = useTranslation()

  useEffect(() => {
    if (!posts) getPosts()
  }, [])

  return (
    <div className={`${s.postListPage} flex fdc aic jcc`}>
      <h1>{t('posts.latest')}</h1>
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
