import { IteratorResponse } from '../interfaces'


export class Iterator {

  _done = false
  _size = 0
  _index = 0
  _buffer = []
  _iterator = null

  constructor (iterator: Iterator = null) {
    if (iterator) {
      this._iterator = iterator.getIterator()
    }
  }

  _flush () {
    let chunk = null
    if (this._buffer.length < this._size) {
      chunk = this._buffer
      this._buffer = []
    } else {
      // console.log('buffer init', JSON.stringify(this._buffer))
      chunk = this._buffer.slice(0, this._size)
      // console.log('chunk', JSON.stringify(chunk))
      this._buffer = this._buffer.slice(this._size)
      // console.log('buffer final', JSON.stringify(this._buffer))
      // throw 8
    }
    console.log('itemitem', { chunk, _buffer: this._buffer })
    return this.process(chunk)
  }

  _pushAndFlush () {
    if (this._buffer.length >= this._size) {
      return this._flush()
    }
    const item = this.getItem()
    console.log('itemitem', { item })
    if (item.done) {
      return this._flush()
    }
    if (!item.value) {
      return null
    }
    if (Array.isArray(item.value)) {
      this._buffer = this._buffer.concat(this._buffer, item.value)
    } else {
      this._buffer.push(item.value)
    }
  }

  getItem () {
    return this._iterator.next()
  }

  process (chunk) {
    return chunk
  }

  findNextChunk () {
    let value = null
    while (value == null) {
      value = this._pushAndFlush()
      console.log('pushing!')
      if (this._done) {
        console.log('done!')
        break
      }
    }
    return value
  }

  [Symbol.iterator] = () => {
    return {
      next: (): IteratorResponse => {
        return {
          done: this._done,
          value: this.findNextChunk(),
        }
      }
    }
  }

  getIterator = () => this[Symbol.iterator]()

}
