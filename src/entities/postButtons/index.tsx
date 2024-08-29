import { FC, useState } from 'react'
//MOBX
import postsApi from '@/shared/store/posts-api'
//COMPONENTS
import { PostBtn } from '@/shared/ui/button'
import { observer } from 'mobx-react-lite'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'


export const PostBtnLine: FC<{ likes: [], postId: string, userId: string }> = observer((
    { likes, postId, userId }
    ) => {

    const { handlePostLike } = postsApi

    const [isLiked, setIsLiked] = useState<boolean>(likes?.includes(userId) || false)

    const handleLikeStateChange = (isLiked: boolean) => {
        setIsLiked(!isLiked)
        handlePostLike(isLiked, postId, userId)
    }

  return (
    <div className='flex jcc aic'>
        <PostBtn onClick={() => handleLikeStateChange(isLiked)}>
                {isLiked ? <HeartFilled style={{fontSize: '16px'}}/> 
                : <HeartOutlined style={{fontSize: '16px'}}/>}
                {likes?.length}
        </PostBtn>
    </div>
  )
})