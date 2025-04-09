import { useCopyText } from '@/shared/hooks/useCopyText'
import { IPost } from '@/shared/interfaces/IPost'
import deletePostApi from '@/shared/store/api/posts/post/actions/delete-post-api'

import { Copy, Pencil, Trash } from 'lucide-react'

export interface IDropdownListItem {
  icon?: React.ReactNode
  content: string
  onClick: itemClickT
}

type voidBoolT = (_: boolean) => void
type itemClickT = () => void

const { deletePost } = deletePostApi

const edit = (onClick: itemClickT): IDropdownListItem => ({
  content: 'Edit post',
  icon: <Pencil />,
  onClick: onClick,
})

const del = (onClick: itemClickT): IDropdownListItem => ({
  content: 'Delete post',
  icon: <Trash />,
  onClick: onClick,
})

export const items = (isAdmin: boolean, post: IPost, setIsEditing: voidBoolT): IDropdownListItem[] => [
  ...(isAdmin ? [edit(() => setIsEditing(true)), del(() => deletePost(post.id))] : []),
  {
    content: 'Copy',
    icon: <Copy />,
    onClick: () => useCopyText(post.value),
  },
]
