import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable, runInAction } from 'mobx'
import { mobxState } from 'mobx-toolbox'

class InputState {
  constructor() {
    makeAutoObservable(this)
  }

  val = mobxState('')('val')

  // =================== INPUT STATE ===================
  state = 'default' as 'default' | 'edit' | 'reply'
  setState = (_: 'default' | 'edit' | 'reply') => (this.state = _)

  // =================== MESSAGE STATE ===================
  actionMsg = null as IMessage | null
  setActionMsg = ($: IMessage | null) => (this.actionMsg = $)

  $null = () =>
    runInAction(() => {
      this.val.setVal('')
      this.setState('default')
      this.setActionMsg(null)
    })
}

export default new InputState()
