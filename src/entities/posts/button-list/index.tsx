import { FC, useState } from 'react'
//MOBX
import handleLikeApi from '@/shared/store/handle-like-api'
//COMPONENTS
import { PostBtn } from '@/shared/ui/button'
import { observer } from 'mobx-react-lite'
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

    const [isLiked, setIsLiked] = useState<boolean>(likes?.includes(userId))
    const [loading, setLoading] = useState<boolean>(false)

    const handleLikeStateChange = async (isLiked: boolean) => {
      setLoading(true)
      try {
        setIsLiked(!isLiked)
        await handlePostLike(isLiked, postId, userId)
      } catch (e) {
        alert(e)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="flex jcc aic">
        <PostBtn onClick={() => handleLikeStateChange(isLiked)} loading={loading}>
          {loading ? (
            'Loading'
          ) : isLiked ? (
            <HeartFilled style={{ fontSize: '16px' }} />
          ) : (
            <HeartOutlined style={{ fontSize: '16px' }} />
          )}
          {likes?.length}
        </PostBtn>
        <PostBtn>
          <CommentOutlined />
          {comments?.length}
        </PostBtn>
      </div>
    )
  }
)
