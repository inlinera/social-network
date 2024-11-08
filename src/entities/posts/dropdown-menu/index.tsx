import { items } from '@/shared/data/dropdown'
import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

interface DropdownMenuEntityInterface {
  postId: string
  setIsEditing: (state: boolean) => void
}

export const DropdownMenuEntity = ({ postId, setIsEditing }: DropdownMenuEntityInterface) => {
  return (
    <Dropdown menu={{ items: items(postId, setIsEditing) }} trigger={['click']}>
      <button>
        <MoreOutlined />
      </button>
    </Dropdown>
  )
}
