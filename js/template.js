'use strict';

var ABBRTM = window.ABBRTM || {};

ABBRTM.Template = (function () {

  var abbrtmTemplate = {};

  var self = abbrtmTemplate;

  abbrtmTemplate.tmplFns = {};

  abbrtmTemplate.tmpl = function (tmplId, data) {
    if (0 > tmplId.indexOf('-template')) {
      tmplId += '-template';
    }

    if (self.tmplFns[tmplId]) {
      return self.tmplFns[tmplId](data);
    }

    var $tmpl = $('#' + tmplId);

    if (0 === $tmpl.length) {
      throw 'Could not find template: ' + tmplId;
    }

    self.tmplFns[tmplId] = _.template($tmpl.html());
    return self.tmpl(tmplId, data);
  };

  return abbrtmTemplate;

}());
