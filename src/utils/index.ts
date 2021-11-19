import { wordLength } from '../config'
import { PixelPostion } from '../interfaces'

export const PositionToXY = (Position: number, Width: number, Height: number): PixelPostion => {
  const X = Position % Width
  const Y = (Position - X) / Width
  if (Y >= Height) {
    return null
  }
  return {
    X,
    Y,
  }
}

export const IsODD = (value) => {
  return value % 2
}

export const Round = (Num, Div) => {
  const res = Math.round((Num -(Num %Div)) /Div)
  return Num %Div
    ? res +1
    : res
}

export const Process = (Work, List) => {
  Object
    .keys(List)
    .forEach(key => List[key] = Work(List[key]))
  return List
}

export const createFilledZeros = length => new Array(length).fill(0).join('')

const filledZeros = createFilledZeros(wordLength)

const convertCharToBinary = (char = '\u0000') => {
  return (
    filledZeros + char
      .charCodeAt(0)
      .toString(2)
  ).substr(-wordLength)
}

export const convertCharToBinaryArray = char => {
  return convertCharToBinary(char)
    .split('')
    .map(bit => bit === '1')
}

export const convertBinaryToChar = char => {
  // char = ['0', '1', '0', '0', '1', '0', '0', '0']
  // var JJ = char.join('')
  // var II = parseInt(JJ, 2)
  // var SS = String.fromCharCode(II)
  // console.log({ char, JJ, II, SS })
  // // throw 7
  // return SS
  return String.fromCharCode(parseInt(char.join(''), 2))
}
