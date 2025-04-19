import s from './index.module.scss'

import postsApi from '@/shared/store/api/posts/posts-api'

import { useTranslation } from 'react-i18next'

import { Plus, RotateCw } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const PostsPageHeader = observer(() => {
  const {
    tag: { tag, setTag },
    reload,
  } = postsApi

  const { t } = useTranslation()

  return (
    <div className={`${s.postsHeader} flex aic jcsb`}>
      <h1>
        {t('posts.latest')}{' '}
        {tag && (
          <>
            {t('posts.tagged')} <span>{tag}</span>
          </>
        )}
      </h1>
      <div className="flex aic">
        {tag && (
          <button className="flex aic jcc" onClick={() => setTag(null)}>
            <Plus style={{ rotate: '45deg' }} />
          </button>
        )}
        <button className="flex aic jcc" onClick={reload}>
          <RotateCw />
        </button>
      </div>
    </div>
  )
})
