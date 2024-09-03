import s from './index.module.scss'
import { observer } from "mobx-react-lite"
import 'react-loading-skeleton/dist/skeleton.css'
//COMPONENTS
import { PostWidget } from "@/widgets/post"
import { FC, useRef } from 'react'
import { IPost } from '@/shared/interfaces/IPost'
import Skeleton from 'react-loading-skeleton'

export const PostListWidget: FC<{ loading?: boolean, posts: IPost[] }> = observer(({ posts }) => {

  const containerRef = useRef<HTMLDivElement>(null)

  const width = (containerRef.current?.clientWidth)! - 20 || '95%'

  return (
    <div className={`${s.postsList} flex fdc jcc aic`} ref={containerRef}>
      {posts?.length == 0
        ? <Skeleton count={5} duration={1} width={width} height={150}
        style={{marginTop: '15px'}} borderRadius={'0.5rem'}/>
        : posts?.map(p => <PostWidget post={p} key={p.id} />)
      }
    </div>
  )
})