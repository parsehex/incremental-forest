import setValue from './value-setter';

// sets up a getter-setter for 'value' prop, clamping it to obj.max
export function readWrite(obj, itemName, keyName) {
  const privName = '_' + keyName;

  obj[privName] = obj[keyName];
  delete obj[keyName];

  Object.defineProperty(obj, keyName, {
    get: function() { return this[privName]; }.bind(obj),
    set: setValue.bind(obj, itemName, this, keyName, privName),
  });
}

// sets up a getter only for 'key' prop, making it read-only
export function readOnly(obj, keyName) {
  const oldKeyValue = obj[keyName];

  delete obj[keyName];

  Object.defineProperty(obj, keyName, {
    get: function() { return oldKeyValue; },
  });
}
