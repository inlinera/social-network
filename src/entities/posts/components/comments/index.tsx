import { useState } from 'react'
import s from './index.module.scss'

import { IComment } from '@/shared/interfaces/IComment'

import { CommentUi } from './ui/comment'
import { InputUi } from '@/shared/ui/input'
import { AvatarUI } from '@/shared/ui/avatar'

import { SendHorizontal } from 'lucide-react'

import addCommentApi from '@/shared/store/api/posts/post/details/comment/add-comment-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

interface PostCommentsListProps {
  comments: IComment[]
  postId: string
}

export const PostCommentsList = ({ comments, postId }: PostCommentsListProps) => {
  const { user } = authApi
  const [commVal, setCommVal] = useState('')

  const commData: IComment = {
    userName: user?.displayName,
    content: commVal,
  }

  const { addComment } = addCommentApi
  const handleSend = () => {
    console.log(postId, commData)
    setCommVal('')
    addComment(commData, postId)
  }

  return (
    <div className={`${s.commentsList} flex fdc jcc aic`}>
      {user && (
        <div className={`${s['input-block']} flex fdc jcc`}>
          <div className="flex jcc aic">
            <AvatarUI
              loading={false}
              src={user.avatarUrl}
              userName={user.displayName}
              size={35}
              title={`You (${user.displayName})`}
            />
            <InputUi value={commVal} setVal={setCommVal} maxLength={200} />
            <button onClick={handleSend}>
              <SendHorizontal />
            </button>
          </div>
          <b>{commVal.length}/200</b>
        </div>
      )}

      {comments?.map(c => (
        <CommentUi
          userName={c.userName!}
          content={c.content}
          postId={postId}
          key={c.content + `${c.userName}`}
          isPreview={false}
        />
      ))}
    </div>
  )
}
