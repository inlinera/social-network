import { useEffect } from "react"
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
import { UserBlock } from "@/entities/user"

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { userId } = useParams()
  const { user } = authorizationApi

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
          <UserBlock user={user!} userInfo={userInfo!} userId={userId!}/>
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