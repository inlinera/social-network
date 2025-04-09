import { IComment } from './IComment'

export interface IPost {
  uid: string
  userName: string
  userAvatar: string
  value: string
  id: string
  likes: []
  images?: string[]
  comments: IComment[]
  time: number
  tags: string[]
}
