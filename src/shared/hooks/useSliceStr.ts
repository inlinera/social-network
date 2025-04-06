export const useSliceStr = (s: string, m: number) => (s?.length > m ? s.slice(0, m) + '...' : s)
