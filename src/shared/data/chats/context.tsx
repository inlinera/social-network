import { copyText } from '@/shared/constants/copyText'

import { IChat, IMessage } from '@/shared/interfaces/IChat'

import deleteMsgApi from '@/shared/store/api/chats/chat/details/delete-msg-api'
import pinMsgApi from '@/shared/store/api/chats/chat/details/pin-msg-api'
import unpinMsgApi from '@/shared/store/api/chats/chat/details/unpin-msg-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import inputState from '@/shared/store/functional/chat/input/input-state'

import { CopyOutlined, DeleteOutlined, EditOutlined, EnterOutlined, PushpinOutlined } from '@ant-design/icons'

import { useTranslation } from 'react-i18next'

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
const {
  setState,
  val: { setVal },
  setActionMsg,
} = inputState

//API
const { deleteMessage } = deleteMsgApi
const { pinMessage } = pinMsgApi
const { unpinMessage } = unpinMsgApi

// SOME COMMON ITEMS

const common = (msg: IMessage, chat: IChat | null) => {
  const { t } = useTranslation()
  const isMsgPinned = chat?.pinned.find(pinnedMsg => pinnedMsg.id == msg.id)

  return [
    {
      icon: <EnterOutlined style={{ rotate: '180deg', fontWeight: 900 }} />,
      name: t('chats.window.contextMenu.reply'),
      onClick: () => {
        setState('reply')
        setActionMsg(msg)
      },
    },
    {
      icon: <CopyOutlined />,
      name: t('chats.window.contextMenu.copy'),
      onClick: () => copyText(msg.message),
    },
    {
      icon: <PushpinOutlined />,
      name: isMsgPinned ? t('chats.window.contextMenu.unpin') : t('chats.window.contextMenu.pin'),
      onClick: () => (isMsgPinned ? unpinMessage(msg) : pinMessage(msg)),
    },
  ]
}

export const items = (msg: IMessage) => {
  const { chat } = getChatApi
  const { t } = useTranslation()

  return {
    my: [
      ...common(msg, chat),
      {
        icon: <EditOutlined />,
        name: t('chats.window.contextMenu.edit'),
        onClick: () => {
          setState('edit')
          setVal(msg.message)
          setActionMsg(msg)
        },
      },
      {
        icon: <DeleteOutlined />,
        name: t('chats.window.contextMenu.delete'),
        onClick: () => deleteMessage(msg),
      },
    ],
    notMy: common(msg, chat),
  }
}
