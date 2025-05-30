import s from './index.module.scss'

import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'

import userApi from '@/shared/store/api/user/profile/user-api'
import { observer } from 'mobx-react-lite'
import { useVirtualizer } from '@tanstack/react-virtual'

import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { PostComment } from './ui/list/comment'

interface PostListWidgetProps {
  posts?: IPost[]
  loading: boolean
  isUserPosts?: boolean
  empty?: boolean
}

export const PostListWidget = observer(({ posts, loading, isUserPosts, empty }: PostListWidgetProps) => {
  const { userInfo } = userApi
  const { t } = useTranslation()
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: posts?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 2,
    measureElement: element => {
      return element.getBoundingClientRect().height
    },
  })

  return (
    <div className={`${s.postsList} flex fdc`}>
      {isUserPosts && <h1>{t('profile.posts._', { name: `@${userInfo.displayName}` })}</h1>}

      <div ref={parentRef} style={{ height: '100%', overflowY: 'hidden' }}>
        <div
          key={posts?.map(post => post.id).join('-')}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow, id) => {
            const post = posts?.[virtualRow.index]
            const isEven2 = id % 2 === 0

            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <PostWidget post={post} loadingPost={false} />
                {isEven2 && !isUserPosts && <PostComment post={post!} />}
              </div>
            )
          })}
        </div>
      </div>

      {!empty && loading && Array.from({ length: 5 }, (_, index) => <PostWidget loadingPost key={index} />)}
    </div>
  )
})
