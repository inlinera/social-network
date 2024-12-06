export const useCopyText = (_: string) =>
  navigator.clipboard
    .writeText(_)
    .then(() => {
      alert('Скопировано')
    })
    .catch(() => {
      alert(`Текст не скопирован`)
    })
