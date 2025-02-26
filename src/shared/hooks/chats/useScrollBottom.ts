export const useScrollBottom = () => {
  const endElement = document.getElementById('endRef')
  if (endElement) {
    endElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}
