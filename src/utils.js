export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

export const findObjByKey = (array, key, value) => {
  for(let i = 0, len = array.length; i < len; i++) {
    let object = array[i];
    if (typeof object === 'object' && object.hasOwnProperty(key) && object[key] === value) {
      return object;
    }
  }
  return false;
}
