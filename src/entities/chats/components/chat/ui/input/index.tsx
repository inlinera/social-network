import { useState } from 'react'
import s from './index.module.scss'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
//MOBX
import authApi from '@/shared/store/auth-api'
import sendMsgApi from '@/shared/store/chats/chat/send-msg-api'
import chatState from '@/shared/store/functional/chat/chat-state'
//ICONS
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons'

export const ChatInputUI = () => {
  const { user } = authApi
  const { chat } = chatState
  const { sendMessage } = sendMsgApi
  const [val, setVal] = useState('')
  const messageInfo = {
    userId: user?.displayName!,
    message: useFormatInput(val),
  }

  const send = () => {
    if (!messageInfo.message) return alert('pls enter something to input')
    sendMessage({ time: new Date().getTime(), ...messageInfo }, chat?.chatId!)
    setVal('')
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') send()
  }
  return (
    <div className={`${s.input} flex aic`}>
      <input
        className={`${s.inputUi}`}
        placeholder="Enter your message"
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => onKeyPress(e)}
      />
      <div className={`${s.inputEnd} flex aic`}>
        <button className="fz17">
          <PaperClipOutlined style={{ color: 'gray' }} />
        </button>
        <button className="fz17" onClick={send}>
          <SendOutlined />
        </button>
      </div>
    </div>
  )
}
