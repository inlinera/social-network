import s from './index.module.scss'
import { Link } from 'react-router-dom'
// ICONS
import { Trash } from 'lucide-react'
// MOBX
import deleteCommentApi from '@/shared/store/api/posts/post/details/comment/delete-comment-api'
import { Avatar } from 'antd'
import { useState } from 'react'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'

interface CommentUiProps {
  userName?: string
  content: string | React.ReactNode
  postId?: string
}

export const CommentUi = ({ userName, content, postId }: CommentUiProps) => {
  const tempBtnSize = parseInt(document.body.style.fontSize)
  const { deleteComment } = deleteCommentApi
  const [avatar, setAvatar] = useState('')
  const avatarUrl = async () => {
    const url = await useGetAvatar(`${userName}`)
    setAvatar(url)
  }
  avatarUrl()
  return (
    <div className={`${s.comment} flex jcsb`}>
      <div className="flex jcc aic">
        <div>{userName && <Avatar size={'default'} src={avatar} draggable={false} />}</div>
        <div className="flex fdc">
          {userName && (
            <Link to={`/user/${userName}`}>
              <b>@{userName}</b>
            </Link>
          )}
          <p>{content}</p>
        </div>
      </div>
      <div className="flex aic">
        <button onClick={() => deleteComment({ userName, content }, `${postId}`)}>
          <Trash style={{ width: tempBtnSize, height: tempBtnSize }} />
        </button>
      </div>
    </div>
  )
}
