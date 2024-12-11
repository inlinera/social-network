import { useEffect, useRef } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
import { v4 } from 'uuid'
//INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import { useSliceStr } from '@/shared/hooks/useSliceStr'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import sendMsgApi from '@/shared/store/api/chats/chat/actions/send-msg-api'
import editMsgApi from '@/shared/store/api/chats/chat/actions/edit-msg-api'
import InputState from '@/shared/store/functional/chat/input/input-state'
//ICONS
import { CloseOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons'
//COMPONENTS
import { ChatCommonMsgViewUi } from '../common/msg-view'

export const ChatInputUI = observer(() => {
  const { user } = authApi
  const inputRef = useRef<HTMLInputElement>(null)
  const { sendMessage } = sendMsgApi
  const { editMessage } = editMsgApi
  const { val, setVal } = InputState
  const { state } = InputState
  const { actionMsg } = InputState
  const { $null } = InputState

  const send = () => {
    const msg = {
      userId: user?.displayName,
      message: useFormatInput(val),
      time: new Date().getTime(),
      id: state == 'edit' ? actionMsg?.id : v4(),
      reply: state == 'reply' ? actionMsg : state == 'edit' ? actionMsg?.reply : null,
    } as IMessage

    if (!msg.message) return alert('Пожалуйста, введите сообщение')

    if (state == 'default' || state == 'reply') {
      sendMessage(msg)
    } else {
      editMessage(msg)
    }
    $null()
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') send()
  }

  useEffect(() => {
    if (state == 'default' || !inputRef.current) return
    inputRef.current?.focus()
  }, [state])

  return (
    <div>
      {state != 'default' && actionMsg && (
        <ChatCommonMsgViewUi>
          <div className={s.prev}>
            <b>Message:</b>
            <p>{useSliceStr(actionMsg?.message!, 15)}</p>
            <button className="fz17" onClick={$null}>
              <CloseOutlined />
            </button>
          </div>
        </ChatCommonMsgViewUi>
      )}
      <div className={`${s.input} flex aic`}>
        <input
          ref={inputRef}
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
    </div>
  )
})
