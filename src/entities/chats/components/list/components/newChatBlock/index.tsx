import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
// ICONS
import { ArrowLeft } from 'lucide-react'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { ChatComponent } from '../chat'
import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'
import { useNavChat } from '@/shared/hooks/chats/useNavChat'
import { useNav } from '@/shared/hooks/useNav'
import { IUser } from '@/shared/interfaces/IUser'

interface NewChatBlockProps {
  setIsVisible: (_: boolean) => void
}

export const NewChatBlock = observer(({ setIsVisible }: NewChatBlockProps) => {
  const { user } = authApi
  const { getUser, userInfo } = userApi
  const [val, setVal] = useState('')

  const handleGetUser = (id: string) => {
    getUser(id)
    return userInfo
  }
  const navToChats = useNav(`/chats`)
  const handleChat = (userData: IUser) => {
    useNavChat(userData)
    navToChats()
  }
  return (
    <div className={`${s.newChatBlock} flex fdc`}>
      <div className={`${s.newChatBlock__up} flex aic`}>
        <button>
          <ArrowLeft onClick={() => setIsVisible(false)} />
        </button>
        <InputUi value={val} setVal={setVal} placeholder="Enter friend's name" />
      </div>
      <div className={`${s.newChatBlock__main} flex fdc aic`}>
        {user?.friends?.map(f => {
          const userData = handleGetUser(f.displayName)
          return (
            <button key={f.displayName} onClick={() => handleChat(userData)}>
              <ChatComponent loading={false} chatUser={f.displayName} />
            </button>
          )
        })}
      </div>
    </div>
  )
})
