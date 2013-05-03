'use strict';

ABBRTM = window.ABBRTM || {};

ABBRTM.Shortcut = (function () {

  var abbrtmShortcut = {};

  var self = abbrtmShortcut;

  abbrtmShortcut.shortcuts = [];

  // Takes a map with key, owner, handler [, ctrl, shift, alt, meta]
  abbrtmShortcut.shortcut = function (key) {
    var i, keyKey;

    keyKey = {
      key: self.keys[key.key],
      ctrl: key.ctrl,
      shift: key.shift,
      alt: key.alt
    };

    // No shortcuts added yet, push the first one
    if (0 === self.shortcuts.length) {
      self.shortcuts.push([keyKey, [key]]);
      return self;
    }

    // Any matching shortcuts? push they key into the handler vector
    for (i = 0; i < self.shortcuts.length; i += 1) {
      if (self.shortcuts[i][0].key === self.keys[key.key] &&
          self.shortcuts[i][0].ctrl === key.ctrl &&
          self.shortcuts[i][0].shift === key.shift &&
          self.shortcuts[i][0].alt === key.alt) {
        self.shortcuts[i][1].push(key);
        return self;
      }
    }

    // No matching shortcuts, push it on to the master list
    self.shortcuts.push([keyKey, [key]]);
    return self;
  };

  abbrtmShortcut.keys = {
    'A': 65,
    'B': 66,
    'C': 67,
    'D': 68,
    'E': 69,
    'F': 70,
    'G': 71,
    'H': 72,
    'I': 73,
    'J': 74,
    'K': 75,
    'L': 76,
    'M': 77,
    'N': 78,
    'O': 79,
    'P': 80,
    'Q': 81,
    'R': 82,
    'S': 83,
    'T': 84,
    'U': 85,
    'V': 86,
    'W': 87,
    'X': 88,
    'Y': 89,
    'Z': 90,
    '/': 191,
    '?': 191
  };

  abbrtmShortcut.keyToString = function (key) {
    var str;

    str = key.key;

    if (key.meta) {
      str = '⌘' + str;
    }

    if (key.shift) {
      str = '⇧' + str;
    }

    if (key.alt) {
      str = '⌥' + str;
    }

    if (key.ctrl) {
      str = '^' + str;
    }

    return str + ': ' + key.description;
  };

  abbrtmShortcut.run = function (key) {
    if (key.handler) {
      if (key.owner) {
        key.handler.call(key.owner);
      }
      else {
        key.handler();
      }
    }
  };

  return abbrtmShortcut;

}());
