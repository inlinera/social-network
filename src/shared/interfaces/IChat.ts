import { IFriend } from './IFriend'

export interface IMessage {
  id: string
  message: string
  time: number
  userId: string
  reply: IMessage
  image?: string
}

export interface IChat {
  messages: IMessage[]
  people: IFriend[]
  chatId: string
  pinned: IMessage[]
}
