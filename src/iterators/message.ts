import { chunkSize } from '../config'
import { convertCharToBinary, convertBinaryToChar } from '../utils'
import { findMessageHead, findMessageTail } from '../data/patterns'


export function convertChunkToData(chunk: string){
  return chunk
    .split('')
    .map(char => convertCharToBinary(char))
    .join('')
}

export const LoadIterator = (message: string) => {
  return {
    [Symbol.iterator]: function() {
      this._index = 0
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

export const SaveIterator = () => {
  return {
    [Symbol.iterator]: function() {
      this._initializing = true
      this._complete = false
      this._index = 0
      this._message = ''
      this._lastChunk = ''
      this._chunk = ''
      this._data = ''
      return {
        next: (data: string[]) => {
          this._chunk += data
            .map(convertBinaryToChar)
          if (this._chunk.length < chunkSize) {
            return
          }
          this._lastChunk = this._chunk.slice(0, chunkSize)
          this._chunk = this._chunk.slice(chunkSize)
          if (this._initializing) {
            this._initializing = false
            const start = findMessageHead(this._lastChunk)
            if (!start) {
              throw new Error('message not found')
            }
            this._lastChunk = this._lastChunk.slice(start.position)
          }
          const end = findMessageTail(this._lastChunk, this._chunk)
          if (end) {
            const lastChunk = this._lastChunk + this._chunk
            const length = (end.chunk * chunkSize) + end.position
            this._lastChunk = lastChunk.slice(0, length)
            this._complete = true
          }
          this._message += this._lastChunk
          if (this._complete) {
            return {
              value: this._message,
              done: true,
            }
          }
        }
      }
    }
  }
}
