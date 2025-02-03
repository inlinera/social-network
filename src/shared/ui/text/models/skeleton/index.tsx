import { v4 } from 'uuid'
import s from './index.module.scss'

interface TextSkeletonProps {
  lines: number
}

export const TextSkeleton = ({ lines }: TextSkeletonProps) => {
  return (
    <div className="flex fdc">
      {Array.from({ length: lines - 1 }, () => (
        <div className={s.line} key={v4()} />
      ))}
      <div className={s.lastLine} />
    </div>
  )
}
