import { IFriend } from './IFriend'

export interface IMessage {
  message: string
  time: number
  userId: string
}

export interface IChat {
  messages: IMessage[]
  people: IFriend[]
  chatId: string
}
