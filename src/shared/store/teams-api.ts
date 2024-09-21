import { makeAutoObservable } from "mobx"
//FIREBASE
import { db } from "@/app/_providers/firebase"
import { collection, getDocs } from "firebase/firestore"
import { ITeam } from "../interfaces/ITeam"

class teamsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ALL TEAMS STATES
  teams: ITeam[] = []
  loading = true
  error = ''

  // ALL TEAMS ACTIONS
  getTeams = async () => {
    this.setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, 'teams'))
      const teamsData = querySnapshot.docs.map((doc) => ({
        ...doc.data()
      } as ITeam))
      this.setTeams(teamsData)
    } catch (e: any) {
      this.setError(e)
    } finally {
      this.setLoading(false)
    }
  }

  // ALL TEAMS STATES MOVIES
  setTeams = (teams: ITeam[]) => this.teams = teams
  setLoading = (loading: boolean) => this.loading = loading
  setError = (err: string) => this.error = err
}

export default new teamsApi()