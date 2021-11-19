import * as pkg from '../../package.json'
import { chunkSize } from '../config'


const project = `${pkg.name}@${pkg.version}`
export const head = `{${project}}>>>`
export const tail = `<<<{${project}}`
const headPattern = new RegExp(`^(${head})`)
const tailPattern = new RegExp(`(${tail})`)

if (project.length > chunkSize) {
  throw new Error('invalid word buffer size')
}

interface Postion {
  chunk: number;
  position: number;
}

export const MountMessage = (messageChunk: string): string => {
  return head + messageChunk + tail
}

export const findMessageHead = (messageChunk: string): Postion => {
  const match = headPattern.exec(messageChunk)
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

export const findMessageTail = (messageChunk: string, messageNextChunk: string): Postion => {
  const match = tailPattern.exec(messageChunk + messageNextChunk)
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
