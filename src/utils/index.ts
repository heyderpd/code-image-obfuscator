import { wordLength } from './config'

export const PositionToXY = (P, B) => {
  const x = P % B
  return {
    x,
    y: (P - x) / B
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

const filledZeros = new Array(wordLength).fill(0).join('')

export const convertCharToBinary = (char = '\u0000') => {
  return (
    wordLength + char
      .charCodeAt(0)
      .toString(2)
  ).substr(-wordLength)
}

export const ToChar = Item => String.fromCharCode(Item)
