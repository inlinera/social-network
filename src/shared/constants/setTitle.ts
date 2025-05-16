/**
 * Simple function that changes page's title
 */

export const setTitle = (v: string, isMainPage = false) => {
  if (isMainPage) return (document.title = `2la`)
  if (!v) return (document.title = '2la • Not Found')
  document.title = `2la • ${v}`
}
