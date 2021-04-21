/* eslint-disable no-param-reassign */

/* eslint-disable radix */

/* eslint-disable no-bitwise */
export function formatTime(second) {
  var i = 0;
  var h = 0;
  var s = parseInt(second);

  if (s >= 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);

    if (i >= 60) {
      h = parseInt(i / 60);
      i = parseInt(i % 60);
    }
  } // 补零


  var zero = function zero(v) {
    return v >> 0 < 10 ? "0".concat(v) : v;
  };

  if (h > 0) return [zero(h), zero(i), zero(s)].join(':');
  return [zero(i), zero(s)].join(':');
}
export function createRandomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
export function distinct(array) {
  return array.map(function (item) {
    return JSON.stringify(item);
  }).filter(function (item, idx, arr) {
    return idx === arr.indexOf(item);
  }).map(function (item) {
    return JSON.parse(item);
  });
}
export var arrayEqual = function arrayEqual(arr1) {
  return function (arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };
};

var s4 = function s4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}; // Generate a pseudo-GUID by concatenating random hexadecimal.


export var uuId = function uuId() {
  return "".concat(s4() + s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
};
export var isSafari = function isSafari() {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}; // https://stackoverflow.com/a/9039885/2789451

export function isIOS() {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || // iPad on iOS 13 detection
  navigator.userAgent.includes('Mac') && 'ontouchend' in document;
} // https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out

export function swing(p) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}
export function adjustVolume(element, startVolume, endVolume) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1000 : _ref$duration,
      _ref$easing = _ref.easing,
      easing = _ref$easing === void 0 ? swing : _ref$easing,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 13 : _ref$interval;

  var callback = arguments.length > 4 ? arguments[4] : undefined;
  var delta = endVolume - startVolume;

  if (!delta || !duration || !easing || !interval || isIOS()) {
    element.volume = endVolume;
    callback();
    return {
      fadeInterval: undefined,
      updateIntervalEndVolume: undefined
    };
  }

  var ticks = Math.floor(duration / interval);
  var tick = 1;

  var updateIntervalEndVolume = function updateIntervalEndVolume(newVolume) {
    endVolume = newVolume;
  };

  var timer = setInterval(function () {
    // End volume may have changed in middle of fading
    var newDelta = endVolume - startVolume;

    if (newDelta !== delta) {
      delta = newDelta;
    }

    element.volume = startVolume + easing(tick / ticks) * delta;

    if (++tick >= ticks) {
      element.volume = endVolume;
      clearInterval(timer);
      callback();
    }
  }, interval);
  return {
    fadeInterval: timer,
    updateIntervalEndVolume: updateIntervalEndVolume
  };
}