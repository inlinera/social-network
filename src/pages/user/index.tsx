import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import s from './index.module.scss'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import userStore from '@/shared/store/api/user/profile/user-api'
import userPostsApi from '@/shared/store/api/user/profile/user-posts-api'
// COMPONENTS
import { PostListWidget } from '@/widgets/posts'
import { UserBlock } from '@/entities/user/index'
import { UserFriendModal } from '@/entities/user/index'
import { AddPostBlockEntity } from '@/entities/user/index'
import { LoadingUI } from '@/shared/ui/loading'

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { userId } = useParams()

  const [isOpenedFriend, setIsOpenedFriend] = useState(false)

  useEffect(() => {
    getUserPosts(userId!)
    getUser(userId!)
    setIsOpenedFriend(false)
  }, [userId])

  return loading ? (
    <LoadingUI>User is loading...</LoadingUI>
  ) : (
    <div className={`${s.userBlock} flex fdc jcc aic`}>
      {userInfo ? (
        <>
          <UserFriendModal
            userInfo={userInfo}
            isOpened={isOpenedFriend}
            setIsOpened={setIsOpenedFriend}
          />
          <div className={`${s.userInfo} grid jcc cw`}>
            <UserBlock setIsOpenedFriend={setIsOpenedFriend} />
            <div className={`${s.userInfo_posts} flex fdc jcc aic`}>
              {userInfo.displayName == authApi.user?.displayName && <AddPostBlockEntity />}
              {posts?.length != 0 && <PostListWidget posts={posts} isUserPosts />}
            </div>
          </div>
        </>
      ) : (
        'User not found'
      )}
      <p>{error}</p>
    </div>
  )
})
