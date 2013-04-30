ABBRTM = window.ABBRTM || {};

ABBRTM.Shortcut = function(key, owner, method, ctrlKey, shiftKey, altKey)
{
  this.key = this.keys[key];
  this.owner = owner;
  this.method = method;
  this.ctrlKey = ctrlKey;
  this.shiftKey = shiftKey;
  this.altKey = altKey;
}

ABBRTM.Shortcut.prototype.keys = {
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

ABBRTM.Shortcut.prototype.run = function()
{
  if (this.method) {
    if (this.owner) {
      this.method.call(this.owner);
    }
    else {
      this.method();
    }
  }
};
