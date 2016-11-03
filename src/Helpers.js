class Helpers {
  static slugify (str) {
    return str.replace(/\W+/g, '-');
  }
}
export {Helpers as default};