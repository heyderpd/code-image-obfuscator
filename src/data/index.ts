import { head, tail, MountMessage } from '../data/patterns'
import { Message, Canvas } from '../iterators'


export const SaveMessage = (canvas: any, message: string) => {
  const MessageIterator = new Message.MessageWriterIterator(MountMessage(message))
  const CanvasIterator = new Canvas.CanvasWriterIterator(MessageIterator, canvas)
  console.log('saving message')
  for (let item of CanvasIterator) {
    console.log('.')
  }
  console.log('end')
}

export const LoadMessage = (canvas: any) => {
  // const canvasIterator = Canvas.LoadIterator(canvas)
  // const messageIterator = Message.SaveIterator()[Symbol.iterator]()
  // for (let data of canvasIterator) {
  //   const result = messageIterator.next(data)
  //   if (result) {
  //     return result.value
  //   }
  // }
  // throw new Error('fail on find message')
}
