import { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import { useMobile } from '@/shared/hooks/useMobile'

interface ContextMenuUIProps {
  items: ContextMenuItem[]
  children: React.ReactNode
}

export interface ContextMenuItem {
  name: string
  onClick: () => void
}

export const ContextMenuUI = ({ items, children }: ContextMenuUIProps) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const contextRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  //HANDLERS
  const menuHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsVisible(true)
    setPos({ x: e.clientX, y: e.clientY })
  }
  const clickHandler = (e: MouseEvent) => {
    const ref = contextRef.current?.getBoundingClientRect()
    if (isVisible && ref) {
      if (e.clientX != (ref.left || ref.right) || e.clientY != (ref.top || ref.bottom)) {
        setIsVisible(false)
      }
    }
  }

  //SHOW CONTEXTMENU
  useEffect(() => {
    console.log('111')
    const handleClick = (e: MouseEvent) => clickHandler(e)
    if (isVisible) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    } else return
  }, [clickHandler])

  return (
    <>
      <div
        onClick={!isMobile ? undefined : e => menuHandler(e)}
        onContextMenu={isMobile ? undefined : e => menuHandler(e)}
      >
        {children && children}
      </div>
      {isVisible && (
        <div
          style={{ left: pos.x, top: pos.y }}
          className={`${s.contextMenu}`}
          ref={contextRef}
          onClick={e => e.stopPropagation()}
        >
          {items.map(i => (
            <button onClick={i.onClick} key={i.name}>
              {i.name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
