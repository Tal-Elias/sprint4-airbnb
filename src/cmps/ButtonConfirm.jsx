import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

export function ButtonConfirm({ onOrder }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (ev) => {
      const rect = buttonRef.current.getBoundingClientRect()
      const x =
        ((ev.clientX - rect.left) * 100) / buttonRef.current.clientWidth
      const y =
        ((ev.clientY - rect.top) * 100) / buttonRef.current.clientHeight

      buttonRef.current.style.setProperty('--mouse-x', x)
      buttonRef.current.style.setProperty('--mouse-y', y)
    }
    buttonRef.current.addEventListener('mousemove', handleMouseMove)
    const btn = buttonRef.current

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove)
    }
  }, [buttonRef])

  return (
    <button onClick={onOrder} ref={buttonRef} className="button-reserve">
      Confirm and pay
    </button>
  )
}
