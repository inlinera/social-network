import { DropdownUi } from '@/shared/ui/dropdown'

import { MoreOutlined } from '@ant-design/icons'

import { items } from './constants'
import { IPost } from '@/shared/interfaces/IPost'
import { useCallback } from 'react'
import { postState } from '@/shared/store/functional/posts/edit-state'
import { useNav } from '@/shared/hooks/useNav'

interface DropdownMenuEntityInterface {
  isAdmin: boolean
  post: IPost
}

export const DropdownMenuEntity = ({ isAdmin, post }: DropdownMenuEntityInterface) => {
  const {
    editPost: { setEditPost },
  } = postState

  if (!post) return
  const nav = useNav(`/posts/${post.id}`)

  const navEdit = useCallback(() => {
    setEditPost(post.id)
    nav()
  }, [])

  return (
    <DropdownUi items={items(isAdmin, post, navEdit)}>
      <MoreOutlined />
    </DropdownUi>
  )
}
