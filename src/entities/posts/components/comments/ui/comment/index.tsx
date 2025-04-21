import s from './index.module.scss'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { Trash } from 'lucide-react'

import deleteCommentApi from '@/shared/store/api/posts/post/details/comment/delete-comment-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
import { InView } from 'react-intersection-observer'

import { AvatarT, handleView } from '@/shared/constants/components-observer/handleView'
import { IComment } from '@/shared/interfaces/IComment'
import { CommentReaction } from './ui/reaction'

interface CommentUiProps extends IComment {
  postId?: string
  isPreview: boolean
}

export const CommentUi = observer(({ postId, isPreview, ...props }: CommentUiProps) => {
  const { deleteComment } = deleteCommentApi
  const { user } = authApi

  const { userName, content } = props

  const [avatar, setAvatar] = useState<AvatarT>(null)

  return (
    <div className={`${s.comment} flex fdc`}>
      <div className="flex jcsb">
        <div className="flex jcc aic">
          <InView as="div" onChange={inView => handleView(`${userName}`, inView, avatar, setAvatar)}>
            {userName && <AvatarUI src={avatar} loading={avatar == ''} size={35} userName={`${userName}`} />}
          </InView>
          <div className="flex fdc">
            {userName && (
              <Link to={`/user/${userName}`}>
                <TextUi lines={1} loading={avatar == ''}>
                  <b>
                    @{userName} {userName === user?.displayName && '(You)'}
                  </b>
                </TextUi>
              </Link>
            )}
            <TextUi lines={1} loading={avatar == ''}>
              <p className={`${isPreview && s.preview}`}>{content}</p>
            </TextUi>
          </div>
        </div>
        <div className="flex aic">
          {userName && user?.displayName === userName && (
            <button onClick={() => deleteComment({ ...props }, `${postId}`)}>
              <Trash />
            </button>
          )}
        </div>
      </div>
      <CommentReaction postId={`${postId}`} {...props} />
    </div>
  )
})
