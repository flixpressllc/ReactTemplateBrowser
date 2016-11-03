class Helpers {
  static slugify (str) {
    const CAMELCASE_BOUNDS = /([a-z])([A-Z])/g;
    const NON_WORD_CHARS = /\W+/g;
    
    let separatedCamels = str.replace(CAMELCASE_BOUNDS, '$1 $2');
    return separatedCamels.replace(NON_WORD_CHARS, '-').toLowerCase();
  }
}
export {Helpers as default};