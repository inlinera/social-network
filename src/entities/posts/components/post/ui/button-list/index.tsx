import { useState } from 'react'
import { observer } from 'mobx-react-lite'
// MOBX
import handleLikeApi from '@/shared/store/api/posts/post/details/handle-like-api'
// COMPONENTS
import { PostBtn } from '@/shared/ui/buttons/post-button'
import { Link } from 'react-router-dom'
// ICONS
import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
// INTERFACES
import { IComment } from '@/shared/interfaces/IComment'
import authApi from '@/shared/store/api/user/auth/auth-api'

interface PostBtnLineProps {
  likes: string[]
  setLikes: (_: string[]) => void
  comments: IComment[]
  postId: string
  userId: string
}

export const PostBtnLine = observer(
  ({ likes, setLikes, comments, postId, userId }: PostBtnLineProps) => {
    const { user } = authApi
    const { handlePostLike } = handleLikeApi
    const [loading, setLoading] = useState(false)
    const isIncludes = likes.includes(`${user?.displayName}`)

    const handleLikeStateChange = async () => {
      setLoading(true)
      try {
        await handlePostLike(isIncludes, postId, userId)
        setLikes(
          !isIncludes
            ? [`${user?.displayName}`, ...likes]
            : likes.filter(u => u !== user?.displayName)
        )
      } catch (e) {
        alert(e)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="flex aic">
        <PostBtn onClick={handleLikeStateChange} loading={loading}>
          {loading ? 'Loading' : isIncludes ? <HeartFilled /> : <HeartOutlined />}
          {likes.length}
        </PostBtn>
        <Link to={`/posts/${postId}`}>
          <PostBtn>
            <CommentOutlined />
            {comments.length}
          </PostBtn>
        </Link>
      </div>
    )
  }
)
