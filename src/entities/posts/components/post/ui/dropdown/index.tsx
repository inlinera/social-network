import { DropdownUi } from '@/shared/ui/dropdown'

import { MoreOutlined } from '@ant-design/icons'

import { items } from './constants'
import { IPost } from '@/shared/interfaces/IPost'

interface DropdownMenuEntityInterface {
  isAdmin: boolean
  post: IPost
  setIsEditing: (state: boolean) => void
}

export const DropdownMenuEntity = ({ isAdmin, post, setIsEditing }: DropdownMenuEntityInterface) => {
  return (
    <DropdownUi items={items(isAdmin, post, setIsEditing)}>
      <MoreOutlined />
    </DropdownUi>
  )
}
