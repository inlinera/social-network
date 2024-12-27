import { useRef } from 'react'
import s from './index.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
//COMPONENTS
import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'
import Skeleton from 'react-loading-skeleton'
//MOBX
import userApi from '@/shared/store/api/user/profile/user-api'

interface PostListWidgetProps {
  posts?: IPost[]
  loading?: boolean
  isUserPosts?: boolean
}

export const PostListWidget = ({ posts, loading, isUserPosts }: PostListWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const width = (containerRef.current?.clientWidth as number) - 20 || '95%'

  const { userInfo } = userApi

  const postsMap = posts?.map(p => <PostWidget post={p} key={p.id} />)

  return (
    <div className={`${s.postsList} flex fdc cw`} ref={containerRef}>
      {loading || posts?.length == 0 ? (
        <Skeleton
          count={5}
          duration={1}
          width={width}
          height={170}
          style={{ marginTop: '15px' }}
          borderRadius={'0.5rem'}
        />
      ) : isUserPosts ? (
        <div>
          <h1>{userInfo?.displayName}'s posts</h1>
          {postsMap}
        </div>
      ) : (
        <div>{postsMap}</div>
      )}
    </div>
  )
}
