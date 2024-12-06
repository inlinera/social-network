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
  isDefault = true
  setIsDefault = (_: boolean) => (this.isDefault = _)

  // =================== MESSAGE STATE ===================
  actionMsg = null as IMessage | null
  setActionMsg = ($: IMessage | null) => (this.actionMsg = $)
}

export default new InputState()
