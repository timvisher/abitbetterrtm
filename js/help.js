ABBRTM = window.ABBRTM || {};

ABBRTM.Help = (function () {

  var abbrtmHelp = {};

  var self = abbrtmHelp;

  abbrtmHelp.showHelp = function () {
    for (var i = 0; i < ABBRTM.Shortcut.shortcuts.length; i += 1) {
      for (var h = 0; h < ABBRTM.Shortcut.shortcuts[i][1].length; h += 1) {
        console.log(ABBRTM.Shortcut.keyToString(ABBRTM.Shortcut.shortcuts[i][1][h]));
      }
    }
  };

  return self;

}());