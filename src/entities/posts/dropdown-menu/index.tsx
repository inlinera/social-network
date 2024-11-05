import { items } from '@/shared/data/dropdown'
import { MoreOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

interface DropdownMenuEntityInterface {
  postId: string
}

export const DropdownMenuEntity = ({ postId }: DropdownMenuEntityInterface) => {
  return (
    <Dropdown menu={{ items: items(postId) }} trigger={['click']}>
      <button>
        <MoreOutlined />
      </button>
    </Dropdown>
  )
}
