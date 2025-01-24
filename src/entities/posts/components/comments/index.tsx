import { useState } from 'react'
import s from './index.module.scss'
import { IComment } from '@/shared/interfaces/IComment'
import { CommentUi } from './ui/comment'
import { InputUi } from '@/shared/ui/input'
// ICONS
import { SendHorizontal } from 'lucide-react'

interface PostCommentsListProps {
  comments: IComment[]
}

export const PostCommentsList = ({ comments }: PostCommentsListProps) => {
  const [commVal, setCommVal] = useState('')
  return (
    <div className={`${s.commentsList} flex fdc jcc aic`}>
      <div className={`${s['input-block']} flex fdc jcc`}>
        <div className="flex aic jcsb">
          <h3>Here you can text comment:</h3>
          <div className="flex">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
        <div className="flex jcc aic">
          <InputUi value={commVal} setVal={setCommVal} maxLength={201} />
          <button>
            <SendHorizontal />
          </button>
        </div>
        <b>{commVal.length}/200</b>
      </div>
      {comments?.map(c => (
        <CommentUi userName={c.userName} content={c.content} />
      ))}
    </div>
  )
}
