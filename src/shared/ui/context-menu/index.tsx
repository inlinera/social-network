import { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import { useMobile } from '@/shared/hooks/useMobile'
import { ContextMenuItem } from '@/shared/data/chats/context'

interface ContextMenuUIProps {
  items: ContextMenuItem[]
  children: React.ReactNode
}

export const ContextMenuUI = ({ items, children }: ContextMenuUIProps) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const contextRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // HANDLERS
  const menuHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    const menuHeight = items.length * 38
    const menuWidth = 78
    const { clientX, clientY } = e

    const rightSpace = window.innerWidth - clientX
    const bottomSpace = window.innerHeight - clientY

    const x = rightSpace < menuWidth ? clientX - menuWidth : clientX
    const y = bottomSpace < menuHeight ? clientY - menuHeight : clientY

    const adjustedX = x < 0 ? 0 : x
    const adjustedY = y < 0 ? 0 : y

    setPos({ x: adjustedX, y: adjustedY })
    setIsVisible(true)
  }

  const clickHandler = (e: MouseEvent) => {
    const ref = contextRef.current?.getBoundingClientRect()
    if (isVisible && ref) {
      if (
        e.clientX < ref.left ||
        e.clientX > ref.right ||
        e.clientY < ref.top ||
        e.clientY > ref.bottom
      ) {
        setIsVisible(false)
      }
    }
  }

  const contextHandler = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== children) setIsVisible(false)
  }

  // SHOW CONTEXTMENU
  useEffect(() => {
    const handleClick = (e: MouseEvent) => clickHandler(e)
    if (isVisible) {
      document.addEventListener('click', handleClick)
      document.addEventListener('MenuOpen', contextHandler)
      return () => {
        document.removeEventListener('click', handleClick)
        document.removeEventListener('MenuOpen', contextHandler)
      }
    }
  }, [clickHandler])

  useEffect(() => {
    if (!isVisible || isMobile) return
    document.dispatchEvent(
      new CustomEvent<string>('MenuOpen', {
        detail: children as string,
      })
    )
  }, [children, isVisible, isMobile])

  return (
    <>
      <div
        onClick={!isMobile ? undefined : e => menuHandler(e)}
        onContextMenu={isMobile ? undefined : e => menuHandler(e)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          style={{ left: pos.x, top: pos.y }}
          className={`${s.contextMenu} flex fdc`}
          ref={contextRef}
          onClick={e => e.stopPropagation()}
        >
          {items.map(i => (
            <button
              onClick={() => {
                if (i.onClick) i.onClick()
                setIsVisible(false)
              }}
              key={i.name}
              className="flex aic"
            >
              {i.icon}
              {i.name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
