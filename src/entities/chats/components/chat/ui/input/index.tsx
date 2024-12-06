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
  const { isDefault, setIsDefault } = InputState
  const { actionMsg, setActionMsg } = InputState

  const send = () => {
    const msg = {
      userId: user?.displayName,
      message: useFormatInput(val),
      time: new Date().getTime(),
      id: isDefault ? v4() : actionMsg?.id,
    } as IMessage

    if (!msg.message) return alert('Пожалуйста, введите сообщение')

    if (isDefault) {
      sendMessage(msg)
    } else {
      editMessage(msg)
      setIsDefault(true)
    }
    setVal('')
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') send()
  }

  useEffect(() => {
    if (isDefault || !inputRef.current) return
    inputRef.current?.focus()
  }, [isDefault])

  return (
    <div>
      {(!isDefault || actionMsg) && (
        <ChatCommonMsgViewUi>
          <div className={s.prev}>
            <i>Message:</i> {useSliceStr(actionMsg?.message!, 15)}
            <button
              className="fz17"
              onClick={() => {
                setActionMsg(null)
                setIsDefault(true)
                setVal('')
              }}
            >
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
