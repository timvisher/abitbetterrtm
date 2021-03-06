var ABBRTM = window.ABBRTM || {};

ABBRTM.appendScript = function(src, callback) {
  if (!window.top.document.getElementById(src)) {
    var scriptElement = window.top.document.createElement("script");
    scriptElement.src = chrome.extension.getURL(src);
    scriptElement.id = src;
    window.top.document.body.appendChild(scriptElement);

    if (callback) {
      scriptElement.onload = callback;
    }
  }
}

ABBRTM.appendCss = function (src) {
  if (!window.top.document.getElementById(src)) {
    var cssElement = window.top.document.createElement('link');
    cssElement.rel = 'stylesheet';
    cssElement.href = chrome.extension.getURL(src);
    cssElement.id = src;
    window.top.document.body.appendChild(cssElement);
  }
};

ABBRTM.appendTemplateString = function (scriptSrc) {
  $(scriptSrc).appendTo(window.top.document.body);
};

ABBRTM.appendTemplate = function (src) {
  $.get(chrome.extension.getURL(src), ABBRTM.appendTemplateString);
};

ABBRTM.appendABitBetterRTMCode = function() {
  if (!arguments.callee.done) {
    arguments.callee.done = true;

    var templates = function () {
      ABBRTM.appendTemplate('templates/help-hud.html');
      ABBRTM.appendTemplate('templates/help-key-description-pair.html');
      ABBRTM.appendTemplate('templates/settings.html');
      ABBRTM.appendScript("frameworks/jquery-ui-1.7.2.custom.min.js", abitbetterrtmCss);
    };
    var underscore = function () {
      ABBRTM.appendScript("frameworks/underscore-1.4.4.min.js", templates);
    };
    ABBRTM.appendScript("frameworks/jquery-1.3.2.min.js", underscore);
    ABBRTM.appendScript("js/help-hud.js");
    ABBRTM.appendScript('js/template.js');
    ABBRTM.appendCss('css/help-hud.css');
    ABBRTM.appendCss('css/settings.css');
    function abitbetterrtmCss() { ABBRTM.appendScript("css/abitbetterrtm.css.js", uiResizableCss); }
    function uiResizableCss() { ABBRTM.appendScript("css/ui.resizable.css.js", utility); }
    function utility() { ABBRTM.appendScript("js/utility.js", abrLocation); }
    function abrLocation() { ABBRTM.appendScript("js/location.js", configuration); }
    function configuration() { ABBRTM.appendScript("js/configuration.js", listAutocompleteStore); }
    function listAutocompleteStore() { ABBRTM.appendScript("js/listAutocompleteStore.js", autocompleteList); }
    function autocompleteList() { ABBRTM.appendScript("js/autocompleteList.js", autocomplete); }
    function autocomplete() { ABBRTM.appendScript("js/autocomplete.js", listAdder); }
    function listAdder() { ABBRTM.appendScript("js/listAdder.js", listTabs); }
    function listTabs() { ABBRTM.appendScript("js/listTabs.js", shortcut); }
    function shortcut() { ABBRTM.appendScript("js/shortcut.js", taskList); }
    function taskList() { ABBRTM.appendScript("js/taskList.js", listList); }
    function listList() { ABBRTM.appendScript("js/listList.js", settings); }
    function settings() { ABBRTM.appendScript("js/settings.js", aBitBetterRTM); }
    function aBitBetterRTM() { ABBRTM.appendScript("js/aBitBetterRTM.js", init); }
    function init(){ ABBRTM.appendScript("js/init.js"); }
  }
}

ABBRTM.appendABitBetterRTMCode();

