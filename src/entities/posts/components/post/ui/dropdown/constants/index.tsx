import { useCopyText } from '@/shared/hooks/useCopyText'
import { IPost } from '@/shared/interfaces/IPost'
import deletePostApi from '@/shared/store/api/posts/post/actions/delete-post-api'

import { Copy, Pencil, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface IDropdownListItem {
  icon?: React.ReactNode
  content: string
  onClick: itemClickT
}

type itemClickT = () => void

const { deletePost } = deletePostApi

const edit = (onClick: itemClickT): IDropdownListItem => {
  const { t } = useTranslation()

  return {
    content: t('posts.dropdown.edit'),
    icon: <Pencil />,
    onClick: onClick,
  }
}

const del = (onClick: itemClickT): IDropdownListItem => {
  const { t } = useTranslation()

  return {
    content: t('posts.dropdown.delete'),
    icon: <Trash />,
    onClick: onClick,
  }
}

export const items = (isAdmin: boolean, post: IPost, navEdit: () => void): IDropdownListItem[] => {
  const { t } = useTranslation()

  return [
    ...(isAdmin ? [edit(navEdit), del(() => deletePost(post.id))] : []),
    {
      content: t('posts.dropdown.copy'),
      icon: <Copy />,
      onClick: () => useCopyText(post.value),
    },
  ]
}
