class Helpers {
  static slugify (str) {
    return str.replace(/\W+/g, '-').toLowerCase();
  }
}
export {Helpers as default};