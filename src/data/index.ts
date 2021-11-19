import { head, tail, MountMessage } from '../data/patterns'
import { Message, Canvas } from '../iterators'


export const SaveMessage = (canvas: any, message: string) => {
  const MessageIterator = new Message.MessageWriterIterator(message)
  const CanvasIterator = new Canvas.CanvasWriterIterator(MessageIterator, canvas)
  console.log('saving message')
  for (let item of CanvasIterator) {
    // console.log('.')
  }
  console.log('end')
}

export const LoadMessage = (canvas: any) => {
  const CanvasIterator = new Canvas.CanvasReaderIterator(canvas)
  const MessageIterator = new Message.MessageReaderIterator(CanvasIterator)
  console.log('loading message')
  for (let item of MessageIterator) {
    // console.log('.')
  }
  console.log('end')
  return MessageIterator.message
}
