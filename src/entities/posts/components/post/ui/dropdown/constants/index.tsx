import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import deletePostApi from '@/shared/store/api/posts/post/actions/delete-post-api'

export interface IDropdownListItem {
  icon?: React.ReactNode
  content: string
  onClick: () => void
}

const style = { fontSize: '15px' }

const { deletePost } = deletePostApi

export const items = (postId: string, setIsEditing: (_: boolean) => void): IDropdownListItem[] => [
  {
    content: 'Edit post',
    icon: <EditOutlined style={style} />,
    onClick: () => setIsEditing(true),
  },
  {
    content: 'Delete post',
    icon: <DeleteOutlined style={style} />,
    onClick: () => deletePost(postId),
  },
]
