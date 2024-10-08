import s from './index.module.scss'
//MOBX
import postsApi from "@/shared/store/posts-api"
//COMPONENTS
import { PostListWidget } from "@/widgets/postList"
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

export const PostsPage = observer(() => {

  const { getPosts, posts, loading } = postsApi

    useEffect(() => {
      getPosts()
      }, [])

  return (
    <div className={`${s.postListPage} flex fdc aic cw`}>
      <h1>Latest posts</h1>
      <PostListWidget posts={posts!} loading={loading} isUserPosts={false}/>
    </div>
  )
})