import { makeAutoObservable } from 'mobx'
import { mobxState } from 'mobx-toolbox'

class PostState {
  constructor() {
    makeAutoObservable(this)
  }

  editPost = mobxState<string | null>(null)('editPost')
}

export const postState = new PostState()
