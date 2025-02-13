import { safety } from './details/safety/safety'
import { view } from './details/view/view'
import { privacy } from './details/privacy/privacy'

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

export const items = (): ISetting[] => [safety(), view(), privacy()]
