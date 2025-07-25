import s from './index.module.scss'

export interface ModalUiProps extends React.HTMLProps<HTMLDivElement> {
  isOpened: boolean
  setIsOpened: (_: boolean) => void
  padding?: number | string
}

export const ModalUi = ({ isOpened, setIsOpened, padding, children, ...props }: ModalUiProps) => {
  return (
    <div className={`${s['modal-ui']} ${isOpened && s.open} flex jcc aic`} onClick={() => setIsOpened(false)}>
      <div
        className={`${s.modal} ${isOpened && s.open} ${props.className} scroll`}
        onClick={e => e.stopPropagation()}
        style={padding ? { padding } : { ...props.style }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
