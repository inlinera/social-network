export interface IComment {
  id: string
  userName?: string
  content: string | React.ReactNode
  likes: string[]
  dislikes: string[]
}
