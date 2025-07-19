import s from './index.module.scss'

import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'

import { observer } from 'mobx-react-lite'
import { useVirtualizer } from '@tanstack/react-virtual'

import { useRef } from 'react'
import { PostsList } from './ui/list'

interface PostListWidgetProps {
  posts?: IPost[]
  loading: boolean
  isUserPosts?: boolean
  empty?: boolean
}

export const PostListWidget = observer(({ posts, loading, isUserPosts, empty }: PostListWidgetProps) => {
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
      <div ref={parentRef} style={{ height: '100%' }}>
        <PostsList rowVirtualizer={rowVirtualizer} posts={posts} isUserPosts={isUserPosts} />
      </div>

      {!empty && loading && Array.from({ length: 5 }, (_, index) => <PostWidget loadingPost key={index} />)}
    </div>
  )
})
