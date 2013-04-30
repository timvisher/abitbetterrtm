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

ABBRTM.Shortcut.prototype.keyCodesToAlpha = {
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  191: {
    'unmodified': '/',
    'shift': '?'
  },
};

ABBRTM.Shortcut.prototype.toString = function () {
  var str;

  if ('object' === typeof(this.keyCodesToAlpha[this.key])) {
    if (this.shiftKey) {
      str = this.keyCodesToAlpha[this.key].shift;
    }
    str = this.keyCodesToAlpha[this.key].unmodified;
  } else {
    str = this.keyCodesToAlpha[this.key];
  }

  if (this.metaKey) {
    str = '⌘'
  }

  if (this.shiftKey) {
    str = '⇧' + str;
  }

  if (this.altKey) {
    str = '⌥' + str;
  }

  if (this.ctrlKey) {
    str = '^' + str;
  }

  return str;
};

ABBRTM.Shortcut.prototype.run = function()
{
  console.log(this.toString());
  if (this.method) {
    if (this.owner) {
      this.method.call(this.owner);
    }
    else {
      this.method();
    }
  }
};
