import s from './index.module.scss'

interface ImageUIProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  borderRadius?: string | number
}

export const ImageUI = ({ borderRadius, ...props }: ImageUIProps) => {
  return (
    <img
      className={`${s['image-ui']} flex jcc aic`}
      style={borderRadius ? { borderRadius } : {}}
      draggable={false}
      {...props}
    />
  )
}
