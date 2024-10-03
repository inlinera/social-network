import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import s from "./index.module.scss"
// MOBX
import authorizationApi from "@/shared/store/auth-api"
import userStore from "@/shared/store/user-api"
import userPostsApi from "@/shared/store/user-posts-api"
// COMPONENTS
import { Spin } from "antd"
import { PostListWidget } from "@/widgets/postList"
import { UserBlock } from "@/entities/user/info-block"
import { UserFriendModal } from "@/entities/user/modal/friend"
//HOOKS
import { useGetFriends } from "@/shared/hooks/useGetFriends"
import { UserTeamModal } from "@/entities/user/modal/team"


export const UserPage = observer(() => {

  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { user } = authorizationApi
  const { userId } = useParams()

  const [ targetUserInfo, myUserInfoFriend ] = useGetFriends(userInfo!, user!)

  //MODALS
  const [ isOpenedFriend, setIsOpenedFriend ] = useState(false)
  const [ isOpenedTeam, setIsOpenedTeam ] = useState(false)

  useEffect(() => {
    getUserPosts(userId!)
    getUser(userId!)
    setIsOpenedFriend(false)
  }, [userId])

  return (
    <div className={`${s.userBlock} jcc aic flex fdc`}>
      {
        userInfo
        ?
          <>
            <UserFriendModal userInfo={userInfo}
            isOpened={isOpenedFriend} setIsOpened={setIsOpenedFriend}/>

            <UserTeamModal userInfo={userInfo} isOpened={isOpenedTeam}
            setIsOpened={setIsOpenedTeam}/>

            {loading ? (
              <>
                <Spin size="large" />
                <p style={{ marginTop: "5px" }}>Loading user</p>
              </>
            ) : (
              <div className={`${s.userInfo} jcc grid cw`}>
                <UserBlock userInfo={userInfo}
                userInfoFriend={targetUserInfo} myUserInfoFriend={myUserInfoFriend} 
                setIsOpenedFriend={setIsOpenedFriend}
                setIsOpenedTeam={setIsOpenedTeam}
                />
                <div className={`${s.userInfo_posts} grid`}>
                  {posts?.length! > 0 &&
                  <PostListWidget posts={posts} isUserPosts={true}/>
                  }
                </div>
              </div>
            )}
          </>
        :
          'User not found'
      }
      <p>{error}</p>
    </div>
  )
})