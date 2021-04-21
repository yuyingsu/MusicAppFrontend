import cls from 'classnames';
import React, { memo } from 'react';
import { PLAYER_KEY } from '../config/player';
import SORTABLE_CONFIG from '../config/sortable';

var AudioListsPanel = function AudioListsPanel(_ref) {
  var audioLists = _ref.audioLists,
      onCancel = _ref.onCancel,
      onDelete = _ref.onDelete,
      onPlay = _ref.onPlay,
      playId = _ref.playId,
      loading = _ref.loading,
      panelToggleAnimate = _ref.panelToggleAnimate,
      glassBg = _ref.glassBg,
      remove = _ref.remove,
      removeId = _ref.removeId,
      isMobile = _ref.isMobile,
      locale = _ref.locale,
      icon = _ref.icon,
      playing = _ref.playing;
  return /*#__PURE__*/React.createElement("div", {
    className: cls('audio-lists-panel', panelToggleAnimate, {
      'audio-lists-panel-mobile': isMobile,
      'glass-bg': glassBg
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "audio-lists-panel-header"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "audio-lists-panel-header-title"
  }, /*#__PURE__*/React.createElement("span", null, locale.playListsText, " / "), /*#__PURE__*/React.createElement("span", {
    className: "audio-lists-panel-header-num"
  }, audioLists.length), /*#__PURE__*/React.createElement("span", {
    className: "audio-lists-panel-header-actions"
  }, remove && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "audio-lists-panel-header-delete-btn",
    title: locale.removeAudioListsText,
    onClick: onDelete()
  }, icon["delete"]), /*#__PURE__*/React.createElement("span", {
    className: "audio-lists-panel-header-line"
  })), /*#__PURE__*/React.createElement("span", {
    className: "audio-lists-panel-header-close-btn",
    title: locale.closeText,
    onClick: onCancel
  }, isMobile ? icon.packUpPanelMobile : icon.close)))), /*#__PURE__*/React.createElement("div", {
    className: cls('audio-lists-panel-content', {
      'no-content': audioLists.length < 1
    })
  }, audioLists.length >= 1 ? /*#__PURE__*/React.createElement("ul", {
    className: SORTABLE_CONFIG.selector
  }, audioLists.map(function (audio) {
    var name = audio.name,
        singer = audio.singer;
    var audioId = audio[PLAYER_KEY];
    var isCurrentPlaying = playId === audioId;
    return /*#__PURE__*/React.createElement("li", {
      key: audioId,
      title: !playing ? locale.clickToPlayText : isCurrentPlaying ? locale.clickToPauseText : locale.clickToPlayText,
      className: cls('audio-item', {
        playing: isCurrentPlaying
      }, {
        pause: !playing
      }, {
        remove: removeId === audioId
      }),
      onClick: function onClick() {
        return onPlay(audioId);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "group player-status"
    }, /*#__PURE__*/React.createElement("span", {
      className: "player-icons"
    }, isCurrentPlaying && loading ? icon.loading : isCurrentPlaying ? playing ? icon.pause : icon.play : undefined)), /*#__PURE__*/React.createElement("span", {
      className: "group player-name",
      title: name
    }, name), /*#__PURE__*/React.createElement("span", {
      className: "group player-singer",
      title: singer
    }, singer), remove && /*#__PURE__*/React.createElement("span", {
      className: "group player-delete",
      title: locale.clickToDeleteText(name),
      onClick: onDelete(audioId)
    }, icon.close));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, icon.empty), /*#__PURE__*/React.createElement("span", {
    className: "no-data"
  }, locale.emptyText || locale.notContentText))));
};

export default /*#__PURE__*/memo(AudioListsPanel);