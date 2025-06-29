/* eslint-disable @typescript-eslint/no-explicit-any */
// const randomise = (arr: any[]): any[] => arr.sort(() => 0.5 - Math.random())

const randomise = (arr: any[]): any[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const chunkify = (array: any[], chunkAmount: number): Array<Array<any>> => {
  if (chunkAmount < 2)
    return [array]

  const len = array.length
  const out = []
  let i = 0, size

  if (len % chunkAmount === 0) {
    size = Math.floor(len / chunkAmount)
    while (i < len) {
      out.push(array.slice(i, i += size))
    }
  }

  else {
    while (i < len) {
      size = Math.ceil((len - i) / chunkAmount--)
      out.push(array.slice(i, i += size))
    }
  }

  return out
}

export { randomise, chunkify }
