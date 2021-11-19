
export const PtoXY = (P, B) => {
  const x = P %B
  return {
    x,
    y: (P -x) /B
  }
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

export const convertCharToBinary = (char = '\u0000') => char.charCodeAt(0).toString(2)

export const ToChar = Item => String.fromCharCode(Item)
