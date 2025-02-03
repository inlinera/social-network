import { TextSkeleton } from './models/skeleton'

interface TextUiProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean
  lines: number
}

export const TextUi = ({ loading, lines, children }: TextUiProps) => {
  return <div>{loading ? <TextSkeleton lines={lines} /> : children}</div>
}
