import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'

class InputState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== VALUE STATE ===================
  val = ''
  setVal = (_: string) => (this.val = _)

  // =================== INPUT STATE ===================
  state = 'default' as 'default' | 'edit' | 'reply'
  setState = (_: 'default' | 'edit' | 'reply') => (this.state = _)

  // =================== MESSAGE STATE ===================
  actionMsg = null as IMessage | null
  setActionMsg = ($: IMessage | null) => (this.actionMsg = $)

  //STATE MOVES
  $null = () => {
    this.setVal('')
    this.setState('default')
    this.setActionMsg(null)
  }
}

export default new InputState()
