import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import s from "./index.module.scss"
// MOBX
import authorizationApi from "@/shared/store/auth-api"
import userStore from "@/shared/store/user-api"
import userPostsApi from "@/shared/store/user-posts-api"
// COMPONENTS
import { Avatar, Dropdown, List, Modal, Space, Spin } from "antd"
import { PostListWidget } from "@/widgets/postList"
import { UserBlock } from "@/entities/user"
import { useGetFriends } from "@/shared/hooks/useGetFriends"
import { IFriend } from "@/shared/interfaces/IFriend"
import { friendsModal } from "@/shared/data/friends-modal-tab"
import { DownOutlined } from "@ant-design/icons"

export const UserPage = observer((): JSX.Element => {

  const { userInfo, getUser, loading, error } = userStore
  const { getUserPosts, posts } = userPostsApi
  const { user } = authorizationApi
  const { userId } = useParams()

  const [ targetUserInfo, myUserInfoFriend ] = useGetFriends(userInfo!, user!)

  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (userId && user) {
      getUser(userId)
      getUserPosts(userId)
    }
    console.log(posts)
  }, [userId, user])


  return (
    <div className={`${s.userBlock} jcc aic flex fdc`}>
      <Modal title={`${userInfo?.displayName}'s Friends`} open={isOpened} 
      onCancel={() => setIsOpened(false)} footer={null}>
        <Dropdown menu={{ items: friendsModal }} trigger={['click']}>
          <button>
            <Space>
              Choose friend type
              <DownOutlined />
            </Space>
          </button>
        </Dropdown>
        <List
            itemLayout="horizontal"
            dataSource={userInfo?.friends}
            renderItem={(item: IFriend) => (
              <Link to={`user/${userInfo?.displayName}`}>
                <List.Item>
                  <List.Item.Meta
                    style={{ alignItems: 'center', display: 'flex' }}
                    avatar={<Avatar src={item.avatarUrl} size={40}/>}
                    title={<span style={{whiteSpace: 'nowrap'}}>{userInfo?.displayName}</span>}
                  />
                </List.Item>
              </Link>
            )}
          />
      </Modal>
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
            {posts?.length! > 0 && <PostListWidget posts={posts!} loading={loading} />
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