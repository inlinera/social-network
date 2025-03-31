import { success, error } from '../data/toastify'

export const useCopyText = (_: string) =>
  navigator.clipboard
    .writeText(_)
    .then(() => {
      success('Скопировано')
    })
    .catch(() => {
      error('Текст не получилось скопировать')
    })
