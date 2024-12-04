import { CopyOutlined, DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons'

export interface ContextMenuItem {
  icon: React.ReactNode
  name: string
  onClick: () => void
}

export const items: ContextMenuItem[] = [
  {
    icon: <EnterOutlined style={{ rotate: '180deg', fontWeight: 900 }} />,
    name: 'Reply',
    onClick: () => console.log('Reply'),
  },
  {
    icon: <CopyOutlined />,
    name: 'Copy',
    onClick: () => console.log('Copy'),
  },
  {
    icon: <EditOutlined />,
    name: 'Edit',
    onClick: () => console.log('Edit'),
  },
  {
    icon: <DeleteOutlined />,
    name: 'Delete',
    onClick: () => console.log('Delete'),
  },
]
