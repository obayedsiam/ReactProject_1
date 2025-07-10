import { toast } from 'react-toastify'

export default function useToast() {
  return (message, type = 'default') => {
    toast(message, {
      type,
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    })
  }
}
