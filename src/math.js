
export const PtoXY = (P, B) => {
  const x = P %B
  return {
    x,
    y: (P -x) /B
  }
}

export const Round = (Num, Div) => {
  const res = Math.round((Num -R) /Div)
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

export const ToCode = Item => String.fromCharCode(Item || 0)

export const ToChar = Item => String.fromCharCode(Item)
