import userApi from "@/shared/store/user-api"

export const FriendsPage = () => {
  const { userInfo } = userApi
  return (
    <div>
        {userInfo?.friends.map(f => <div key={f}>
          {f}
        </div>)}
    </div>
  )
}
