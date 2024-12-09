//HOOKS
import { useCopyText } from '@/shared/hooks/useCopyText'
//INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
//MOBX
import deleteMsgApi from '@/shared/store/api/chats/chat/actions/delete-msg-api'
import inputState from '@/shared/store/functional/chat/input/input-state'
//ICONS
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
//FUNCTIONAL
const { setState, setVal, setActionMsg } = inputState
//API
const { deleteMessage } = deleteMsgApi

export const items = (msg: IMessage) => {
  const reply = {
    icon: <EnterOutlined style={{ rotate: '180deg', fontWeight: 900 }} />,
    name: 'Reply',
    onClick: () => {
      setState('reply')
      setActionMsg(msg)
    },
  }
  const copy = {
    icon: <CopyOutlined />,
    name: 'Copy',
    onClick: () => useCopyText(msg.message),
  }
  return {
    my: [
      reply,
      copy,
      {
        icon: <EditOutlined />,
        name: 'Edit',
        onClick: () => {
          setState('edit')
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
    notMy: [reply, copy],
  }
}
