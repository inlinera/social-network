import { IMessage } from '@/shared/interfaces/IChat'
import deleteMsgApi from '@/shared/store/api/chats/chat/actions/delete-msg-api'
import editMsgApi from '@/shared/store/api/chats/chat/actions/edit-msg-api'
import authApi from '@/shared/store/api/user/auth/auth-api'
import valueState from '@/shared/store/functional/chat/input/value-state'
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
const { editMessage } = editMsgApi

export const items = (data: IMessage) => {
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
        onClick: () => copy(data.message),
      },
      {
        icon: <EditOutlined />,
        name: 'Edit',
        onClick: () =>
          editMessage({
            userId: authApi.user?.displayName!,
            time: new Date().getTime(),
            message: valueState.val,
          }),
      },
      {
        icon: <DeleteOutlined />,
        name: 'Delete',
        onClick: () => deleteMessage(data),
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
