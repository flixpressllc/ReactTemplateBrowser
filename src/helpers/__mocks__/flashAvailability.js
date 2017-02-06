var finishPromise;
var flashIsAvailable;
var mostRecentPromise;

export function __reset() {
  finishPromise = null;
  flashIsAvailable = true; // assume flash
  mostRecentPromise = undefined;
}

__reset();

export function flashUnavailable () {
  return !flashIsAvailable;
}

export function flashUnavailableAsync () {
  if (mostRecentPromise !== undefined) {
    return mostRecentPromise;
  }
  mostRecentPromise = new Promise( resolve => {
    finishPromise = function finishPromiseWith (availability) {
      flashIsAvailable = availability;
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
}