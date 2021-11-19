import { chunkSize } from '../config'
import { convertCharToBinary } from '../math'


export function convertChunkToData(chunk: string){
  return chunk
    .split('')
    .map(char => convertCharToBinary(char))
    .join('')
}

export const LoadIterator = (message: string) => {
  return {
    [Symbol.iterator]: function() {
      this._index  = 0
      return {
        next: () => {
          if (message.length < this._index + 1) {
            return {
              done: true,
            }
          }
          const start = this._index
          this._index += chunkSize
          const end = this._index
          return {
            value: convertChunkToData(message.slice(start, end)),
            done: false,
          }
        }
      }
    }
  }
}
