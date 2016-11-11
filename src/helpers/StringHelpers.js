export function slugify (str) {
  const CAMELCASE_BOUNDS = /([a-z])([A-Z])/g;
  const NON_WORD_CHARS = /\W+/g;
  
  let separatedCamels = str.replace(CAMELCASE_BOUNDS, '$1 $2');
  return separatedCamels.replace(NON_WORD_CHARS, '-').toLowerCase();
}
export function padLeft(string, padCharacter, minimumTotalSize) {
  let result = (new Array(minimumTotalSize+1).join(padCharacter)+string).slice(-minimumTotalSize);
  return string.length <= minimumTotalSize ? result : string ;
}
