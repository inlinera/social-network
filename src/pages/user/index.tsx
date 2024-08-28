import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import s from './index.module.scss'
//MOBX
import authorizationApi from '@/shared/store/auth-api'
import userStore from '@/shared/store/user-api'
import postsApi from '@/shared/store/posts-api'
//COMPONENTS
import { Avatar, Spin } from 'antd'
import { PostWidget } from '@/widgets/post'
import { FriendsPage } from './friends'

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = postsApi
  const { userId } = useParams()
  const { user } = authorizationApi

  const getUserFriends = () => {
    if (userInfo && userInfo.friends) {
    if (userInfo?.friends.length! % 10 == 1) return `${userInfo?.friends.length} friend`
    else return `${userInfo?.friends.length} friends`
    }
    else return 'Friends not found'
  }

  useEffect(() => {
      console.log('User ID:', userId)
      if (userId) {
        getUser(userId)
        getUserPosts(userId)
      }
  }, [userId, user])

  return (
    <div>
      {loading
        ? <Spin size='large'/>
        : <div className={`${s.userInfo} jcc grid cw`}>
          <div className={`${s.userInfo_meta} grid jcc`}>
            <div className='grid aic'>
            <Avatar size={100} icon={<img src={userInfo?.avatarUrl} alt="avatar" />} />
            <p>{userInfo?.displayName}</p>
            </div>
            <div>
              <p>{userInfo?.description}</p>
              <p>{getUserFriends()}</p>
              <FriendsPage />
            </div>
          </div>
          <div className={`${s.userInfo_posts} grid jcc aic`}>
          {posts?.length 
            ?
            posts.map(p => <PostWidget username={p.username} value={p.value} userId={p.userId}
            key={p.value + p.username} />)
            : 'User don\'t have posts'
            }
          </div>
          </div>
      }
      <p>
      {error && `You can view only your friends, add to friends this user to view him profile,
       error: ${error}`}
      </p>
    </div>
  )
})