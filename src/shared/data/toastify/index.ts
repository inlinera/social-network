import { Slide, toast, ToastOptions } from 'react-toastify'

const params: ToastOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  transition: Slide,
}

export const info = (value: string) => toast.info(value, params)

export const success = (value: string) => toast.success(value, params)

export const error = (value: string) => toast.error(value, params)
