import { IMessage } from '@/shared/interfaces/IChat'
import deleteMsgApi from '@/shared/store/api/chats/chat/actions/delete-msg-api'
import inputState from '@/shared/store/functional/chat/input/input-state'
import { CopyOutlined, DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons'

export interface ContextMenu {
  my: ContextMenuItem[]
  notMy: ContextMenuItem[]
}

export interface ContextMenuItem {
  icon: React.ReactNode
  name: string
  onClick: () => void
}

const { setIsDefault, setVal, setActionMsg } = inputState

const copy = (s: string) =>
  navigator.clipboard
    .writeText(s)
    .then(() => {
      alert('Скопировано')
    })
    .catch(() => {
      alert(`Текст не скопирован`)
    })

const { deleteMessage } = deleteMsgApi

export const items = (msg: IMessage) => {
  return {
    my: [
      {
        icon: <EnterOutlined style={{ rotate: '180deg', fontWeight: 900 }} />,
        name: 'Reply',
        onClick: () => console.log('Reply'),
      },
      {
        icon: <CopyOutlined />,
        name: 'Copy',
        onClick: () => copy(msg.message),
      },
      {
        icon: <EditOutlined />,
        name: 'Edit',
        onClick: () => {
          setIsDefault(false)
          setVal(msg.message)
          setActionMsg(msg)
        },
      },
      {
        icon: <DeleteOutlined />,
        name: 'Delete',
        onClick: () => deleteMessage(msg),
      },
    ],
    notMy: [
      {
        icon: <EnterOutlined style={{ rotate: '180deg', fontWeight: 900 }} />,
        name: 'Reply',
        onClick: () => console.log('Reply'),
      },
    ],
  }
}
