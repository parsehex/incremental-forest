export function findObjByKey(array, key, value) {
  for (let i = 0, len = array.length; i < len; i++) {
    const object = array[i];
    if (typeof object === 'object' && object.hasOwnProperty(key) && object[key] === value) {
      return object;
    }
  }
  return false;
}

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export function indexOfObject(array, propName, propValue) {
  // search an array of objects, returning the index of the first object with specified prop value

  const len = array.length;
  for (let i = 0; i < len; i++) {
    if (array[i][propName] === propValue) return i;
  }

  return -1;
}
