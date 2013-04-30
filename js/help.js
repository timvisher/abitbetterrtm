ABBRTM = window.ABBRTM || {};

ABBRTM.Help = (function () {

  var abbrtmHelp = {};

  var self = abbrtmHelp;

  abbrtmHelp.showHelp = function () {
    for (var i = 0; i < ABBRTM.aBitBetterRTM.shortcuts.length; i += 1) {
      console.log(ABBRTM.aBitBetterRTM.shortcuts[i].toString());
    }
  };

  return self;

}());
