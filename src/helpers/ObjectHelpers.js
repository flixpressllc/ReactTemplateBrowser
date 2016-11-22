export function clone (obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty (obj) {
  if (!obj) { return true }
  return (Object.getOwnPropertyNames(obj).length === 0);
}

export function unique (givenArray) {
  if (Array.isArray(givenArray) === false) throw new Error('Value of `array` is not an Array. Is actually: ' + Object.prototype.toString.call(givenArray));
  return givenArray.filter((v, i, a) => a.indexOf(v) === i);
}

// Polyfills

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
