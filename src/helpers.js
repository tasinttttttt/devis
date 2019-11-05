export const updateStateByKey = (key, value, state, callback) => {
  const newState = {...state}
  newState[key] = value
  callback(newState)
}

export const addMissingObjectKeys = (object, reference) => {
  const newObject = {...object}
  for (const [key, value] of Object.entries(reference)) {
    if (value instanceof Object && !(value instanceof Array)) {
      newObject[key] = addMissingObjectKeys(newObject[key], value)
    } else {
      newObject[key] = newObject[key] || value
    }
  }
  return newObject
}
