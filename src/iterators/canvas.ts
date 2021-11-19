import { chunkSize } from '../config'


export const SaveIterator = (canvas: any) => {
  return {
    [Symbol.iterator]: function() {
      this._index  = 0
      return {
        next: (chunk: string) => {
          
        }
      }
    }
  }
}
