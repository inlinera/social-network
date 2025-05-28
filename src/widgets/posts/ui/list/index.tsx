import { PostWidget } from '@/entities/posts/components/post'
import { IPost } from '@/shared/interfaces/IPost'
import { PostComment } from './comment'

export const postsMap = (posts?: IPost[] | null, isUserPosts?: boolean) => {
  return posts?.map((p, arrId) => {
    const isEven2 = arrId % 2 === 0

    return (
      <div key={p.id}>
        <PostWidget post={p} loadingPost={false} />
        {isEven2 && !isUserPosts && <PostComment post={p} />}
      </div>
    )
  })
}
