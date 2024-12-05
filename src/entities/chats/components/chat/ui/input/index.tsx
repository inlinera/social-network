import s from './index.module.scss'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import sendMsgApi from '@/shared/store/api/chats/chat/actions/send-msg-api'
//ICONS
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons'
import valueState from '@/shared/store/functional/chat/input/value-state'
import { observer } from 'mobx-react-lite'

export const ChatInputUI = observer(() => {
  const { user } = authApi
  const { sendMessage } = sendMsgApi
  const { val, setVal } = valueState
  const messageInfo = {
    userId: user?.displayName!,
    message: useFormatInput(val),
  }

  const send = () => {
    if (!messageInfo.message) return alert('pls enter something to input')
    sendMessage({ time: new Date().getTime(), ...messageInfo })
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
})
