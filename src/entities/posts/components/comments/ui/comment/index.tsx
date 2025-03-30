import s from './index.module.scss'
import { Link } from 'react-router-dom'
// ICONS
import { Trash } from 'lucide-react'
// MOBX
import deleteCommentApi from '@/shared/store/api/posts/post/details/comment/delete-comment-api'
import { useState } from 'react'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { InView } from 'react-intersection-observer'

interface CommentUiProps {
  userName?: string
  content: string | React.ReactNode
  postId?: string
  isPreview: boolean
}

export const CommentUi = ({ userName, content, postId, isPreview }: CommentUiProps) => {
  const { deleteComment } = deleteCommentApi
  const { user } = authApi

  const [avatar, setAvatar] = useState<string | null>(null)

  const handleView = async (inView: boolean) => {
    if (inView && !avatar) {
      setAvatar(await useGetAvatar(`${userName}`))
    }
  }

  return (
    <InView as="div" onChange={handleView} className={`${s.comment} flex jcsb`}>
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
            <Trash
              style={{
                width: parseInt(document.body.style.fontSize),
                height: parseInt(document.body.style.fontSize),
              }}
            />
          </button>
        )}
      </div>
    </InView>
  )
}
