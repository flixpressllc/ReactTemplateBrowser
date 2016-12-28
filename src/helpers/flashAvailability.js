export function flashUnavailable () {
  return window.Modernizr && !window.Modernizr.flash;
}