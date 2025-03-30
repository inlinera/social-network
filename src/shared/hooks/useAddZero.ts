export const useAddZero = (str?: number) => (`${str}`?.length === 1 ? `0${str}` : str)
