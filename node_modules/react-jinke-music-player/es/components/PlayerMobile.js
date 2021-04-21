import cls from 'classnames';
import React, { isValidElement, memo } from 'react';
import PlayModeTip from './PlayModeTip';
var prefix = 'react-jinke-music-player-mobile';

var PlayerMobile = function PlayerMobile(_ref) {
  var name = _ref.name,
      cover = _ref.cover,
      singer = _ref.singer,
      playing = _ref.playing,
      duration = _ref.duration,
      currentTime = _ref.currentTime,
      loading = _ref.loading,
      themeSwitch = _ref.themeSwitch,
      progressBar = _ref.progressBar,
      openAudioListsPanel = _ref.openAudioListsPanel,
      audioPrevPlay = _ref.audioPrevPlay,
      audioNextPlay = _ref.audioNextPlay,
      playMode = _ref.playMode,
      onClose = _ref.onClose,
      playModeTipVisible = _ref.playModeTipVisible,
      currentPlayModeName = _ref.currentPlayModeName,
      extendsContent = _ref.extendsContent,
      onPlay = _ref.onPlay,
      glassBg = _ref.glassBg,
      onCoverClick = _ref.onCoverClick,
      autoHiddenCover = _ref.autoHiddenCover,
      icon = _ref.icon,
      locale = _ref.locale,
      toggleMode = _ref.toggleMode,
      renderAudioTitle = _ref.renderAudioTitle,
      shouldShowPlayIcon = _ref.shouldShowPlayIcon,
      isResetCoverRotate = _ref.isResetCoverRotate;
  return /*#__PURE__*/React.createElement("div", {
    className: cls(prefix, {
      'default-bg': !glassBg,
      'glass-bg': glassBg
    })
  }, /*#__PURE__*/React.createElement(PlayModeTip, {
    prefix: prefix,
    visible: playModeTipVisible,
    title: playMode,
    text: currentPlayModeName
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-header group")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-header-title"),
    title: name
  }, renderAudioTitle()), toggleMode && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-header-right"),
    onClick: onClose
  }, icon.close)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-singer text-center group")
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefix, "-singer-name"),
    title: singer
  }, singer)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-switch text-center group")
  }, themeSwitch), (!autoHiddenCover || autoHiddenCover && cover) && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-cover text-center"),
    onClick: function onClick() {
      return onCoverClick();
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: "cover",
    className: cls('cover', {
      'img-rotate-pause': !playing || !cover,
      'img-rotate-reset': isResetCoverRotate
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-progress group")
  }, /*#__PURE__*/React.createElement("span", {
    className: "current-time"
  }, loading ? '--' : currentTime), /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefix, "-progress-bar")
  }, progressBar), /*#__PURE__*/React.createElement("span", {
    className: "duration text-right"
  }, loading ? '--' : duration)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-toggle text-center group")
  }, /*#__PURE__*/React.createElement("span", {
    className: "group prev-audio",
    title: locale.previousTrackText,
    onClick: audioPrevPlay
  }, icon.prev), loading ? /*#__PURE__*/React.createElement("span", {
    className: "group loading-icon"
  }, icon.loading) : /*#__PURE__*/React.createElement("span", {
    className: "group play-btn",
    title: shouldShowPlayIcon ? locale.clickToPlayText : locale.clickToPauseText,
    onClick: onPlay
  }, shouldShowPlayIcon ? icon.play : icon.pause), /*#__PURE__*/React.createElement("span", {
    className: "group next-audio",
    title: locale.nextTrackText,
    onClick: audioNextPlay
  }, icon.next)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefix, "-operation group")
  }, /*#__PURE__*/React.createElement("ul", {
    className: "items"
  }, [playMode, icon.download, icon.reload, icon.lyric].filter(isValidElement).map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      key: item.props.className
    }, item);
  }), extendsContent, /*#__PURE__*/React.createElement("li", {
    className: "item",
    onClick: openAudioListsPanel
  }, icon.playLists))));
};

PlayerMobile.defaultProps = {
  icon: {},
  renderAudioTitle: function renderAudioTitle() {}
};
export default /*#__PURE__*/memo(PlayerMobile);