import { IComment } from '@/shared/interfaces/IComment'
import s from './index.module.scss'
import { Link } from 'react-router-dom'

export const CommentUi = ({ userName, content }: IComment) => {
  return (
    <div className={`${s.comment}`}>
      {userName && (
        <Link to={`/user/${userName}`}>
          <b>@{userName}</b>
        </Link>
      )}
      <p>{content}</p>
    </div>
  )
}
