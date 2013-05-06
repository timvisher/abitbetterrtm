ABBRTM = window.ABBRTM || {};

ABBRTM.Settings = function()
{
  this.mbn = null;
  this.div = document.createElement("div");

  var generalSettings = document.getElementById("general");
  if (generalSettings)
  {
    generalSettings.parentNode.appendChild(this.div);
  }

  this.div.style.display = "none";
  this.div.innerHTML = ABBRTM.Template.tmpl('settings');

  this.tasksCount_on = document.getElementById("abbrtm_taskscount_on");
  this.tasksCount_off = document.getElementById("abbrtm_taskscount_off");
  this.tabsOnTheLeft_on = document.getElementById("abbrtm_tabsontheleft_on");
  this.tabsOnTheLeft_off = document.getElementById("abbrtm_tabsontheleft_off");
  this.displayTabsOn = document.getElementById("abbrtm-display-tabs-on");
  this.displayTabsOff = document.getElementById("abbrtm-display-tabs-off");
  this.quickAddList_on = document.getElementById("abbrtm_quickaddlist_on");
  this.quickAddList_off = document.getElementById("abbrtm_quickaddlist_off");
  this.uniqueURL_on = document.getElementById("abbrtm_uniqueurl_on");
  this.uniqueURL_off = document.getElementById("abbrtm_uniqueurl_off");
  this.settingsSave = document.getElementById("abbrtm_settingssubmit");
  this.settingsCancel = document.getElementById("abbrtm_settingscancel");
  this.settingsSave.disabled = true;
  this.settingsCancel.disabled = true;
}

ABBRTM.Settings.prototype.init = function()
{
  this.mbn = this.getUniqueMessageBusName();
  this.loadSettings();

  var that = this;
  var optionClickHandler = function()
  {
    that.settingsSave.disabled = false;
    that.settingsCancel.disabled = false;
  }

  var cancelClickHandler = function(event)
  {
    that.loadSettings();
    that.settingsSave.disabled = true;
    that.settingsCancel.disabled = true;
    return false;
  }

  var saveClickHandler = function()
  {
    that.saveSettings();
    that.settingsSave.disabled = true;
    that.settingsCancel.disabled = true;

    location.reload(true);
  }

  this.tasksCount_on.addEventListener("click", optionClickHandler, false);
  this.tasksCount_off.addEventListener("click", optionClickHandler, false);
  this.tabsOnTheLeft_on.addEventListener("click", optionClickHandler, false);
  this.tabsOnTheLeft_off.addEventListener("click", optionClickHandler, false);
  this.quickAddList_on.addEventListener("click", optionClickHandler, false);
  this.quickAddList_off.addEventListener("click", optionClickHandler, false);
  this.uniqueURL_on.addEventListener("click", optionClickHandler, false);
  this.uniqueURL_off.addEventListener("click", optionClickHandler, false);
  this.settingsCancel.addEventListener("click", cancelClickHandler, false);;
  this.settingsSave.addEventListener("click", saveClickHandler, false);;
}

ABBRTM.Settings.prototype.getUniqueMessageBusName = function()
{
  return "abitbetterrtm.settings.";
};

ABBRTM.Settings.prototype.loadSettings = function()
{
  if (ABBRTM.configuration.showTasksCount() === true)
  {
    this.tasksCount_on.checked = 'true';
  }
  else
  {
    this.tasksCount_off.checked = 'true';
  }

  if (ABBRTM.configuration.displayTabsToTheLeft() === true)
  {
    this.tabsOnTheLeft_on.checked = 'true';
  }
  else
  {
    this.tabsOnTheLeft_off.checked = 'true';
  }

  if (ABBRTM.configuration.quickAddList() === true)
  {
    this.quickAddList_on.checked = 'true';
  }
  else
  {
    this.quickAddList_off.checked = 'true';
  }

  if (ABBRTM.configuration.uniqueURLForListAndTask() === true)
  {
    this.uniqueURL_on.checked = 'true';
  }
  else
  {
    this.uniqueURL_off.checked = 'true';
  }
};

ABBRTM.Settings.prototype.saveSettings = function()
{
  ABBRTM.configuration.showTasksCount(this.tasksCount_on.checked);
  ABBRTM.configuration.displayTabsToTheLeft(this.tabsOnTheLeft_on.checked);
  ABBRTM.configuration.displayTabs(this.displayTabsOn.checked);
  ABBRTM.configuration.quickAddList(this.quickAddList_on.checked && this.tabsOnTheLeft_on.checked);
  ABBRTM.configuration.uniqueURLForListAndTask(this.uniqueURL_on.checked);
};

ABBRTM.Settings.prototype.hide = function()
{
  this.div.style.display = "none";
};

ABBRTM.Settings.prototype.show = function()
{
  this.div.style.display = "";
};
