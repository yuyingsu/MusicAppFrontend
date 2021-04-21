"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _locale = _interopRequireDefault(require("./locale"));

var _mode = require("./mode");

var _theme = require("./theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var playModePropTypes = _propTypes["default"].oneOf(['order', 'orderLoop', 'singleLoop', 'shufflePlay']);

var _default = {
  audioLists: _propTypes["default"].array.isRequired,
  locale: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].oneOf(Object.values(_locale["default"]))]),
  theme: _propTypes["default"].oneOf(Object.values(_theme.THEME)),
  mode: _propTypes["default"].oneOf(Object.values(_mode.MODE)),
  defaultPlayMode: playModePropTypes,
  playMode: playModePropTypes,
  drag: _propTypes["default"].bool,
  seeked: _propTypes["default"].bool,
  autoPlay: _propTypes["default"].bool,
  clearPriorAudioLists: _propTypes["default"].bool,
  autoPlayInitLoadPlayList: _propTypes["default"].bool,
  playModeText: _propTypes["default"].object,
  panelTitle: _propTypes["default"].string,
  closeText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  openText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  clickToPlayText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  clickToPauseText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  nextTrackText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  previousTrackText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  reloadText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  volumeText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  playListsText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  toggleLyricText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  toggleMiniModeText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  destroyText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  downloadText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  emptyText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  controllerTitle: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  defaultPosition: _propTypes["default"].shape({
    top: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    left: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    right: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    bottom: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
  }),
  onAudioPlay: _propTypes["default"].func,
  onAudioPause: _propTypes["default"].func,
  onAudioEnded: _propTypes["default"].func,
  onAudioAbort: _propTypes["default"].func,
  onAudioVolumeChange: _propTypes["default"].func,
  onAudioError: _propTypes["default"].func,
  onAudioProgress: _propTypes["default"].func,
  onAudioSeeked: _propTypes["default"].func,
  onAudioDownload: _propTypes["default"].func,
  onAudioReload: _propTypes["default"].func,
  onThemeChange: _propTypes["default"].func,
  onAudioListsChange: _propTypes["default"].func,
  onPlayModeChange: _propTypes["default"].func,
  onModeChange: _propTypes["default"].func,
  onAudioListsPanelChange: _propTypes["default"].func,
  onAudioPlayTrackChange: _propTypes["default"].func,
  onAudioListsSortEnd: _propTypes["default"].func,
  onAudioLyricChange: _propTypes["default"].func,
  showDownload: _propTypes["default"].bool,
  showPlay: _propTypes["default"].bool,
  showReload: _propTypes["default"].bool,
  showPlayMode: _propTypes["default"].bool,
  showThemeSwitch: _propTypes["default"].bool,
  showMiniModeCover: _propTypes["default"].bool,
  toggleMode: _propTypes["default"].bool,
  once: _propTypes["default"].bool,
  extendsContent: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].bool, _propTypes["default"].object, _propTypes["default"].node, _propTypes["default"].element, _propTypes["default"].string]),
  checkedText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  unCheckedText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  defaultVolume: _propTypes["default"].number,
  playModeShowTime: _propTypes["default"].number,
  bounds: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  showMiniProcessBar: _propTypes["default"].bool,
  loadAudioErrorPlayNext: _propTypes["default"].bool,
  preload: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['auto', 'metadata', 'none'])]),
  glassBg: _propTypes["default"].bool,
  remember: _propTypes["default"].bool,
  remove: _propTypes["default"].bool,
  defaultPlayIndex: _propTypes["default"].number,
  playIndex: _propTypes["default"].number,
  lyricClassName: _propTypes["default"].string,
  emptyLyricText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  showLyric: _propTypes["default"].bool,
  getContainer: _propTypes["default"].func,
  getAudioInstance: _propTypes["default"].func,
  onBeforeAudioDownload: _propTypes["default"].func,
  autoHiddenCover: _propTypes["default"].bool,
  spaceBar: _propTypes["default"].bool,
  showDestroy: _propTypes["default"].bool,
  onBeforeDestroy: _propTypes["default"].func,
  onDestroyed: _propTypes["default"].func,
  customDownloader: _propTypes["default"].func,
  audioTitle: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  responsive: _propTypes["default"].bool,
  quietUpdate: _propTypes["default"].bool,
  renderAudioTitle: _propTypes["default"].func,
  mobileMediaQuery: _propTypes["default"].string,
  volumeFade: _propTypes["default"].shape({
    fadeIn: _propTypes["default"].number,
    fadeOut: _propTypes["default"].number
  }),
  sortableOptions: _propTypes["default"].object
};
exports["default"] = _default;