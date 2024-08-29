import s from './index.module.scss'
import { observer } from "mobx-react-lite"
//COMPONENTS
import { PostWidget } from "@/widgets/post"
import { FC } from 'react'
import { IPost } from '@/shared/interfaces/IPost'

export const PostListWidget: FC<{ loading?: boolean, posts?: IPost[] }> = observer(({ loading, posts }) => {

  return (
    <div className={`${s.postsList} flex fdc aic `}>
      {loading 
      ? 
      'loading'
      :
      posts?.map(p => <PostWidget post={p} key={p.id}/>)
      }
    </div>
  )
})