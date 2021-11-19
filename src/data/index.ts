import { head, tail } from '../data/patterns'
import { Canvas, Message } from '../iterators'


export const SaveMessage = (canvas: any, message: string) => {
  const messageIterator = Message.LoadIterator(message)
  const canvasIterator = Canvas.SaveIterator(canvas)[Symbol.iterator]()
  canvasIterator.next(Message.convertChunkToData(head))
  for (let chunk of messageIterator) {
    canvasIterator.next(chunk)
  }
  canvasIterator.next(Message.convertChunkToData(tail))
  canvasIterator.next('', true)
}
