import { EnumTags } from '@/shared/interfaces/IPost'
import s from './index.module.scss'
import { PostTagUi } from './ui/tag'
import { observer } from 'mobx-react-lite'

interface PostTagEntityProps {
  tags: EnumTags[]
}

export const PostTagEntity = observer(({ tags }: PostTagEntityProps) => {
  const fontSize = parseInt(document.body.style.fontSize) || 14

  return (
    <div className={`${s.tagsMap} flex`} style={{ fontSize }}>
      {tags && tags.map((t: EnumTags) => <PostTagUi name={t} key={t} />)}
    </div>
  )
})
