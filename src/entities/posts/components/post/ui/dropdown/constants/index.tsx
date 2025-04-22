import { copyText } from '@/shared/constants/copyText'
import { IPost } from '@/shared/interfaces/IPost'
import deletePostApi from '@/shared/store/api/posts/post/actions/delete-post-api'

import { Copy, Pencil, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface IDropdownListItem {
  icon?: React.ReactNode
  content: string
  onClick: () => void
}

const { deletePost } = deletePostApi

export const items = (isAdmin: boolean, post: IPost, navEdit: () => void): IDropdownListItem[] => {
  const { t } = useTranslation()

  return [
    ...(isAdmin
      ? [
          {
            content: t('posts.dropdown.edit'),
            icon: <Pencil />,
            onClick: navEdit,
          },
          {
            content: t('posts.dropdown.delete'),
            icon: <Trash />,
            onClick: () => deletePost(post.id),
          },
        ]
      : []),
    {
      content: t('posts.dropdown.copy'),
      icon: <Copy />,
      onClick: () => copyText(post.value),
    },
  ]
}
