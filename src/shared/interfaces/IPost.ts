import { IComment } from './IComment'

export interface IPost {
  userName: string
  userAvatar: string
  value: string
  id: string
  likes: []
  images?: string[]
  comments: IComment[]
}