import s from './index.module.scss'
import { Link } from 'react-router-dom'
// ICONS
import { Trash } from 'lucide-react'
// MOBX
import deleteCommentApi from '@/shared/store/api/posts/post/details/comment/delete-comment-api'
import { useState } from 'react'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { useSliceStr } from '@/shared/hooks/useSliceStr'

interface CommentUiProps {
  userName?: string
  content: string | React.ReactNode
  postId?: string
  isPreview: boolean
}

export const CommentUi = ({ userName, content, postId, isPreview }: CommentUiProps) => {
  const tempBtnSize = parseInt(document.body.style.fontSize)
  const { deleteComment } = deleteCommentApi
  const { user } = authApi
  const [avatar, setAvatar] = useState('')
  const avatarUrl = async () => {
    const url = await useGetAvatar(`${userName}`)
    setAvatar(url)
  }
  avatarUrl()
  return (
    <div className={`${s.comment} flex jcsb`}>
      <div className="flex jcc aic">
        <div>{userName && <AvatarUI src={avatar} loading={avatar == ''} size={35} />}</div>
        <div className="flex fdc">
          {userName && (
            <Link to={`/user/${userName}`}>
              <TextUi lines={1} loading={avatar == ''}>
                <b>@{userName}</b>
              </TextUi>
            </Link>
          )}
          <TextUi lines={1} loading={avatar == ''}>
            <p>{isPreview ? useSliceStr(`${content}`, 16) : content}</p>
          </TextUi>
        </div>
      </div>
      <div className="flex aic">
        {userName && user?.displayName == userName && (
          <button onClick={() => deleteComment({ userName, content }, `${postId}`)}>
            <Trash style={{ width: tempBtnSize, height: tempBtnSize }} />
          </button>
        )}
      </div>
    </div>
  )
}
