/**
 * Функция для пересоздания массива лайков/дизлайков
 */

export const newArray = (arr?: string[], name?: string) => {
  if (arr?.includes(`${name}`)) return [...new Set([...arr.filter(item => item !== `${name}`)])]
  return [...new Set([...arr!, `${name}`])]
}
