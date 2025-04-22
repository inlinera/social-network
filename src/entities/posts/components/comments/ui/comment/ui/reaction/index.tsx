import { useCallback, useState } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import { IComment } from '@/shared/interfaces/IComment'

import authApi from '@/shared/store/api/user/auth/auth-api'
import editCommentApi from '@/shared/store/api/posts/post/details/comment/edit-comment-api'

import { ThumbsDown, ThumbsUp } from 'lucide-react'

import { newArray } from '@/shared/constants/posts/handleLike'
import { error } from '@/shared/data/toastify'

const colorStyle = (arr?: string[], name?: string) => ({
  fill: arr?.includes(`${name}`) ? '#fff' : 'transparent',
})

interface CommentReactionProps extends IComment {
  postId: string
}

export const CommentReaction = observer(({ ...props }: CommentReactionProps) => {
  const { postId, id } = props

  const [likes, setLikes] = useState<string[]>(props.likes ?? [])
  const [dislikes, setDislikes] = useState<string[]>(props.dislikes ?? [])

  const { user } = authApi
  const { editComment } = editCommentApi

  const handleReaction = useCallback(
    (type: 'like' | 'dislike') => {
      if (!user) return error('Необходима авторизация')
      const isLike = type === 'like'

      const newLikes = isLike
        ? newArray(likes, user?.displayName)
        : likes.filter(item => item !== user?.displayName)

      const newDislikes = isLike
        ? dislikes.filter(item => item !== user?.displayName)
        : newArray(dislikes, user?.displayName)

      setLikes(newLikes)
      setDislikes(newDislikes)

      return editComment({ ...props, likes: newLikes, dislikes: newDislikes }, `${postId}`)
    },
    [likes, dislikes]
  )

  return (
    id && (
      <div className={`${s.likes} flex aic`}>
        <button className="flex aic" onClick={() => handleReaction('like')}>
          <ThumbsUp style={colorStyle(likes, user?.displayName)} />
          {likes?.length}
        </button>
        <button className="flex aic" onClick={() => handleReaction('dislike')}>
          <ThumbsDown style={colorStyle(dislikes, user?.displayName)} />
          {dislikes?.length}
        </button>
      </div>
    )
  )
})
