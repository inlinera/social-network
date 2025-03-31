//HOOKS
import { useCopyText } from '@/shared/hooks/useCopyText'
//INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
//MOBX
import deleteMsgApi from '@/shared/store/api/chats/chat/details/delete-msg-api'
import pinMsgApi from '@/shared/store/api/chats/chat/details/pin-msg-api'
import unpinMsgApi from '@/shared/store/api/chats/chat/details/unpin-msg-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import inputState from '@/shared/store/functional/chat/input/input-state'
//ICONS
import { CopyOutlined, DeleteOutlined, EditOutlined, EnterOutlined, PushpinOutlined } from '@ant-design/icons'

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
const { pinMessage } = pinMsgApi
const { unpinMessage } = unpinMsgApi

export const items = (msg: IMessage) => {
  const { chat } = getChatApi
  const isMsgPinned = chat?.pinned.find(pinnedMsg => pinnedMsg.id == msg.id)

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

  const pin = {
    icon: <PushpinOutlined />,
    name: isMsgPinned ? 'Unpin' : 'Pin',
    onClick: () => (isMsgPinned ? unpinMessage(msg) : pinMessage(msg)),
  }

  return {
    my: [
      reply,
      copy,
      pin,
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
    notMy: [reply, copy, pin],
  }
}
