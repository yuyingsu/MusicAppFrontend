import cls from 'classnames';
import React, { memo } from 'react';

var PlayModeTip = function PlayModeTip(_ref) {
  var prefix = _ref.prefix,
      visible = _ref.visible,
      title = _ref.title,
      text = _ref.text;
  return /*#__PURE__*/React.createElement("div", {
    className: cls("".concat(prefix, "-play-model-tip"), {
      show: visible
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefix, "-play-model-tip-title")
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefix, "-play-model-tip-text")
  }, text));
};

export default /*#__PURE__*/memo(PlayModeTip);