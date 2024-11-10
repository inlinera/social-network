import s from './index.module.scss'

export const PostTagUi = ({ name }: { name: string }) => {
  return <div className={`${s.tagOption} cb`}>{name}</div>
}
