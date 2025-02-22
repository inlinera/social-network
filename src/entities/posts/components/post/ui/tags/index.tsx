import s from './index.module.scss'
import { PostTagUi } from './ui/tag'

interface PostTagEntityProps {
  tags: string[]
}

export const PostTagEntity = ({ tags }: PostTagEntityProps) => {
  const fontSize = parseInt(document.body.style.fontSize) || 14
  return (
    <div className={`${s.tagsMap} flex`} style={{ fontSize }}>
      {tags && tags.map((t: string) => <PostTagUi name={t} key={t} />)}
    </div>
  )
}
