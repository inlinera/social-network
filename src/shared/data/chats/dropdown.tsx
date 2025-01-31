import deleteChatApi from '@/shared/store/api/chats/chat/actions/delete-chat-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { DeleteOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/es/menu/interface'

const style = { fontSize: '18px' }

export const items = (userId: string, chatId = `${getChatApi.chat?.chatId}`): ItemType[] => {
  const { deleteChat } = deleteChatApi
  return [
    {
      label: 'Delete chat',
      key: '1',
      icon: <DeleteOutlined style={style} />,
      onClick: () => deleteChat(chatId, userId),
    },
  ]
}
