export function clone (obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty (obj) {
  if (!obj) { return true }
  return (Object.getOwnPropertyNames(obj).length === 0);
}