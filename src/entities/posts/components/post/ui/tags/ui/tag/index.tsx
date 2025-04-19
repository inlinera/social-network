import s from './index.module.scss'

import postsApi from '@/shared/store/api/posts/posts-api'
import { Plus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useNav } from '@/shared/hooks/useNav'
import { TagT } from '@/shared/interfaces/IPost'

export const PostTagUi = observer(({ name }: { name: TagT }) => {
  const {
    tag: { tag, setTag },
  } = postsApi

  const nav = useNav('/')

  const selectTag = () => {
    nav()
    setTag(name)
  }

  const resetTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setTag(null)
  }

  return (
    <button className={`${s.tagOption} ${name === tag ? s.active : ''} flex aic`} onClick={selectTag}>
      {name}
      {name === tag && (
        <span className="flex jcc aic" onClick={resetTag}>
          <Plus style={{ rotate: '45deg' }} />
        </span>
      )}
    </button>
  )
})
