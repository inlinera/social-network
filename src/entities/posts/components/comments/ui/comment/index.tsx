import s from './index.module.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Trash } from 'lucide-react'

import deleteCommentApi from '@/shared/store/api/posts/post/details/comment/delete-comment-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'

import { InView } from 'react-intersection-observer'
import { AvatarT, handleView } from '@/shared/constants/components-observer/handleView'

interface CommentUiProps {
  userName?: string
  content: string | React.ReactNode
  postId?: string
  isPreview: boolean
}

export const CommentUi = ({ userName, content, postId, isPreview }: CommentUiProps) => {
  const { deleteComment } = deleteCommentApi
  const { user } = authApi

  const [avatar, setAvatar] = useState<AvatarT>(null)

  return (
    <InView
      as="div"
      onChange={inView => handleView(`${userName}`, inView, avatar, setAvatar)}
      className={`${s.comment} flex jcsb`}
    >
      <div className="flex jcc aic">
        <div>
          {userName && <AvatarUI src={avatar} loading={avatar == ''} size={35} userName={`${userName}`} />}
        </div>
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
          <button onClick={() => deleteComment({ userName, content }, `${postId}`)}>
            <Trash />
          </button>
        )}
      </div>
    </InView>
  )
}
