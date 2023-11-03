import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

export function ButtonReserve({ isOrderToSet, setDatePickerModalOpen }) {
  const buttonRef = useRef(null)
  const navigate = useNavigate()

  function handleOnClick() {
    if (isOrderToSet) navigate('/stay/order')
    else setDatePickerModalOpen(true)
  }

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
    <button onClick={handleOnClick} ref={buttonRef} className="button-reserve">
      {isOrderToSet ? 'Reserve' : 'Check availability'}
    </button>
  )
}
