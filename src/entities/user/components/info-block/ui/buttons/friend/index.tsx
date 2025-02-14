import { observer } from 'mobx-react-lite'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
//ICONS
import {
  MessageOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { Link } from 'react-router-dom'
import createChatApi from '@/shared/store/api/chats/chat/actions/create-chat-api'
import userApi from '@/shared/store/api/user/profile/user-api'
import { useNav } from '@/shared/hooks/useNav'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'

interface InfoBlockFriendButtons {
  userInfoFriend: IFriend
  myUserInfoFriend: IFriend
}

export const InfoBlockFriendButtons = observer(
  ({ userInfoFriend, myUserInfoFriend }: InfoBlockFriendButtons) => {
    const { sendFriendRequest, acceptFriendRequest, removeFromFriends } = friendsApi
    const { createChat } = createChatApi
    const { userInfo } = userApi
    const { user } = authApi
    const { getChat } = getChatApi

    const userId = userInfo?.displayName

    const isMyPage = user?.displayName !== userInfo?.displayName

    const isUserFriend = user?.friends?.some(
      (friend: IFriend) => friend.displayName === userId
    )

    const isUserExistIncReq = user?.incomingReq?.some(
      (req: IFriend) => req.displayName === userId
    )
    const isUserExistOutReq = user?.outgoingReq?.some(
      (req: IFriend) => req.displayName === userId
    )
    const tempStyle = { fontSize: '18px', color: '#fff' }

    const isDMExists = user?.chats?.some(id => userInfo?.chats?.includes(id))

    const navToChats = useNav(`/chats`)

    const handleChat = async () => {
      let chatId
      if (!isDMExists) {
        chatId = await createChat(`${userId}`)
      } else {
        chatId = user?.chats.find(id => userInfo?.chats.includes(id))
      }
      if (!chatId) return alert('ERROR I CANNOT FIND CHAT ID')
      getChat(chatId)
      navToChats()
    }

    return (
      <div>
        {isMyPage ? (
          isUserFriend ? (
            <button onClick={handleChat}>
              <MessageOutlined style={tempStyle} />
            </button>
          ) : isUserExistIncReq ? (
            <RedButtonUI onClick={() => acceptFriendRequest(userInfoFriend, myUserInfoFriend)}>
              Accept
            </RedButtonUI>
          ) : isUserExistOutReq ? (
            <button onClick={() => removeFromFriends(userInfoFriend)}>
              <UserDeleteOutlined style={tempStyle} />
            </button>
          ) : (
            <button onClick={() => sendFriendRequest(userInfoFriend, myUserInfoFriend)}>
              <UserAddOutlined style={tempStyle} />
            </button>
          )
        ) : (
          <Link to={'/settings'}>
            <SettingOutlined style={tempStyle} />
          </Link>
        )}
      </div>
    )
  }
)
