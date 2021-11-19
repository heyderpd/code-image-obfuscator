import { IteratorResponse } from '../interfaces'


export class Iterator {

  done = false
  size = 0
  buffer = []

  constructor () {
  }

  _getItem () {
    return null
  }

  _pushAndFlush () {
    if (this.buffer.length >= this.size) {
      return this.flush()
    }
    const item = this._getItem()
    if (item == null) {
      return this.flush()
    }
    if (Array.isArray(item)) {
      this.buffer = this.buffer.concat(this.buffer, item)
    } else {
      this.buffer.push(item)
    }
    return this.flush()
  }

  _process (chunk) {
    return chunk
  }

  flush () {
    let chunk = null
    if (this.buffer.length < this.size) {
      chunk = this.buffer
      this.buffer = []
    } else {
      chunk = this.buffer.slice(0, this.size)
      this.buffer = this.buffer.slice(this.size)
    }
    return this._process(chunk)
  }

  [Symbol.iterator] = () => {
    return {
      next: (): IteratorResponse => {
        return {
          done: this.done,
          value: this._pushAndFlush(),
        }
      }
    }
  }

  getIterator = () => this[Symbol.iterator]()

}
