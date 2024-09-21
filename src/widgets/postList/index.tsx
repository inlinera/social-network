import { FC, useRef } from 'react'
import s from './index.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
//COMPONENTS
import { PostWidget } from "@/widgets/post"
import { IPost } from '@/shared/interfaces/IPost'
import Skeleton from 'react-loading-skeleton'

interface PostListWidgetProps {
  posts?: IPost[]
  loading?: boolean
}

export const PostListWidget: FC<PostListWidgetProps> = ({ posts, loading }) => {

  const containerRef = useRef<HTMLDivElement>(null)

  const width = (containerRef.current?.clientWidth)! - 20 || '95%'

  return (
    <div className={`${s.postsList} flex fdc jcc aic`} ref={containerRef}>
      {loading || posts?.length == 0
        ? <Skeleton count={5} duration={1} width={width} height={150}
        style={{marginTop: '15px'}} borderRadius={'0.5rem'}/>
        : posts?.map(p => <PostWidget post={p} key={p.id} />)
      }
    </div>
  )
}