interface IMessage {
  message: string
  time: number
  userId: string
}

export interface IChat {
  messages: IMessage[]
  people: string[]
}
