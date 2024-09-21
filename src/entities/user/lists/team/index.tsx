import { useNav } from '@/shared/hooks/useNav'
import { ITeam } from '@/shared/interfaces/ITeam'
import { IUser } from '@/shared/interfaces/IUser'
import { Avatar, List } from 'antd'
import { FC } from 'react'

export const UserTeamList: FC<{ userInfo?: IUser }> = ({ userInfo }) => {
  return (
    <List
        itemLayout="horizontal"
        dataSource={userInfo?.teams}
        renderItem={(item: ITeam) => {
          const navToTeamPage = useNav(`/team/${item?.displayName}`)
          return (
            <List.Item>
            <button onClick={() => navToTeamPage()}>
                <List.Item.Meta
                    style={{ alignItems: 'center', display: 'flex' }}
                    avatar={<Avatar src={item.avatarUrl} size={40}/>}
                    title={<span style={{whiteSpace: 'nowrap'}}>{item?.displayName}</span>}
                />
            </button>
                <div>
                </div>
            </List.Item>
        )}
      }
    />
  )
}
