import { observer } from 'mobx-react-lite'

import authApi from '@/shared/store/api/user/auth/auth-api'

import { PostBtn } from '@/shared/ui/buttons/post-button'
import { AuthModal } from '@/entities/@common/auth-modal'

import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { IPost } from '@/shared/interfaces/IPost'

import { useLikePost } from '@/shared/hooks/posts/useLikePost'
import { useNav } from '@/shared/hooks/useNav'

type PostBtnLineProps = Pick<IPost, 'id' | 'comments' | 'likes'>

export const PostBtnLine = observer(({ id, comments, likes }: PostBtnLineProps) => {
  const { user } = authApi

  const navigate = useNav(`/posts/${id}`)

  const { loading, isAuthModalOpened, setIsAuthModalOpened, postLikes, handleLike } = useLikePost(id, likes, user)

  return (
    <>
      <AuthModal isOpened={isAuthModalOpened} setIsOpened={setIsAuthModalOpened} />
      <div className="flex aic">
        <PostBtn onClick={() => !loading && handleLike()} loading={loading} disabled={loading}>
          {postLikes?.includes(`${user?.displayName}`) ? <HeartFilled /> : <HeartOutlined />}
          {postLikes?.length}
        </PostBtn>
          <PostBtn onClick={navigate}>
            <CommentOutlined />
            {comments?.length}
          </PostBtn>
      </div>
    </>
  )
})
