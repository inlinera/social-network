import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { DeleteOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/es/menu/interface'

const style = { fontSize: '18px' }

export const items = (chatId = getChatApi.chat?.chatId): ItemType[] => [
  {
    label: 'Delete chat',
    key: '1',
    icon: <DeleteOutlined style={style} />,
    onClick: () => console.log(chatId),
  },
]
