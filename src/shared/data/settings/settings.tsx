import { safety } from './details/safety/safety'
import { view } from './details/view/view'
import { privacy } from './details/privacy/privacy'
import { profile } from './details/profile/profile'

export interface ISetting {
  name: string
  content?: IContent[]
  code: number
}

export interface IContent {
  name: string
  value?: string | number | React.ReactNode
  info?: React.ReactNode
  content?: React.ReactNode
}

export const items = (): ISetting[] => [safety(), profile(), view(), privacy()]
