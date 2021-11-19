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
    const item = this._getItem()
    if (item != null) {
      this.buffer.push(item)
    }
    if (this.buffer.length == 0 && this.buffer.length < this.size) {
      return null
    }
    return this.flush()
  }

  _process (item) {
    return item
  }

  flush () {
    const transformed = this.buffer.map(this._process)
    this.buffer = []
    return transformed
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
