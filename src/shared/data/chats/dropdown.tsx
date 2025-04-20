import { IDropdownListItem } from '@/entities/posts/components/post/ui/dropdown/constants'
import deleteChatApi from '@/shared/store/api/chats/chat/actions/delete-chat-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const style = { fontSize: '18px' }

export const items = (userId: string, chatId = `${getChatApi.chat?.chatId}`): IDropdownListItem[] => {
  const { deleteChat } = deleteChatApi
  const { t } = useTranslation()

  return [
    {
      content: t('chats.dropdown.delete'),
      icon: <DeleteOutlined style={style} />,
      onClick: () => deleteChat(chatId, userId),
    },
  ]
}
