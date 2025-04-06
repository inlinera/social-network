import { success, error } from '../data/toastify'

export const useCopyText = (s: string) => {
  navigator.clipboard
    .writeText(s)
    .then(() => {
      success('Скопировано')
    })
    .catch(() => {
      error('Текст не получилось скопировать')
    })
}
