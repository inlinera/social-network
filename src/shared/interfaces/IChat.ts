import { IFriend } from './IFriend'

interface IMessage {
  message: string
  time: number
  userId: string
}

export interface IChat {
  messages: IMessage[]
  people: IFriend[]
}
