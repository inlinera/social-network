import { useState } from 'react'
import s from './index.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'

import { v4 } from 'uuid'

import { IComment } from '@/shared/interfaces/IComment'
import { IPost } from '@/shared/interfaces/IPost'

import addCommentApi from '@/shared/store/api/posts/post/details/comment/add-comment-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { InputUi } from '@/shared/ui/input'
import { SendHorizontal } from 'lucide-react'

const commData = (userName: string, content: string): IComment => ({
  id: v4(),
  userName,
  content,
  likes: [],
  dislikes: [],
})

export const CommentsListHeader = ({ id }: Pick<IPost, 'id'>) => {
  const [commVal, setCommVal] = useState('')

  const { user } = authApi
  const { addComment } = addCommentApi

  const handleSend = () => {
    addComment(commData(`${user?.displayName}`, commVal), id)
    setCommVal('')
  }

  return (
    user && (
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
    )
  )
}
