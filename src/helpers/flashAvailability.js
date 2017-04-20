let fulfilled = false;
let fulfilledAs = undefined;

function makePromise () {
  return new Promise( resolve => {
    window.Modernizr.on('flash', hasFlash => {
      let flashIsUnavailable = !hasFlash;
      resolve(flashIsUnavailable);
      fulfilled = true;
      fulfilledAs = flashIsUnavailable;
    });
  });
}

let promise = window.Modernizr ? makePromise() : Promise.resolve(false); // assume flash


export function flashUnavailable () {
  if (! window.Modernizr ) return false; // assume Flash.
  if (fulfilled) return fulfilledAs;
  return false; // assume Flash
}

export function flashUnavailableAsync () {
  return promise;
}