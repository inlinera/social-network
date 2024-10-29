import { FC, useState } from 'react'
//MOBX
import handleLikeApi from '@/shared/store/handle-like-api'
//COMPONENTS
import { PostBtn } from '@/shared/ui/buttons/post-button'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
//ICONS
import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
//INTERFACES
import { IComment } from '@/shared/interfaces/IComment'

interface PostBtnLineProps {
  likes: string[]
  comments: IComment[]
  postId: string
  userId: string
}

export const PostBtnLine: FC<PostBtnLineProps> = observer(
  ({ likes, comments, postId, userId }) => {
    const { handlePostLike } = handleLikeApi
    const [loading, setLoading] = useState<boolean>(false)

    const handleLikeStateChange = async () => {
      setLoading(true)
      try {
        await handlePostLike(likes?.includes(userId), postId, userId)
      } catch (e) {
        alert(e)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="flex jcc aic">
        <PostBtn onClick={() => handleLikeStateChange()} loading={loading}>
          {loading ? (
            'Loading'
          ) : likes?.includes(userId) ? (
            <HeartFilled style={{ fontSize: '16px' }} />
          ) : (
            <HeartOutlined style={{ fontSize: '16px' }} />
          )}
          {likes?.length}
        </PostBtn>
        <Link to={`/posts/${postId}`}>
          <PostBtn>
            <CommentOutlined />
            {comments?.length}
          </PostBtn>
        </Link>
      </div>
    )
  }
)
