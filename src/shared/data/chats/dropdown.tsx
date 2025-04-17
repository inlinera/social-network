import deleteChatApi from '@/shared/store/api/chats/chat/actions/delete-chat-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { DeleteOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/es/menu/interface'
import { useTranslation } from 'react-i18next'

const style = { fontSize: '18px' }

export const items = (userId: string, chatId = `${getChatApi.chat?.chatId}`): ItemType[] => {
  const { deleteChat } = deleteChatApi
  const { t } = useTranslation()

  return [
    {
      label: t('chats.dropdown.delete'),
      key: '1',
      icon: <DeleteOutlined style={style} />,
      onClick: () => deleteChat(chatId, userId),
    },
  ]
}
