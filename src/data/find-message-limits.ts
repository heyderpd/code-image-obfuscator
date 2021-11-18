import pkg from '../../package.json'
import { chunkSize } from '../config'


const project = `${pkg.name}@${pkg.version}`
const head = `{${project}}>>>`
const tail = `<<<{${project}}`
const headPattern = new RegExp(`^(${head})`)
const tailPattern = new RegExp(`(${tail})`)

if (project.length > chunkSize) {
  throw new Error('invalid word buffer size')
}

interface Postion {
  chunk: number;
  position: number;
}

export const findMessageHead = (messageFirstChunk: string): Postion => {
  const match = headPattern.exec(messageFirstChunk)
  if (!match) {
    return null
  }
  const group: string = match[0]
  const length: number = match.index
  const position: number = length + group.length
  return {
    chunk: 0,
    position,
  }
}

export const findMessageTail = (messageNextChunk: string, messageLastChunk: string): Postion => {
  const match = tailPattern.exec(messageNextChunk + messageLastChunk)
  if (!match) {
    return null
  }
  const position: number = match.index
  if (position == 0) {
    return {
      chunk: -1,
      position: chunkSize,
    }
  }
  if (position < chunkSize) {
    return {
      chunk: 0,
      position,
    }
  } else {
    return {
      chunk: 1,
      position: position - chunkSize,
    }
  }
}
