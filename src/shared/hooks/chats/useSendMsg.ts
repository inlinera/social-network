import { IMessage } from '@/shared/interfaces/IChat'

import authApi from '@/shared/store/api/user/auth/auth-api'
import editMsgApi from '@/shared/store/api/chats/chat/details/edit-msg-api'
import sendMsgApi from '@/shared/store/api/chats/chat/details/send-msg-api'
import InputState from '@/shared/store/functional/chat/input/input-state'

import { v4 } from 'uuid'

import { useScrollBottom } from './useScrollBottom'
import { useScrollToMsg } from './useScrollToMsg'
import { useUploadImg } from '../details/useUploadImg'

import { error } from '@/shared/data/toastify'

export const useSendMsg = <T extends string | null>(image?: T, setImage?: (_: T) => void) => {
  const { user } = authApi
  const { sendMessage } = sendMsgApi
  const { editMessage } = editMsgApi
  const {
    val: { val },
  } = InputState
  const { state, actionMsg, $null } = InputState

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault()

    const msg = {
      userId: user?.displayName,
      message: val.trim(),
      id: state == 'edit' ? actionMsg?.id : v4(),
      reply: state == 'reply' ? actionMsg : state == 'edit' ? actionMsg?.reply : null,
      image,
    } as Omit<IMessage, 'time'>

    if (msg.message || image) {
      if (state !== 'edit') sendMessage(msg).then(() => useScrollBottom(msg.id))
      else editMessage({ ...actionMsg!, ...msg }).then(() => useScrollToMsg(`${actionMsg?.id}`))
      setImage?.(null as T)
      $null()
    } else {
      error('Пожалуйста, введите сообщение')
    }
  }

  const handleUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const url = await useUploadImg(files[0])
    setImage?.(url as T)
  }

  return { handleUploadImg, sendMsg }
}
