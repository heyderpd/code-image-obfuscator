import { chunkSize } from '../config'
import { convertCharToBinary, convertBinaryToChar } from '../utils'
import { findMessageHead, findMessageTail } from '../data/patterns'
import { Iterator } from './helper'
import { IteratorResponse } from '../interfaces'


export class MessageReaderIterator extends Iterator {

  size = chunkSize

  constructor () {
    super()
    this._getItem = () => {
    }
  }

  _getItem () {
    return null
  }

  _process (item) {
    return convertBinaryToChar(item)
  }

}

export class MessageWriterIterator extends Iterator {

  size = chunkSize
  index = 0

  constructor (message: string) {
    super()
    this._getItem = () => {
      if (message.length <= this.index) {
        this.done = true
        return null
      }
      return message.slice(this.index, ++this.index)
    }
  }

  _process (item) {
    console.log({ item })
    return convertCharToBinary(item)
  }

}
