var finishPromise;
var flashIsAvailable;
var promiseIsDone;
var mostRecentPromise;

export function __reset() {
  finishPromise = null;
  flashIsAvailable = true; // assume flash
  promiseIsDone = false;
}

__reset();

export function flashUnavailable () {
  return !flashIsAvailable;
}

export function flashUnavailableAsync () {
  if (promiseIsDone) {
    if (flashIsAvailable) {
      mostRecentPromise = Promise.resolve(false);
    } else {
      mostRecentPromise = Promise.resolve(true);
    }
    return mostRecentPromise;
  }
  mostRecentPromise = new Promise( resolve => {
    finishPromise = function finishPromiseWith (availability) {
      resolve(!availability);
    }
  });
  return mostRecentPromise;
}

export function __setAvailabilityTo (available) {
  flashIsAvailable = available;
}

export function __finishPromiseWith (available) {
  finishPromise(available);
  return mostRecentPromise;
}

export function __declarePromiseWith (available) {
  flashIsAvailable = available;
  promiseIsDone = true;
}