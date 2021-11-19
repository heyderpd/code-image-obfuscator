import { messageChunkSize, wordLength } from '../config'
import { convertCharToBinaryArray, convertBinaryToChar } from '../utils'
import { findMessageHead, findMessageTail, MountMessage } from '../data/patterns'
import { Iterator } from './helper'
import { IteratorResponse } from '../interfaces'


export class MessageReaderMiddleIterator extends Iterator {

  _size = messageChunkSize * wordLength

  constructor (iterator: Iterator) {
    super(iterator)
  }

  _getChar (data: string[]) {
    const char  = data.slice(0, wordLength)
    data = data.slice(wordLength)
    return [char, data]
  }

  process (data: string[]) {
    console.log('********', { data })
    let chunk = ''
    let char
    while (data.length > 0) {
      [char, data] = this._getChar(data)
      console.log('********', { char })
      chunk += convertBinaryToChar(char)
    }
    console.log('********', { data, chunk })
    throw 4
    return chunk
  }

}

export class MessageReaderIterator extends Iterator {

  _size = 1
  _findingHead = true
  _lastChunk = ''
  message = ''

  constructor (iterator: Iterator) {
    super(new MessageReaderMiddleIterator(iterator))
  }

  process (chunk: string) {
    if (this._findingHead) {
      const start = findMessageHead(chunk)
      if (!start) {
        // console.log({ chunk, start })
        throw new Error('message not found')
      }
      this.message = chunk.slice(start.position)
      this._lastChunk = chunk
      this._findingHead = false
      return
    }
    const end = findMessageTail(this._lastChunk, chunk)
    if (end) {
      this._lastChunk += chunk
      const length = (end.chunk * messageChunkSize) + end.position
      this.message += this._lastChunk.slice(0, length)
      this._done = true
      return
    }
    this.message += this._lastChunk
    this._lastChunk = chunk
  }

}

export class MessageWriterIterator extends Iterator {

  _size = messageChunkSize
  message = ''

  constructor (message: string) {
    super()
    this.message = MountMessage(message)
    this.getItem = () => {
      if (this.message.length <= this._index) {
        this._done = true
        return {
          done: true,
        } as IteratorResponse
      }
      const value = this.message.slice(this._index, ++this._index)
      return {
        value,
      } as IteratorResponse
    }
  }

  process (chunk) {
    return Array().concat(...chunk.map(convertCharToBinaryArray))
  }

}
