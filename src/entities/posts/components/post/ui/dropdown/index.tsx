import { DropdownUi } from '@/shared/ui/dropdown'

import { MoreOutlined } from '@ant-design/icons'

import { items } from './constants'

interface DropdownMenuEntityInterface {
  postId: string
  setIsEditing: (state: boolean) => void
}

export const DropdownMenuEntity = ({ postId, setIsEditing }: DropdownMenuEntityInterface) => {
  return (
    <DropdownUi items={items(postId, setIsEditing)}>
      <MoreOutlined />
    </DropdownUi>
  )
}
