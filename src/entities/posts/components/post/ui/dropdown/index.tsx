import { DropdownUi } from '@/shared/ui/dropdown'

import { MoreOutlined } from '@ant-design/icons'

import { items } from './constants'
import { IPost } from '@/shared/interfaces/IPost'
import { useCallback } from 'react'
import { postState } from '@/shared/store/functional/posts/edit-state'
import { useNav } from '@/shared/hooks/useNav'
import { useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

interface DropdownMenuEntityInterface {
  isAdmin: boolean
  post: IPost
}

export const DropdownMenuEntity = observer(({ isAdmin, post }: DropdownMenuEntityInterface) => {
  const {
    editPost: { editPost, setEditPost },
  } = postState

  if (!post) return
  const { pathname } = useLocation()
  const nav = useNav(`/posts/${post.id}`)

  const navEdit = useCallback(() => {
    if (pathname !== `posts/${post.id}`) nav()
    setEditPost(post.id)
  }, [editPost])

  return (
    <DropdownUi items={items(isAdmin, post, navEdit)}>
      <MoreOutlined />
    </DropdownUi>
  )
})
