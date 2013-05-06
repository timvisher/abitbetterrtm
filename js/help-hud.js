'use strict';

var ABBRTM = window.ABBRTM || {};

ABBRTM.HelpHud = (function () {

  var abbrtmHelpHud = {};

  var self = abbrtmHelpHud;

  abbrtmHelpHud.keyToHelpNodes = function (key) {
    return ABBRTM.Template.tmpl('help-key-description-pair', key);
  };

  abbrtmHelpHud.$el = function () {
    var the$el;

    if (self.the$el) {
      return self.the$el;
    }

    the$el = $('#abbrtm-help-hud-container');

    if (0 === the$el.length) {
      $(ABBRTM.Template.tmpl('help-hud')).appendTo(window.top.document.body);
    } else {
      self.the$el = the$el;
    }

    return self.$el();
  };

  abbrtmHelpHud.$tbodyEl = function () {
    if (self.the$tbodyEl) {
      return self.the$tbodyEl;
    }

    self.the$tbodyEl = self.$el().find('tbody');

    return self.$tbodyEl();
  };

  abbrtmHelpHud.toggleHelpHud = function () {
    var helpKeys, keyTmpls;

    if (self.$el().hasClass('s-shown')) {
      self.$el().removeClass('s-shown');
      return true;
    }

    self.$tbodyEl().empty();

    helpKeys = _.flatten(_.map(ABBRTM.Shortcut.shortcuts, function (s) { return s[1]; }));
    keyTmpls = _.map(helpKeys, self.keyToHelpNodes);

    _.each(keyTmpls, function (t) {
      $(t).appendTo(self.$tbodyEl());
    });

    self.$el().addClass('s-shown');
    return true;
  };

  return self;

}());
