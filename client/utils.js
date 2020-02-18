export const arrayReplace = (arr, elem, identifier) => {
  const newArr = [...arr]
  const index = newArr.findIndex(
    eachElem => eachElem[identifier] === elem[identifier]
  )
  newArr[index] = elem
  return newArr
}
