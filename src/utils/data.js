export function findObjByKey(array, key, value) {
  for(let i = 0, len = array.length; i < len; i++) {
    let object = array[i];
    if (typeof object === 'object' && object.hasOwnProperty(key) && object[key] === value) {
      return object;
    }
  }
  return false;
}

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export function indexOfObject(arr, name, value) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][name] === value) return i;
  }
  return -1;
}
