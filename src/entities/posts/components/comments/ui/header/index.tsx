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
import { error } from '@/shared/data/toastify'

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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()

    const value = commVal.trim()
    if (!value) return error('Введите комментарий')

    addComment(commData(`${user?.displayName}`, value), id)
    setCommVal('')
  }

  return (
    user && (
      <form className={`${s['input-block']} flex fdc jcc`} onSubmit={handleSend}>
        <div className="flex jcc aic">
          <div className={s.avatar}>
            <AvatarUI
              loading={false}
              src={user.avatarUrl}
              userName={user.displayName}
              size={35}
              title={`You (${user.displayName})`}
            />
          </div>
          <InputUi value={commVal} setVal={setCommVal} maxLength={200} />
          <button>
            <SendHorizontal />
          </button>
        </div>
        <b>{commVal.length}/200</b>
      </form>
    )
  )
}
