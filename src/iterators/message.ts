import { chunkSize } from '../config'


const MessageIterator = (message: string) => {
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
            value: message.slice(start, end),
            done: false,
          }
        }
      }
    }
  }
}

export default MessageIterator
