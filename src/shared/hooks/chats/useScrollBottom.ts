export const useScrollBottom = (id: string) => {
  const endElement = document.getElementById(id)

  if (endElement) {
    endElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
}
