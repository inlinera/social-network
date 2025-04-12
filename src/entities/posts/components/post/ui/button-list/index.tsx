import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import handleLikeApi from '@/shared/store/api/posts/post/details/handle-like-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

import { PostBtn } from '@/shared/ui/buttons/post-button'
import { Link } from 'react-router-dom'
import { AuthModal } from '@/entities/@common/auth-modal'

import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'

import { IComment } from '@/shared/interfaces/IComment'

interface PostBtnLineProps {
  likes: string[]
  setLikes: (_: string[]) => void
  comments: IComment[]
  postId: string
  userId: string
}

export const PostBtnLine = observer(({ likes, setLikes, comments, postId, userId }: PostBtnLineProps) => {
  const { user } = authApi
  const { handlePostLike } = handleLikeApi

  const [loading, setLoading] = useState(false)
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)

  const isIncludes = likes?.includes(`${user?.displayName}`)

  const handleLikeStateChange = async () => {
    if (!user) return setIsAuthModalOpened(true)
    setLoading(true)
    try {
      await handlePostLike(isIncludes, postId, userId)
      setLikes(!isIncludes ? [`${user?.displayName}`, ...likes] : likes.filter(u => u !== user?.displayName))
    } catch {
      null
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthModal isOpened={isAuthModalOpened} setIsOpened={setIsAuthModalOpened} />
      <div className="flex aic">
        <PostBtn onClick={() => !loading && handleLikeStateChange()} loading={loading} disabled={loading}>
          {isIncludes ? <HeartFilled /> : <HeartOutlined />}
          {likes?.length}
        </PostBtn>
        <Link to={`/posts/${postId}`}>
          <PostBtn>
            <CommentOutlined />
            {comments?.length}
          </PostBtn>
        </Link>
      </div>
    </>
  )
})
