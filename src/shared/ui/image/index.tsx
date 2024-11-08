import { Image } from 'antd'

interface AntdImageComponentProps {
  src: string
}

export const AntdImageComponent = ({ src }: AntdImageComponentProps) => {
  return <Image height={160} src={src} />
}
