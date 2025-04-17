import { useEffect, useRef } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
import { v4 } from 'uuid'

import { IMessage } from '@/shared/interfaces/IChat'

import { useFormatInput } from '@/shared/hooks/useFormatInput'
import { useSliceStr } from '@/shared/hooks/useSliceStr'

import authApi from '@/shared/store/api/user/auth/auth-api'
import sendMsgApi from '@/shared/store/api/chats/chat/details/send-msg-api'
import editMsgApi from '@/shared/store/api/chats/chat/details/edit-msg-api'
import storageApi from '@/shared/store/api/storage/storage-api'
import InputState from '@/shared/store/functional/chat/input/input-state'

import { CloseOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons'

import { ChatCommonMsgViewUi } from '../common/msg-view'

import { useScrollBottom } from '@/shared/hooks/chats/useScrollBottom'
import { useScrollToMsg } from '@/shared/hooks/useScrollToMsg'
import { error } from '@/shared/data/toastify'

import { useTranslation } from 'react-i18next'

interface ChatInputUiProps {
  isAttachmentView: boolean
  image?: string | null
  setImage?: (url: string | null) => void
}

export const ChatInputUI = observer(({ isAttachmentView, image, setImage }: ChatInputUiProps) => {
  const { user } = authApi
  const { sendMessage } = sendMsgApi
  const { editMessage } = editMsgApi
  const { val, setVal } = InputState
  const { state, actionMsg, $null } = InputState
  const { uploadImage } = storageApi

  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)

  const send = () => {
    const msg = {
      userId: user?.displayName,
      message: useFormatInput(val),
      id: state == 'edit' ? actionMsg?.id : v4(),
      reply: state == 'reply' ? actionMsg : state == 'edit' ? actionMsg?.reply : null,
      image,
    } as IMessage

    if (msg.message || image) {
      if (state !== 'edit') sendMessage(msg).then(() => useScrollBottom())
      else editMessage({ ...actionMsg, ...msg }).then(() => useScrollToMsg(`${actionMsg?.id}`))
      setImage?.(null)
      $null()
    } else {
      error('Пожалуйста, введите сообщение')
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
    setImage?.(url)
  }

  useEffect(() => {
    if (state === 'default' || !inputRef.current) return
    inputRef.current.focus()
  }, [state])

  return (
    <div>
      {state !== 'default' && actionMsg && (
        <ChatCommonMsgViewUi id={actionMsg.id}>
          <div className={s.prev}>
            <b>{t('chats.message')}:</b>
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
          placeholder={t('chats.window.input')}
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
