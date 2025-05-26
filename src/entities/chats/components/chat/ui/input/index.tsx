import { useEffect, useRef } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import InputState from '@/shared/store/functional/chat/input/input-state'

import { CloseOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons'

import { ChatCommonMsgViewUi } from '../common/msg-view'

import { useTranslation } from 'react-i18next'
import { useSendMsg } from '@/shared/hooks/chats/useSendMsg'
import { sliceStr } from '@/shared/constants/sliceStr'

import authApi from '@/shared/store/api/user/auth/auth-api'

interface ChatInputUiProps {
  isAttachmentView: boolean
  image?: string | null
  setImage?: (url: string | null) => void
  chattingUser?: string
}

export const ChatInputUI = observer(({ isAttachmentView, image, setImage, chattingUser }: ChatInputUiProps) => {
  const {
    val: { val, setVal },
    state,
    actionMsg,
    $null,
  } = InputState

  const { user } = authApi

  const { t } = useTranslation()
  const { handleUploadImg, sendMsg } = useSendMsg(image, setImage)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state === 'default' || !inputRef.current) return
    inputRef.current.focus()
  }, [state])

  return (
    <div>
      {state !== 'default' && actionMsg && (
        <ChatCommonMsgViewUi id={actionMsg.id}>
          <div className={s.prev}>
            <b>{t('chats.window.message')}:</b>
            <p>
              {actionMsg.image && t('chats.photo')} {sliceStr(actionMsg.message, 15)}
            </p>
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
      {user?.friends?.some(friend => friend.displayName === chattingUser) ? (
        <form className={`${s.input} flex aic`}>
          <input
            ref={inputRef}
            className={s.inputUi}
            placeholder={t('chats.window.input')}
            type="text"
            value={val}
            onChange={e => setVal(e.target.value)}
          />
          <div className={`${s.inputEnd} flex aic`}>
            {isAttachmentView && (
              <>
                <input type="file" id="file" accept=".png,.jpg,.jpeg,.gif" hidden onChange={handleUploadImg} />
                <label htmlFor="file" className="fz17">
                  <PaperClipOutlined style={{ color: 'gray' }} />
                </label>
              </>
            )}
            <button className="fz17" onClick={sendMsg}>
              <SendOutlined />
            </button>
          </div>
        </form>
      ) : (
        <div className={`${s.unavailable} flex jcc aic`}>
          <b>Add @{chattingUser} to friends to send messages</b>
        </div>
      )}
    </div>
  )
})
