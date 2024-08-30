import s from './index.module.scss'
//MOBX
import postsApi from "@/shared/store/posts-api"
import authApi from "@/shared/store/auth-api"
//COMPONENTS
import { PostListWidget } from "@/widgets/postList"
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

export const PostsPage = observer(() => {

  const { getPosts, posts, loading } = postsApi

    useEffect(() => {
      if (authApi.user) getPosts()
      }, [getPosts, authApi.user])

  return (
    <div className={`${s.postListPage} flex fdc aic`}>
      <PostListWidget posts={posts} loading={loading}/>
    </div>
  )
})