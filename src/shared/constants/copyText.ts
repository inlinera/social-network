import { success, error } from '../data/toastify'

export const copyText = (s: string) => {
  navigator.clipboard
    .writeText(s)
    .then(() => {
      success('Скопировано')
    })
    .catch(() => {
      error('Текст не получилось скопировать')
    })
}
