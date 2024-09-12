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
import { UserModal } from "@/entities/user/modal"
//HOOKS
import { useGetFriends } from "@/shared/hooks/useGetFriends"


export const UserPage = observer((): JSX.Element => {

  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { user } = authorizationApi
  const { userId } = useParams()

  const [ targetUserInfo, myUserInfoFriend ] = useGetFriends(userInfo!, user!)

  const [ isOpened, setIsOpened ] = useState(false)

  useEffect(() => {
    getUserPosts(userId!)
    getUser(userId!)
    setIsOpened(false)
  }, [userId])

  return (
    <div className={`${s.userBlock} jcc aic flex fdc`}>

      <UserModal userInfo={userInfo} user={user!} 
      isOpened={isOpened} setIsOpened={setIsOpened}/>

      {loading ? (
        <>
          <Spin size="large" />
          <p style={{ marginTop: "5px" }}>Loading user</p>
        </>
      ) : (
        <div className={`${s.userInfo} jcc grid cw`}>
          <UserBlock user={user!} userInfo={userInfo!}
           userInfoFriend={targetUserInfo} myUserInfoFriend={myUserInfoFriend} 
           setIsOpened={setIsOpened}/>
          <div className={`${s.userInfo_posts} flex fdc jcc aic`}>
            {posts?.length! > 0 &&
             <PostListWidget posts={posts!} />
            }
          </div>
        </div>
      )}
      <p>
        {error}
      </p>
    </div>
  )
})