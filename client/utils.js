export const arrayReplace = (arr, elem, identifier) => {
  const newArr = [...arr]
  const index = newArr.findIndex(
    eachElem => eachElem[identifier] === elem[identifier]
  )
  newArr[index] = elem
  return newArr
}

export const centipennies = dollars => Math.floor(dollars * 10000)

export const dollars = cpennies => Math.floor(cpennies / 10000)
