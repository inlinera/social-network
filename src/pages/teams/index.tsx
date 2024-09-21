import { useEffect } from "react"
import { observer } from "mobx-react-lite"
//COMPONENTS
import { TeamsList } from "@/entities/teams/lists/teams"
//MOBX
import teamsApi from "@/shared/store/teams-api"


export const TeamsPage = observer(() => {

    const { teams, getTeams, loading, error } = teamsApi

    useEffect(() => {
        getTeams()
    }, [])

    return (
        <div>
            {loading ? (
                "Loading..."
            ) : teams && teams.length > 0 ? ( 
               <TeamsList teams={teams}/>
            ) : (
                <p>No teams found</p>
            )}
            {error && error}
        </div>
    )
})