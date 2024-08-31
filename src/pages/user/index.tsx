import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import s from "./index.module.scss"
import { token } from "@/shared/token/token"
// MOBX
import authorizationApi from "@/shared/store/auth-api"
import userStore from "@/shared/store/user-api"
import userPostsApi from "@/shared/store/user-posts-api"
import friendsApi from "@/shared/store/friends-api"
// COMPONENTS
import { Avatar, Button, Spin } from "antd"
import { FriendsPage } from "./friends"
import { PostListWidget } from "@/widgets/postList"

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { sendFriendRequest } = friendsApi
  const { userId } = useParams()
  const { user } = authorizationApi

  const getUserFriends = () => {
    if (userInfo && userInfo.friends) {
      if (userInfo?.friends.length! % 10 === 1) return `friend`
      else return `${userInfo?.friends.length} friends`
    } else return "Friends not found"
  }

  useEffect(() => {
    if (userId && user) {
      getUser(userId)
      getUserPosts(userId)
    }
  }, [userId, user])

  return (
    <div className={`${s.userBlock} jcc aic flex fdc`}>
      {loading ? (
        <>
          <Spin size="large" />
          <p style={{ marginTop: "5px" }}>Loading user</p>
        </>
      ) : (
        <div className={`${s.userInfo} jcc grid cw`}>
            <div className={`${s.userInfo_meta} grid jcc`}>
              <div className="grid aic">
                <Avatar size={100} icon={<img src={userInfo?.avatarUrl} alt="avatar" />} />
                <div className="flex aic">
                  <p style={{ whiteSpace: "nowrap" }}>{userInfo?.displayName}</p>
                  {token !== userId ? (
                    user?.outgoingReq.some(
                      (req) => req.userId === userId
                    ) ||
                    user?.friends.some((friend) => friend.userId === userId) ? (
                      <Button
                        type="primary"
                        onClick={() => console.log("q")}
                        className={s.userInfo_meta_btn}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => sendFriendRequest(userId!)}
                        className={s.userInfo_meta_btn}
                      >
                        +
                      </Button>
                    )
                  ) : (
                    "settings"
                  )}
                </div>
              </div>
              <div>
                <p>{userInfo?.description}</p>
                <p>{getUserFriends()}</p>
                <FriendsPage />
              </div>
            </div>
          <div className={`${s.userInfo_posts} flex fdc jcc aic`}>
            {posts?.length ? (
              <PostListWidget posts={posts} loading={loading} />
            ) : (
              "User don't have posts"
            )}
          </div>
        </div>
      )}
      <p>
        {error && `You can view only your friends, add to friends this user to view him profile,
       error: ${error}`}
      </p>
    </div>
  )
})