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
import { UserBlock, UserFriendModal, AddPostBlockEntity } from '@/entities/user/'
import { isVisible } from '@/shared/constants/isContentVisible'

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore

  const {
    getUserPosts,
    posts: { posts },
  } = userPostsApi

  const { userId } = useParams()

  const [isOpenedFriend, setIsOpenedFriend] = useState(false)

  useEffect(() => {
    getUserPosts(`${userId}`)
    getUser(`${userId}`)
    setIsOpenedFriend(false)
  }, [userId])

  return (
    <div className={`${s.userBlock} flex fdc`}>
      {userInfo ? (
        <>
          <UserFriendModal isOpened={isOpenedFriend} setIsOpened={setIsOpenedFriend} />
          <div className={`${s.userInfo} grid`}>
            <UserBlock setIsOpenedFriend={setIsOpenedFriend} loading={loading} />
            <div className={`${s.userInfo_posts} flex fdc aic`}>
              {userInfo.displayName === authApi.user?.displayName && <AddPostBlockEntity />}
              <div className={`${s.posts} flex`}>
                {posts?.length !== 0 && isVisible(true) ? (
                  <PostListWidget posts={posts} isUserPosts loading={loading} />
                ) : (
                  <b>Posts did not found or account is private</b>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        'User is not found'
      )}
      <p>{error}</p>
    </div>
  )
})
