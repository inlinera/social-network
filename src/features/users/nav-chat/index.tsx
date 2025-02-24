import { useNavChat } from '@/shared/hooks/chats/useNavChat'
import { useNav } from '@/shared/hooks/useNav'
import { IUser } from '@/shared/interfaces/IUser'
import { MessageOutlined } from '@ant-design/icons'

interface NavChatFeatureProps {
  userInfo: IUser
}

export const NavChatFeature = ({ userInfo }: NavChatFeatureProps) => {
  const navToChats = useNav(`/chats`)
  const handleChat = () => {
    useNavChat(userInfo)
    navToChats()
  }

  return (
    <button onClick={handleChat}>
      <MessageOutlined style={{ fontSize: '18px', color: '#fff' }} />
    </button>
  )
}
