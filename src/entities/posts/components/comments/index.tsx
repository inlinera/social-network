import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import { IComment } from '@/shared/interfaces/IComment'

import { CommentUi } from './ui/comment'
import { CommentsListHeader } from './ui/header'

interface PostCommentsListProps {
  comments: IComment[]
  postId: string
}

export const PostCommentsList = observer(({ comments, postId }: PostCommentsListProps) => {
  return (
    <div className={`${s.commentsList} flex fdc jcc aic`}>
      <CommentsListHeader id={postId} />

      {comments?.map(c => (
        <CommentUi {...c} postId={postId} key={c.id} isPreview={false} />
      ))}
    </div>
  )
})
