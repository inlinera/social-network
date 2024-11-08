import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/es/menu/interface'
import deletePostApi from '../store/delete-post-api'

const style = { fontSize: '15px' }

const { deletePost } = deletePostApi

export const items = (postId: string, setIsEditing: (state: boolean) => void): ItemType[] => [
  {
    label: 'Edit post',
    key: '1',
    icon: <EditOutlined style={style} />,
    onClick: () => setIsEditing(true),
  },
  {
    label: 'Delete post',
    key: '2',
    icon: <DeleteOutlined style={style} />,
    onClick: () => deletePost(postId),
  },
]
