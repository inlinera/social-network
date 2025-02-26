import { useEffect, useRef } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
import { v4 } from 'uuid'
// INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
// HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import { useSliceStr } from '@/shared/hooks/useSliceStr'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import sendMsgApi from '@/shared/store/api/chats/chat/details/send-msg-api'
import editMsgApi from '@/shared/store/api/chats/chat/details/edit-msg-api'
import InputState from '@/shared/store/functional/chat/input/input-state'
// ICONS
import { CloseOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons'
// COMPONENTS
import { ChatCommonMsgViewUi } from '../common/msg-view'
import storageApi from '@/shared/store/api/storage/storage-api'
import { useScrollBottom } from '@/shared/hooks/chats/useScrollBottom'

interface ChatInputUiProps {
  isAttachmentView: boolean
  img?: string | null
  setImg?: (url: string | null) => void
}

export const ChatInputUI = observer(({ isAttachmentView, img, setImg }: ChatInputUiProps) => {
  const { user } = authApi
  const inputRef = useRef<HTMLInputElement>(null)
  const { sendMessage } = sendMsgApi
  const { editMessage } = editMsgApi
  const { val, setVal } = InputState
  const { state, actionMsg, $null } = InputState
  const { uploadImage } = storageApi

  const send = () => {
    const msg = {
      userId: user?.displayName,
      message: useFormatInput(val),
      time: new Date().getTime(),
      id: state == 'edit' ? actionMsg?.id : v4(),
      reply: state == 'reply' ? actionMsg : state == 'edit' ? actionMsg?.reply : null,
      image: img && img,
    } as IMessage

    if (msg.message || img) {
      state !== 'edit' ? sendMessage(msg) : editMessage(msg)
      setImg?.(null)
      $null()
      useScrollBottom()
    } else {
      alert('Пожалуйста, введите сообщение')
    }
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send()
  }

  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const url = await uploadImage(files[0], 'photos')
    if (!url) {
      alert('Cannot upload image')
      return
    }
    setImg?.(url)
  }

  useEffect(() => {
    if (state === 'default' || !inputRef.current || !img) return
    inputRef.current.focus()
  }, [state])

  return (
    <div>
      {state !== 'default' && actionMsg && (
        <ChatCommonMsgViewUi id={actionMsg.id}>
          <div className={s.prev}>
            <b>Message:</b>
            <p>{useSliceStr(actionMsg.message, 15)}</p>
            <button
              className="fz17"
              onClick={e => {
                e.stopPropagation()
                $null()
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
          className={s.inputUi}
          placeholder="Enter your message"
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={onKeyPress}
        />
        <div className={`${s.inputEnd} flex aic`}>
          {isAttachmentView && (
            <>
              <input type="file" id="file" accept="image/*" hidden onChange={handleUpdate} />
              <label htmlFor="file" className="fz17">
                <PaperClipOutlined style={{ color: 'gray' }} />
              </label>
            </>
          )}
          <button className="fz17" onClick={send}>
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  )
})
