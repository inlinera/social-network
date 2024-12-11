import { IComment } from '@/shared/interfaces/IComment'

interface PostCommentsListProps {
  comments: IComment[]
}

export const PostCommentsList = ({ comments }: PostCommentsListProps) => {
  return (
    <div>
      {comments?.map(c => (
        <p>
          {c.userName}. {c.content}
        </p>
      ))}
    </div>
  )
}
