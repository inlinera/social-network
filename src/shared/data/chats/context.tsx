import { IMessage } from '@/shared/interfaces/IChat'
import { CopyOutlined, DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons'

export interface ContextMenuItem {
  icon: React.ReactNode
  name: string
  onClick: () => void
}

const copy = (s: string) =>
  navigator.clipboard
    .writeText(s)
    .then(() => {
      alert('Скопировано')
    })
    .catch(() => {
      alert(`Текст не скопирован`)
    })

export const items = (data: IMessage): ContextMenuItem[] => [
  {
    icon: <EnterOutlined style={{ rotate: '180deg', fontWeight: 900 }} />,
    name: 'Reply',
    onClick: () => console.log('Reply'),
  },
  {
    icon: <CopyOutlined />,
    name: 'Copy',
    onClick: () => copy(data.message),
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
