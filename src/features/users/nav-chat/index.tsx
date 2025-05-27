import { useNavChat } from '@/shared/hooks/chats/useNavChat'
import { useNav } from '@/shared/hooks/useNav'
import { IUser } from '@/shared/interfaces/IUser'
import { chatState } from '@/shared/store/functional/chat/content'
import { MessageOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

interface NavChatFeatureProps {
  userInfo: IUser
}

export const NavChatFeature = observer(({ userInfo }: NavChatFeatureProps) => {
  const { setIsChat } = chatState

  const navToChats = useNav(`/chats`)

  const handleChat = () => {
    setIsChat(true)
    useNavChat(userInfo)
    navToChats()
  }

  return (
    <button onClick={handleChat}>
      <MessageOutlined style={{ fontSize: '18px', color: '#fff' }} />
    </button>
  )
})
