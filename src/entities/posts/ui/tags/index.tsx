import { PostTagUi } from './ui/tag'

interface PostTagEntityProps {
  tags: string[]
}

export const PostTagEntity = ({ tags }: PostTagEntityProps) => {
  return (
    <div className="flex">
      {tags && tags.map((t: string) => <PostTagUi name={t} key={t} />)}
    </div>
  )
}
