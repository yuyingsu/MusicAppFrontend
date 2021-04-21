// 迷你模式进度条
import React, { memo } from 'react';

var CircleProcessBar = function CircleProcessBar() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$progress = _ref.progress,
      progress = _ref$progress === void 0 ? 0 : _ref$progress,
      _ref$r = _ref.r,
      r = _ref$r === void 0 ? 40 : _ref$r;

  var currentProgress = progress.toFixed(2);
  var perimeter = Math.PI * 2 * r;
  var strokeDasharray = "".concat(Math.floor(perimeter * currentProgress), " ").concat(Math.floor(perimeter * (1 - currentProgress)));
  return /*#__PURE__*/React.createElement("svg", {
    className: "audio-circle-process-bar"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: r,
    cy: r,
    r: r - 1,
    fill: "none",
    className: "stroke",
    strokeDasharray: strokeDasharray
  }), /*#__PURE__*/React.createElement("circle", {
    cx: r,
    cy: r,
    r: r - 1,
    fill: "none",
    className: "bg",
    strokeDasharray: "0 1000"
  }));
};

export default /*#__PURE__*/memo(CircleProcessBar);