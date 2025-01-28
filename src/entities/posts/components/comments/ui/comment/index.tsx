import s from './index.module.scss'
import { Link } from 'react-router-dom'
// ICONS
import { Trash } from 'lucide-react'
// MOBX
import deleteCommentApi from '@/shared/store/api/posts/post/details/comment/delete-comment-api'

interface CommentUiProps {
  userName?: string
  content: string | React.ReactNode
  postId?: string
}

export const CommentUi = ({ userName, content, postId }: CommentUiProps) => {
  const tempBtnSize = parseInt(document.body.style.fontSize)
  const { deleteComment } = deleteCommentApi
  return (
    <div className={`${s.comment} flex jcsb`}>
      <div className="flex fdc">
        {userName && (
          <Link to={`/user/${userName}`}>
            <b>@{userName}</b>
          </Link>
        )}
        <p>{content}</p>
      </div>
      <div className="flex aic">
        <button onClick={() => deleteComment({ userName, content }, `${postId}`)}>
          <Trash style={{ width: tempBtnSize, height: tempBtnSize }} />
        </button>
      </div>
    </div>
  )
}
