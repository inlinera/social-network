import { FC, memo } from "react"
//COMPONENTS
import { Avatar, List } from "antd"
//INTERFACES
import { ITeam } from "@/shared/interfaces/ITeam"
//HOOKS
import { useNav } from "@/shared/hooks/useNav"

export const TeamsList: FC<{ teams?: ITeam[] }> = memo(({ teams }) => {

  return (
    <List
        itemLayout="vertical"
        dataSource={teams}
        renderItem={(item: ITeam) => {
          const navToTeamPage = useNav(`/teams/${item?.id}`)
          return (
            <List.Item>
                <button onClick={() => navToTeamPage()}>
                    <List.Item.Meta
                        style={{ display: 'flex', alignItems: 'center' }}
                        avatar={<Avatar src={item.avatarUrl} size={50}/>}
                        title={
                            <>
                             <p style={{fontSize: '15px'}}>{item?.displayName}</p>
                             <p style={{fontSize: '12px', whiteSpace: 'nowrap'}}>{item?.members.length} member</p>
                            </>
                        }
                    />
                </button>
            </List.Item>
        )}
      }
    />
  )
})