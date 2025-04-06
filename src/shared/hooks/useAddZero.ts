export const useAddZero = (s?: number) => (`${s}`?.length === 1 ? `0${s}` : s)
