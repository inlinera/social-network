import s from './index.module.scss'

interface ModalUiProps extends React.HTMLProps<HTMLDivElement> {
  setIsOpened: (_: boolean) => void
  padding?: number | string
}

export const ModalUi = ({ setIsOpened, padding, children }: ModalUiProps) => {
  return (
    <div className={`${s['modal-ui']} flex jcc aic`} onClick={() => setIsOpened(false)}>
      <div
        className={`${s.modal}`}
        onClick={e => e.stopPropagation()}
        style={padding ? { padding } : {}}
      >
        {children}
      </div>
    </div>
  )
}
