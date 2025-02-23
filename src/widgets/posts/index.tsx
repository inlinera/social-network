import s from './index.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
// COMPONENTS
import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'
// MOBX
import userApi from '@/shared/store/api/user/profile/user-api'
import { postsMap } from './ui/list'
import { observer } from 'mobx-react-lite'

interface PostListWidgetProps {
  posts?: IPost[]
  loading: boolean
  isUserPosts?: boolean
}

export const PostListWidget = observer(
  ({ posts, loading, isUserPosts }: PostListWidgetProps) => {
    const { userInfo } = userApi

    return (
      <div className={`${s.postsList} flex fdc`}>
        {isUserPosts && <h1>@{userInfo?.displayName}'s posts</h1>}
        {posts
          ? postsMap(posts, loading, isUserPosts)
          : Array.from({ length: 5 }, (_, index) => <PostWidget loadingPost key={index} />)}
      </div>
    )
  }
)
