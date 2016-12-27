export function slugify (str) {
  const CAMELCASE_BOUNDS = /([a-z])([A-Z])/g;
  const NON_WORD_CHARS = /\W+/g;

  let separatedCamels = str.replace(CAMELCASE_BOUNDS, '$1 $2');
  return separatedCamels.replace(NON_WORD_CHARS, '-').toLowerCase();
}

function capitalizeFirstChar (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function titleCase (str) {
  return str.replace(/\w+/g, function (a) { return capitalizeFirstChar(a); });
}

export function unslugify (str) {
  return titleCase(str.replace(/-/g, ' ').trim());
}

export function padLeft(string, padCharacter, minimumTotalSize) {
  let result = (new Array(minimumTotalSize+1).join(padCharacter)+string).slice(-minimumTotalSize);
  return string.length <= minimumTotalSize ? result : string ;
}
