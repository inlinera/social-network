import { IFriend } from './IFriend'

export interface IMessage {
  id: string
  message: string
  time: number
  userId: string
  reply: IMessage
}

export interface IChat {
  messages: IMessage[]
  people: IFriend[]
  chatId: string
  pinned: IMessage[]
}
