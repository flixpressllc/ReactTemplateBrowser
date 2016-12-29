let fulfilled = false;
let fulfilledAs = undefined;

let promise = new Promise( resolve => {
  window.Modernizr.on('flash', hasFlash => {
    let flashIsUnavailable = !hasFlash;
    resolve(flashIsUnavailable);
    fulfilled = true;
    fulfilledAs = flashIsUnavailable;
  })
});

export function flashUnavailable () {
  if (! window.Modernizr ) return false; // assume Flash.
  if (fulfilled) return fulfilledAs;
  return false; // assume Flash
}

export function flashUnavailableAsync () {
  if (! window.Modernizr ) return Promise.resolve(false); // assume Flash.
  return promise;
}