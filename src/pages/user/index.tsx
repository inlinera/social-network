import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import s from './index.module.scss'
// MOBX
import authorizationApi from '@/shared/store/auth-api'
import userStore from '@/shared/store/user-api'
import userPostsApi from '@/shared/store/user-posts-api'
// COMPONENTS
import { Spin } from 'antd'
import { PostListWidget } from '@/widgets/postList'
import { UserBlock } from '@/entities/user/index'
import { UserFriendModal } from '@/entities/user/index'
import { AddPostBlockEntity } from '@/entities/user/index'
//HOOKS
import { useGetFriends } from '@/shared/hooks/useGetFriends'

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { user } = authorizationApi
  const { userId } = useParams()

  const [targetUserInfo, myUserInfoFriend] = useGetFriends(userInfo!, user!)

  const [isOpenedFriend, setIsOpenedFriend] = useState(false)

  useEffect(() => {
    getUserPosts(userId!)
    getUser(userId!)
    setIsOpenedFriend(false)
  }, [userId])

  return (
    <div className={`${s.userBlock} jcc aic flex fdc`}>
      {userInfo ? (
        <>
          <UserFriendModal
            userInfo={userInfo}
            isOpened={isOpenedFriend}
            setIsOpened={setIsOpenedFriend}
          />
          {loading ? (
            <>
              <Spin size="large" />
              <p style={{ marginTop: '5px' }} className="cw">
                Loading user
              </p>
            </>
          ) : (
            <div className={`${s.userInfo} jcc grid cw`}>
              <UserBlock
                userInfo={userInfo}
                userInfoFriend={targetUserInfo}
                myUserInfoFriend={myUserInfoFriend}
                setIsOpenedFriend={setIsOpenedFriend}
              />
              <div className={`${s.userInfo_posts} flex fdc jcc aic`}>
                <AddPostBlockEntity />
                {posts?.length != 0 && <PostListWidget posts={posts} isUserPosts={true} />}
              </div>
            </div>
          )}
        </>
      ) : (
        'User not found'
      )}
      <p>{error}</p>
    </div>
  )
})
