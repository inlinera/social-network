import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'
import { PostComment } from '../comment'
import { v4 } from 'uuid'
import { Virtualizer } from '@tanstack/react-virtual'

interface PostsListProps {
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
  posts?: IPost[] | null
  isUserPosts?: boolean
}

export const PostsList = ({ rowVirtualizer, posts, isUserPosts }: PostsListProps) => {
  return (
    <div
      key={v4()}
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {rowVirtualizer.getVirtualItems().map(virtualRow => {
        const post = posts?.[virtualRow.index]
        const isEven2 = virtualRow.index % 2 === 0

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
  )
}
