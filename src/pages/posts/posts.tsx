import { useEffect } from "react"
import s from './index.module.scss'
import { observer } from "mobx-react-lite"
//MOBX
import postsApi from "@/shared/store/posts-api"
import authApi from "@/shared/store/auth-api"
import { PostWidget } from "@/widgets/post"

export const PostsPage = observer(() => {
    const { getPosts, posts, loading } = postsApi


    useEffect(() => {
      if (authApi.user) getPosts()
      }, [])

  return (
    <div className={`${s.postsList} df fdc jcc aic`}>
      {loading 
      ? 
        'Loading'
      :
      posts?.map(p => <PostWidget userId={p.userId} username={p.username}
        value={p.value} likes={0} key={p.id}/>)
      }
    </div>
  )
})
