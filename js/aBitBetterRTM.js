'use strict';

ABBRTM = window.ABBRTM || {};

ABBRTM.ABitBetterRTM = function () {
  this.settings = new ABBRTM.Settings();
  this.settings.init();
  this.taskList = new ABBRTM.TaskList(this);
  this.listList = new ABBRTM.ListList();
  this.listTabs = new ABBRTM.ListTabs(this);
  this.listTabs.blitDiv();

  this.autocompletes = {};
  this.shortcuts = [];

  this.initAutocompletes();
  this.initShortcuts();
  this.overrideBodyKeyDownHandler();

  settingsTabs.addEntry("A Bit Better RTM");
  settingsView.addState("A Bit Better RTM", [this.settings], settingsTabs);
  settingsTabs.blitDiv();
};

ABBRTM.ABitBetterRTM.prototype.initShortcuts = function () {
  ABBRTM.Shortcut.shortcut({
    key: 'G',
    owner: this.autocompletes.goTo,
    handler: this.autocompletes.goTo.show,
    description: "Go To List",
    ctrl: true,
    shift: false,
    alt: false
  });
  ABBRTM.Shortcut.shortcut({
    key: 'M',
    owner: this.autocompletes.moveTo,
    handler: this.autocompletes.moveTo.show,
    description: "Move Task(s) To List",
    ctrl: true,
    shift: false,
    alt: false
  });
  ABBRTM.Shortcut.shortcut({
    key: '/',
    owner: null,
    handler: function(){$("#listFilter").focus().effect('highlight', '', 'slow');},
    description: "Focus Search",
    ctrl: false,
    shift: false,
    alt: false});

  ABBRTM.Shortcut.shortcut({
    key: '?',
    owner: null,
    handler: ABBRTM.Help.showHelp,
    description: "Display Help",
    ctrl: false,
    shift: true,
    alt: false
  });

  if (ABBRTM.configuration.displayTabsToTheLeft()) {
    ABBRTM.Shortcut.shortcut({
      key: 'J',
      owner: this.listTabs,
      handler: this.listTabs.selectNextList,
      description: "Select Next List",
      ctrl: false,
      shift: true,
      alt: false
    });
    ABBRTM.Shortcut.shortcut({
      key: 'K',
      owner: this.listTabs,
      handler: this.listTabs.selectPreviousList,
      description: "Select Previous List",
      ctrl: false,
      shift: true,
      alt: false
    });
    ABBRTM.Shortcut.shortcut({
      key: 'O',
      owner: this.listTabs,
      handler: this.listTabs.openSelectedList,
      description: "Open Selected List",
      ctrl: false,
      shift: true,
      alt: false
    });

    if (ABBRTM.configuration.quickAddList()) {
      ABBRTM.Shortcut.shortcut({
        key: 'Q',
        owner: this.listTabs.listAdder,
        handler: this.listTabs.listAdder.showListEntryBox,
        description: "Add List",
        ctrl: false,
        shift: false,
        alt: false
      });
    }
  }
};

ABBRTM.ABitBetterRTM.prototype.initAutocompletes = function () {
  this.autocompletes.goTo = new ABBRTM.Autocomplete("GO TO: ", new ABBRTM.ListAutocompleteStore(this.listTabs), this.listTabs, this.listTabs.selectListByName);
  this.autocompletes.moveTo = new ABBRTM.Autocomplete("MOVE TO: ", new ABBRTM.ListAutocompleteStore(this.listTabs), this.listTabs, this.listTabs.moveSelectedTasksToListByName);
};

ABBRTM.ABitBetterRTM.prototype.overrideBodyKeyDownHandler = function () {
  var that = this;
  var handleKeyDownEvent = function(ev) {
    ev || (ev = window.event);
    var target = utility.getEventTarget(ev);

    if (target == null) {
      return true;
    }

    ev.pressed = (ev.charCode) ? ev.charCode : ((ev.which) ? ev.which : ev.keyCode);
    // NB: Don't delete. Very useful for debugging
    // console.log('pressed: %s', ev.pressed);
    // console.log('ctrlKey: %s', ev.ctrlKey);
    // console.log('shiftKey: %s', ev.shiftKey);
    // console.log('altKey: %s', ev.altKey);
    // console.log('metaKey: %s', ev.metaKey);

    if (target && (/^(textarea|input|text|password|select|button|submit)/i.test(target.type) || target.id == "map")) {
      return true;
    }

    for (var i = 0; i < ABBRTM.Shortcut.shortcuts.length; ++i) {
      if ((ABBRTM.Shortcut.shortcuts[i][0].key === ev.pressed) &&
          (ABBRTM.Shortcut.shortcuts[i][0].ctrl === ev.ctrlKey) &&
          (ABBRTM.Shortcut.shortcuts[i][0].shift === ev.shiftKey) &&
          (ABBRTM.Shortcut.shortcuts[i][0].alt === ev.altKey) &&
          (ev.metaKey === false)) {
        for (var h = 0; h < ABBRTM.Shortcut.shortcuts[i][1].length; h += 1) {
          ABBRTM.Shortcut.run(ABBRTM.Shortcut.shortcuts[i][1][h]);
          utility.stopEvent(ev);
          return false;
        }
      }
    }

    return true;
  }

  if (eventMgr) {
    var oldBodyKeyDownHandler = eventMgr.bodyKeyDownHandler;

    eventMgr.bodyKeyDownHandler = function(ev) {
      if (handleKeyDownEvent(ev) === true) {
        return oldBodyKeyDownHandler.call(eventMgr, ev);
      }

      return true;
    };
  }
};
