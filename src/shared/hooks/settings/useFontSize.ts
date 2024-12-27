export const useFontSize = (_: number) => {
  const edit = () => {
    document.body.style.fontSize = `${_}px`
  }
  return { edit }
}
