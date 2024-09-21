import { IFriend } from "./IFriend"

export interface ITeam {
    avatarUrl: string
    description: string
    displayName: string
    id: string
    members: IFriend[]
    tags: string[]
}