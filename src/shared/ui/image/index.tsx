import { Image } from 'antd'
import { FC } from 'react'

interface AntdImageComponentProps {
  src: string
}

export const AntdImageComponent: FC<AntdImageComponentProps> = ({ src }) => {
  return <Image width={200} src={src} />
}
