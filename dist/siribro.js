(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["siribro"] = factory();
	else
		root["siribro"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

var html = __webpack_require__(12);

function init(element) {
  element.innerHTML += html;
}

module.exports = {
  init: init
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseMarkdown = __webpack_require__(10);

function load(url) {
  return window.fetch(url, { method: 'GET' }).then(function (res) {
    if (res.headers.get('Content-Type') !== 'application/json') {
      return res.text().then(function (markdown) {
        return parseMarkdown(markdown);
      });
    }

    return res.json();
  });
}

module.exports = load;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(3);
var ieee754 = __webpack_require__(6);
var isArray = __webpack_require__(7);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	var fixedCss = css.replace(/url *\( *(.+?) *\)/g, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global window */

var isArray = __webpack_require__(0);

function buildOptionGroupObj() {
  // We build an optionGroup
  var obj = {
    "type": "optionGroup",
    "options": []
  };
  return obj;
}

function buildOptionObj(dataArray, lines, leadingSpaceCount) {
  var option = null;
  // build an option from dataArray
  if (isArray(dataArray) && dataArray.length > 0) {
    var steps = buildChilds(lines, leadingSpaceCount + 1);
    option = {
      "type": "option",
      "value": dataArray[1],
      "steps": steps
    };
  }
  return option;
}

function buildSentenceObj(dataArray) {
  // build a sentence line from a dataArray
  var obj = null;
  if (isArray(dataArray) && dataArray.length > 0) {
    obj = {
      "type": "sentence",
      "text": $.trim(dataArray[1])
    };
  }
  return obj;
}

function buildFunctionObj(dataArray) {
  // build a function line from a dataArray
  var obj = null;
  if (isArray(dataArray) && dataArray.length > 0) {
    var functionName = dataArray[1];
    var param = dataArray.length > 2 ? $.trim(dataArray[2]) : null;
    switch (functionName) {
      case "input":
        obj = {
          "type": "input",
          "data": param
        };
        break;
      case "goto":
        obj = {
          "type": "goto",
          "value": param
        };
        break;
      case "pause":
        obj = {
          "type": "pause",
          "millisecond": param
        };
        break;
      default:
        // unknown function (Custom function)
        obj = {
          "type": "function",
          "name": functionName
        };
    }
  }
  return obj;
}

function buildChilds(lines, currentIndentation) {
  var childs = [];
  var leadingPattern = new RegExp(/^(\s*)/, ""); // Anything that begin with a space or \t
  var sentencePattern = new RegExp(/\s*\*\s(.+)$/, ""); // ex : * Hi, how are you ?
  var functionPattern = new RegExp(/^\s*\*\s`\s*(.+)\((\w*)\)\s*`\s*$/, ""); //ex : * `input(firstTime)`
  var optionListPattern = new RegExp(/^\s*\d{1,}\.\s(.+)$/, ""); // ex :     1. Yes it's Ok


  var obj = {};
  while (lines.length > 0) {
    var line = lines[0];

    var leadingSpace = leadingPattern.exec(line);
    var leadingSpaceCount = leadingSpace[0].length;

    if (leadingSpaceCount < currentIndentation) {
      break; // This line is at least 1 level above, so we exit the loop
    }

    //As we will process this line, we can  remove it safely from the line array
    lines.shift();

    var matchArray = null; // RegExp.exec will parse the expression and return the matching groups when exist
    if (matchArray = functionPattern.exec(line)) {
      obj = buildFunctionObj(matchArray);
      if (obj) {
        childs.push(obj);
      }
    } else if (matchArray = sentencePattern.exec(line)) {
      obj = buildSentenceObj(matchArray);
      if (obj) {
        childs.push(obj);
      }
    } else if (matchArray = optionListPattern.exec(line)) {
      if (obj.type != "optionGroup") {
        //We create the root optionGroup
        obj = buildOptionGroupObj();
        if (obj) {
          childs.push(obj);
        }
      }
      // We are already in an optionGroup, we add this option
      var option = buildOptionObj(matchArray, lines, leadingSpaceCount);
      if (option) obj.options.push(option);
    } else {
      obj = null;
    }
  }

  return childs;
}

function buildBloc(lines) {
  var dialogBlocPattern = new RegExp(/^#\s(\w+)\s*$/, "g"); //  ex : # FirstTime
  var valueListPattern = new RegExp(/^(\[\w+\])\s*$/, ""); //  ex : [Yes]
  var valuePattern = new RegExp(/\s*\*\s(.+)/, "");

  var blockHeader = lines.shift();
  var jsonBlock = null;
  var matchArray = null;
  var childs = [];
  // There is two type of blocs : Dialog bloc and ValueBloc
  if (matchArray = dialogBlocPattern.exec(blockHeader)) {
    childs = buildChilds(lines, 0);
    jsonBlock = {
      "type": "dialog_bloc",
      "name": matchArray[1],
      "steps": childs
    };
  } else if (matchArray = valueListPattern.exec(blockHeader)) {
    // We need to get every value after and put then in the values list
    var value = null;
    for (var j = 0; j < lines.length; j++) {
      if (value = valuePattern.exec(lines[j])) {
        childs.push($.trim(value[1]));
      }
    }
    jsonBlock = {
      "type": "value_bloc",
      "name": matchArray[1],
      "values": childs
    };
  }

  return jsonBlock;
}

function parseMarkdown(markdownString) {
  var json = null;

  var linePattern = new RegExp(/^.*$/, "gm"); // Anything that ends with a newline
  var emptyLinePattern = new RegExp(/^\s*$/, "g"); // ex :
  var singleLineCommentPattern = new RegExp(/[^.]?\/\/.*$/, "gm"); // ex : //
  var multiLineCommentPattern = new RegExp(/[^.]?\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//, "g"); // ex : /*  this is a comment */

  if (markdownString) {
    json = [];

    //We trim comments from the document
    markdownString = markdownString.replace(singleLineCommentPattern, '').replace(multiLineCommentPattern, '');

    // Replace \t with four space
    markdownString = markdownString.replace(/\t/g, '    ');

    //We split lines
    var lines = markdownString.match(linePattern);
    lines.push(""); // We add an empty line at the end

    // bloc : multiline text. Each bloc are separated from each other by at least one empty line
    var blocs = []; // will contain a list of bloc
    var currentBloc = [];

    // We match the line against empty patterns to find blocs
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (emptyLinePattern.test(line)) {
        // EMPTY LINE : if there is a bloc, we add it to the list of blocks
        if (currentBloc.length > 0) {
          blocs.push(currentBloc);
          currentBloc = [];
        }
      } else currentBloc.push(line);
    }

    // We transform each block into a json object
    for (var i = 0; i < blocs.length; i++) {
      var jsonBlock = buildBloc(blocs[i]);
      if (jsonBlock) json.push(jsonBlock);
    }
  }

  return json;
}

module.exports = parseMarkdown;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "#chatContainer {\n  margin: 50px 0 0;\n  bottom: 10px;\n  right: 20px;\n  position: fixed\n}\n\n#chatContainer .clear {\n  clear: both\n}\n\n#chatContainer table, td, tr {\n  margin: 0;\n  padding: 0\n}\n\n#chatContainer button:focus, #chatContainer input:focus {\n  outline: 0\n}\n\n#chatContainer .message {\n  padding: 5px 10px 3px 5px\n}\n\n#chatContainer .message table {\n  width: 100%\n}\n\n#chatContainer .message table td:first-of-type {\n  width: 44px;\n  vertical-align: bottom\n}\n\n#chatContainer .sentence div:first-child {\n  padding: 2px 7px;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  line-height: 16px;\n  word-wrap: break-word\n}\n\n#chatContainer .interphrase {\n  clear: both;\n  margin-top: 1px;\n  height: 1px\n}\n\n#chatContainer .portrait {\n  background-size: contain;\n  width: 32px;\n  height: 32px;\n  border-radius: 10px;\n  overflow: hidden;\n  margin-right: 10px\n}\n\n#chatContainer .fromBot {\n  text-align: left\n}\n\n#chatContainer .fromBot .portrait {\n  background-size: contain;\n  margin-bottom: 10px\n}\n\n#chatContainer .fromBot .sentence div:first-child {\n  background: #e6e6e6;\n  color: #000;\n  float: left\n}\n\n#chatContainer .fromUser {\n  text-align: right\n}\n\n#chatContainer .fromUser .sentence div:first-child {\n  background: #4080ff;\n  color: #fff;\n  float: right\n}\n\n#chatContainer .fromHistory {\n  opacity: .8\n}\n\n#chatContainer .fromSystem {\n  text-align: center;\n  font-size: 12px;\n  font-family: sans-serif;\n  color: #555;\n  font-weight: 200\n}\n\n#chatContainer .chatZone {\n  overflow: hidden;\n  width: 260px;\n  margin: auto;\n  border: 1px solid #d6d6d6\n}\n\n#chatContainer .textZoneContainer {\n  position: relative;\n  height: 300px;\n  overflow: none\n}\n\n#chatContainer .textZoneContainer .textZone {\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  max-height: 300px;\n  overflow: auto\n}\n\n#chatContainer .sentence:first-child div:first-child {\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px\n}\n\n#chatContainer .sentence:last-child div:first-child {\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n  margin-bottom: 5px\n}\n\n#chatContainer .fromBot .sentence div:first-child {\n  border-top-right-radius: 8px;\n  border-bottom-right-radius: 8px\n}\n\n#chatContainer .fromUser .sentence div:first-child {\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px\n}\n\n#chatContainer .message.typing {\n  margin-top: 0\n}\n\n#chatContainer .typing .sentence div:first-child {\n  background-image: url(data:image/gif;base64,R0lGODlhTQAmAPf/AObm6ujo6q6tsuXk6eXk7auqrZiXmo+OkKalqe7t8/Dv9fLx9/n4/p+eor++w+Pi6Ojn64WEh6Cfo+rp8L28wZuanvj3/uDf5fj3/Pf2/K+us+bm5ejo6MHAxerq69LR1tDP1KCgoJ6enYaFiLq7v+Xl5qGgpLm4vYqJjZSTlvPy95ubm7OytsC/xKOipqmoq/b1+7e2u7i3vNfW3KKhpeTl5Lq5v+Lg6Nzb4Pb0/JaVmfTz+szL0ZCPk6Ojo4KBhNnY3srJzoyLj+bl57KxttTT2JOSlc/O08/O1MrJ0KampsbFyp6dooiHibe2vLW0uff2+/Hx9Ozr8+Tj5ZGQlMjHzI2MjcPCx4qKi7u6v5mYnJOTk5GRkY+PjoOChebl7ebm5+bl7Obl6uXk6uTj6ebm6Ofm7Ofn5+bl6ebl7uzr8e/u9L69wuvq8OTj6Orp7+bm6ejn7e3s8vPy+OXk6+Tj6uno7u3s8/Hw9vX0+u7t9Obl6PPy+erp7vHw9/Tz+ZeWmufn6KSjp7y7wOvq77Gwtebk7pGQk+jn7PX0++vq8ePi5+jn7uHg5fDv9rq5veLh59va37a1upeWmZ6doefm7efm6o2Mj5KRleno79fW2+bk7JqZncnIzeHg5+bk7+/u9ZWUmMvKz8PCyO3s8dbV2pybnqOipd7d4trZ3+vq8uPj4rOyuJiXm5OSl+3s9JyboNva4JeXlt/e5Obk7fLx+LSzuObn5ufn5ufl7bKxtb69waGgo+fn6eno7aSjqKinq+Xl6sLBxs7N0uTk4+Xl7OXm5ZiYl4+Qj728wuXj6efn7by7vvLy8rm4vpiWmOLh5eXk7uPj5KKhpu/u8/X0+ebk8fHw+IKCgefm6LW0ura1ube2uZ2coJCPj9jX3J+eodXU1/Pz+MHAw5STkpqZnpuanZSUk8LBxObl78nIzp+fn8rKzfX0/JGRju3t86uqr+vp8KyrsNTT1+np7unp783M0c3M0peYl87N0c7O0dXU2tbW2ebl6+bm5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMUNENjk1N0QxRDk5RjZCMkY1RDgyNzhCQjg0MEY4ODYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODEzQTk3QjUyMEI5MTFFMzkxMTdEODlGMTI5NTlCRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODEzQTk3QjQyMEI5MTFFMzkxMTdEODlGMTI5NTlCRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNkQ1QkI4RDUyMzY4MTE4MjJBRjRCMjFGNkM5RDdGIiBzdFJlZjpkb2N1bWVudElEPSIxQ0Q2OTU3RDFEOTlGNkIyRjVEODI3OEJCODQwRjg4NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2pp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);\n  background-size: contain;\n  width: 27px\n}\n\n#chatContainer .inputArea {\n  border-top: 1px solid #e6e6e6;\n  padding: 5px 5px 2px 10px\n}\n\n#chatContainer .inputArea input {\n  border: 0;\n  width: 100%;\n  height: 24px;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 12px\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<div id=\"chatContainer\" style=\"display:none\" class=\"close\">\n  <form data-id=\"chatZone\">\n    <div class=\"chatZone\">\n      <div class=\"textZoneContainer\">\n        <div data-id=\"flowZone\" class=\"textZone\"><!-- Here come new text --></div>\n      </div>\n      <div class=\"inputArea\">\n        <input type=\"text\" placeholder=\"Type a message\" data-id=\"inputZone\">\n        <input type=\"submit\" value=\"Send\" style=\"display:none\"/>\n      </div>\n    </div>\n  </form>\n</div>\n"

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(13)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isArray = __webpack_require__(0);
var load = __webpack_require__(2);
var DOM = __webpack_require__(1);

var expose = {};
var options;

/**
 * DOM / HTMl elements
 */
var replyTemplate;
var inputZone;
var flowZone;
var chatZone;

/**
 * Data
 */
var conversationalJson;
var discussionHistory;
var useranswers;

/**
 * Ajax
 */
var isAjaxLoading;
var onAjaxStopCallbacks;

/**
 * Conversation flow
 */
var isInitialized;
var currentConversationBloc;
var currentConversationStep;

/**
 * Animation
 */
var thinkingTimerId;
var typingTimerId;
var needScrollAtBottomBeforeAppending;

var lastUserInput;
var optionGroupOffset;

/**
 * Custom Code param
 */
var customFunctionList;

function init() {

  options = {
    isLogEnabled: true, /* By default, we enable debugging to console  */
    isPersistHistory: false, /* By default, we don't persist  */
    typingSpeed: 20, /* Number of character typed per second */
    readingSpeed: 50, /* Number of character read per second by the Bot */
    botface: "data:image/png;base64,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"
  };

  DOM.init(window.document.body);

  replyTemplate = $('<div class="message" data-id="messageBloc"><table cellpadding="0" cellspacing="0" border="0"><tr><td><div class="portrait"></div></td><td><div class="sentence" data-id="sentenceZone"><div data-id="phraseZone"></div><div class="interphrase"></div></div></td></tr></table></div>');
  inputZone = $('[data-id="inputZone"]');
  flowZone = $('[data-id="flowZone"]');
  chatZone = $('[data-id="chatZone"]');

  conversationalJson = null;
  discussionHistory = [];
  useranswers = {};

  isAjaxLoading = false;
  onAjaxStopCallbacks = [];
  customFunctionList = {};

  isInitialized = false;
  currentConversationBloc = null;
  currentConversationStep = null;
  lastUserInput = null;
  optionGroupOffset = 0;

  needScrollAtBottomBeforeAppending = true;

  chatZone.on("submit", onUserInput);

  inputZone.focus();
  chatZone.on("mouseover", function () {
    inputZone.focus();
  });
}

function setOptions(optionList) {
  if (optionList) {
    try {
      for (var key in optionList) {
        if (optionList.hasOwnProperty(key)) {
          options[key] = optionList[key];
        }
      }
      expose.options = options;
    } catch (ex) {
      log("ERROR : Unable to set options. Reason : ", ex.message);
    }
  }

  return this;
}

function generateHtml() {
  // HTML chat Container
  $("body").append('<div id="chatContainer" style="display:none" class="close"> \
      <form data-id="chatZone"> \
        <div class="chatZone">  \
            <div class="textZoneContainer"> \
                <div data-id="flowZone" class="textZone"><!-- Here come new text --></div> \
            </div>  \
            <div class="inputArea"> \
                <input type="text" placeholder="Type a message" data-id="inputZone">  \
                <input type="submit" value="Send" style="display:none"/>  \
            </div>  \
          </div>  \
       </form> \
    </div>');
}

function loadingStop() {
  onAjaxStopCallbacks.forEach(function (callbackFunction) {
    callbackFunction();
  });

  onAjaxStopCallbacks = [];
}

function start(blocName) {

  if (options.isPersistHistory && !options.isHistoryLoaded) {
    if ("Cookies" in window) {
      discussionHistory = Cookies.getJSON("history");
      if (discussionHistory == null) {
        discussionHistory = [];
      }
      printDiscussionHistory();
      useranswers = Cookies.getJSON("answers");
      if (useranswers == null) {
        useranswers = {};
      }
      expose.answers = useranswers;
      options.isHistoryLoaded = true;
    } else {
      log("ERROR : Unable the set isPersistHistory to true. Reason : you need to include the cookie management library", "https://github.com/js-cookie/js-cookie ");
      options.isPersistHistory = false;
    }
  }

  if (!isInitialized) {
    // We need to wait until the data has been loaded
    onAjaxStopCallbacks.push(function () {
      start(blocName);
    });
    return;
  } else {
    //We can display the chat window
    $("#chatContainer").show().removeClass('close').addClass('open');
  }

  if (conversationalJson != null) {
    if (discussionHistory.length == 0) {
      //No history, we start from the beginning
      gotoBloc(blocName);
    } else {
      //TODO We need to decide what to do with history
      // Need to start from the last Step find in the history
    }
  } else {
    throw "Please load a valid Markdown or JSON before calling .start(...)";
  }
}

/**
 * Move the sequence to the Next Step
 * @param nextStep Specify the Step we want to go (Optional) If not provided, it find it automatically
 *
 */
function gotoNextStep(nextStep) {
  if (nextStep != null) {
    currentConversationStep = nextStep;
  } else {
    // No step provided so we seek for the next step
    currentConversationStep = findNextStep(currentConversationBloc, currentConversationStep);
  }

  computeStep(currentConversationStep);
}

function computeStep(step) {
  if (step != null) {
    switch (step["type"]) {
      case "sentence":
        computeSentence(step);
        break;
      case "pause":
        computePause(step);
        break;
      case "input":
        computeInput(step);
        break;
      case "optionGroup":
        computeOptionGroup(step);
        break;
      case "goto":
        // We need to jump to a different
        computeGoto(step);
        break;
      case "function":
        //We need to execute a certain function
        computeCustomFunction(step);
    }
  }
}

/**
 * SENTENCE STEP Methods
 *
 */
function computeSentence(step) {
  var variance = 0.20; // (+/- 20%) for the duration of animations

  // We must animate the writing phase
  // We consider X characters per second
  var textPhraseToWrite = getSentenceFromText(step["text"]);
  var textLengthToWrite = $("<div/>").append(textPhraseToWrite).text().length;
  var typingDuration = textLengthToWrite / (options.typingSpeed + (Math.random() * 2 * variance - variance));

  // We must animate the thinking phase
  var reactionDuration = 0; // time to move hands on the keyboard
  // by default we take the time to think about what we need to write
  var thinkingDuration = 0;
  // but if the previous sentence is from the user, we need to simulate the reading process
  var lastSentence = discussionHistory.length > 0 ? discussionHistory[discussionHistory.length - 1] : {};
  if (lastSentence["from"] == "User") {
    var textPhraseToRead = lastSentence["sentence"];
    var textLengthToRead = $("<div/>").append(textPhraseToRead).text().length;
    // we think as fast as we read
    reactionDuration = 1.0;
    thinkingDuration = textLengthToRead / (options.readingSpeed + (Math.random() * 2 * variance - variance));
  } else {
    //The Bot was just typing, so there is no delay to put his hand on the keyboard
    thinkingDuration = textLengthToWrite / options.readingSpeed; // we think as fast as we read
  }

  thinkingDuration += reactionDuration;

  log("====Sentence===== ");
  log("text : ", textPhraseToWrite);
  log("textlength : ", textLengthToWrite);
  log("thinking duration : ", thinkingDuration);
  log("typing duration : ", typingDuration);

  // We put a little lag before writing
  thinkingTimerId = window.setTimeout(function () {
    thinkingTimerId = null;
    // like if the person was thinking
    startTypingEffect();
    typingTimerId = window.setTimeout(function () {
      typingTimerId = null;
      printSentence(textPhraseToWrite, "Bot");
      gotoNextStep();
    }, typingDuration * 1000);
  }, thinkingDuration * 1000);
}

function getSentenceFromText(text) {
  if (!text) return "";

  // We parse some potential dynamic value
  var regexp = new RegExp(/(\[\w{2,}\])+/, "gi");
  var result = text.replace(regexp, function (match, offset, string) {
    var valueList = getValueListFromText(match);
    var selectedIndex = Math.floor(Math.random() * valueList.length);
    return valueList[selectedIndex];
  });

  var textArray = result.split("|");
  var selectedIndex = Math.floor(Math.random() * textArray.length);

  return $.trim(textArray[selectedIndex]);
}

function getValueListFromText(text) {
  var result = [];

  var node = findFirstLevelNodeWithName("value_bloc", text);
  if (node) {
    var values = node["values"];
    if (isArray(values)) {
      result = values;
    }
  }

  return result;
}

function startTypingEffect() {
  needScrollAtBottomBeforeAppending = isScrollBarAtBottom();

  // typing effect by default
  var messageElement = replyTemplate.clone().addClass("typing").addClass("fromBot");

  var urlString = "url('" + options.botface + "')";
  messageElement.find(".portrait").css("background-image", urlString);

  messageElement.find('[data-id="phraseZone"]').html("&nbsp");
  flowZone.append(messageElement);
  updateScroll();
}

function printSentence(htmlText, fromWho, isFromHistory) {

  // We can merge multiple sentence
  // if the last child sentence is of the same type
  var lastMessage = flowZone.find('[data-id="messageBloc"]:not(.typing)').last();
  var lastSentence = lastMessage.find('[data-id="sentenceZone"]').last();
  var isSameSpeaker = false;
  var isSaveToHistory = true;

  if (isFromHistory) isSaveToHistory = false;

  var messageElement;
  switch (fromWho) {
    case "Bot":

      // BOT Sentence
      needScrollAtBottomBeforeAppending = isScrollBarAtBottom();
      if (lastMessage.hasClass("fromBot")) {
        isSameSpeaker = true;
        // We don't need the typing area anymore
        flowZone.find(".typing").remove();
      } else {
        // last message was from User
        messageElement = flowZone.find(".typing").removeClass("typing");
        if (messageElement.length == 0) {
          messageElement = replyTemplate.clone().addClass("fromBot");
          flowZone.append(messageElement);
        }
      }
      break;
    case "User":
      // USER sentence
      needScrollAtBottomBeforeAppending = true; // We Always scroll down when it's from the user
      if (lastMessage.hasClass("fromUser")) {
        isSameSpeaker = true;
      } else {
        //last message was from Bot
        messageElement = replyTemplate.clone().addClass("fromUser");

        //If we have a typing element, we insert before
        if (flowZone.find(".typing").length > 0) {
          flowZone.find(".typing").before(messageElement);
        } else {
          flowZone.append(messageElement);
        }
      }
      break;
    case "System":
      isSaveToHistory = false;
      //It's a system line (like a date separator)
      needScrollAtBottomBeforeAppending = isScrollBarAtBottom();
      messageElement = $('<div class="separator fromSystem" data-id="messageBloc"><div data-id="phraseZone"></div></div>');
      log(messageElement);
      flowZone.append(messageElement);

      break;

    default:
      return;
  }

  if (isSameSpeaker) {
    // Instead of creating a new message bloc, we insert the message in the last existing bloc
    messageElement = lastSentence.clone().insertAfter(lastSentence);
  } else {
    if (isFromHistory) {
      messageElement.addClass("fromHistory");
    }
  }

  if (isSaveToHistory) saveSentenceToHistory(htmlText, fromWho);

  if (messageElement != null) {
    //We add the text in the sentenceZone
    messageElement.find('[data-id="phraseZone"]').html(htmlText);
  }

  updateScroll();
}

/**
 * PAUSE STEP Methods
 *
 */

function computePause(step) {
  var duration = step["millisecond"] * 1;

  log("====Pause===== ");
  log("Delai : ", duration);

  typingTimerId = window.setTimeout(function () {
    gotoNextStep();
  }, duration);
}

/**
 * INPUT STEP Methods
 *
 */

function computeInput(step) {
  log("====Input===== ");
  log("wait for input... ");
}

function onUserInput(event) {
  event.preventDefault();

  var userInput = $.trim(inputZone.val());
  if (userInput.length == 0) return;

  lastUserInput = userInput;
  inputZone.val(''); //Clear the input
  log("Value :", lastUserInput);
  printSentence(lastUserInput, "User");

  if (currentConversationStep != null && currentConversationStep["type"] == "input") {
    var dataName = currentConversationStep["data"];
    if (dataName) {
      useranswers[dataName] = lastUserInput;
      expose.answers = useranswers;
      if (options.isPersistHistory) Cookies.set("answers", useranswers);
    }

    gotoNextStep();
  }
}

/**
 *   GOTO STEP Methods
 */
function computeGoto(step) {
  var blocName = step["value"];
  if (blocName != null) gotoBloc(blocName);
}

function gotoBloc(blocName) {
  currentConversationBloc = findFirstLevelNodeWithName("dialog_bloc", blocName);
  currentConversationStep = null;
  gotoNextStep();
}

/**
 *   FUNCTION STEP Methods
 */
function computeCustomFunction(step) {
  var funcName = step["name"];
  // We call the custom function
  customFunctionList[funcName]();
}

function addFunction(name, func) {
  customFunctionList[name] = func;
  return this;
}

function nextFromFunction(customFunctionOutput) {

  if (currentConversationStep != null) {
    if (currentConversationStep["type"] == "function") {
      var nextStep = findNextStep(currentConversationBloc, currentConversationStep);
      if (nextStep != null) {
        switch (nextStep["type"]) {
          case "optionGroup":
            nextStep = getStepFromOptionGroup(nextStep, customFunctionOutput);
            break;
        }
      }
      gotoNextStep(nextStep);
    } else if (currentConversationStep["type"] == "optionGroup") {
      //The function was called from an optiongroup
      if (customFunctionOutput) {
        //if the output is TRUE we take the first step of this option
        var options = currentConversationStep["options"];
        var option = options[optionGroupOffset];
        var step = getFirstOptionStep(option);
        gotoNextStep(step);
      } else {
        // if the output is false, we move on to the next option
        optionGroupOffset = optionGroupOffset + 1;
        computeOptionGroup(currentConversationStep);
      }
    }
  }
}

/**
 * OPTIONGROUP STEP Methods
 *
 */
function computeOptionGroup(step) {
  log("====OptionGroup===== ");
  log("Choose an Option with last user input : ", lastUserInput);
  var nextStep = getStepFromOptionGroup(step, lastUserInput);
  if (nextStep != step) gotoNextStep(nextStep); // We go to next step only if it's a different step ( used for dynamic function callback)
}

function getStepFromOptionGroup(optionGroup, inputString) {

  var options = optionGroup["options"];
  var foundOption = null;
  var step = null;
  if (isArray(options)) {
    for (var i = optionGroupOffset; i < options.length && foundOption == null; i++) {
      // For each option we take the value
      var option = options[i];
      var optionType = option["type"];
      var optionValue = option["value"];
      if (optionType == "function") {
        optionGroupOffset = i;
        computeCustomFunction(option);
        return optionGroup; //we need to wait the callback from the function so we return the current step
      } else if (isSelectedOptionValue(optionValue, inputString)) {
        foundOption = option;
      }
    }
  }

  if (foundOption == null) {
    //No valid option : We take the last options if it's a "other" option
    if (isArray(options) && options.length > 0) {
      var otherOption = options[options.length - 1];
      var otherOptionValue = otherOption["value"];
      if (otherOptionValue && otherOptionValue.toLowerCase() == "other") {
        foundOption = otherOption;
      }
    }
  }

  // We take the first step of the founded option
  if (foundOption != null) {
    step = getFirstOptionStep(foundOption);
  } else {

    //If the previous step is an input step, we go back to that step until we have the right answer
    var previousStep = findPreviousStep(currentConversationBloc, optionGroup);
    if (previousStep && previousStep["type"] == "input") {
      step = previousStep; // We go one step back
    }
  }

  optionGroupOffset = 0;
  return step;
}
function getFirstOptionStep(option) {
  var step = null;
  var steps = option["steps"];
  if (isArray(steps) && steps.length > 0) {
    step = steps[0];
  }
  return step;
}

function isSelectedOptionValue(value, inputString) {
  if (!value) return null;

  value = $.trim(value);

  // We parse some potential dynamic value
  var regexp = new RegExp(/(\[\w{2,}\])+/, "gi");
  value = value.replace(regexp, function (match, offset, string) {
    //We have the list of values, we simplify them
    var valueList = getValueListFromText(match);
    for (var i = 0; i < valueList.length; i++) {
      var rawValue = simplifyString(valueList[i]);
      valueList[i] = rawValue.replace(new RegExp(/\s/, "gi"), '\\s?');
    }
    return valueList.join('|');
  });

  // we add word boundary \b to detection so we take only full word and not part of word.
  value = "\\b(" + value + ")\\b";

  inputString = simplifyString(inputString);

  var regexp = new RegExp(value, "gi");
  if (inputString.match(regexp) != null) return true;else return false;
}

function simplifyString(inputString) {
  var out = inputString;
  if (out != null) {
    out = removeSpecialCharacters(out.toLocaleLowerCase());
    out = $.trim(out);
  }

  return out;
}

/**
 * History Methods
 */

function printDiscussionHistory() {
  // We refresh the screen with the discussion history
  for (var i = 0; i < discussionHistory.length; i++) {
    var sentence = discussionHistory[i];
    if (i == 0) {
      var time = new Date(sentence.stamp);
      printSentence(time.toLocaleDateString(), "System");
    }

    printSentence(sentence["sentence"], sentence["from"], true);
  }
}

function saveSentenceToHistory(htmlText, fromWho) {
  // We save the sentence on the discussion history
  var newSentence = {
    "from": fromWho,
    "stamp": +new Date(),
    "sentence": htmlText
  };

  discussionHistory.push(newSentence);

  if (options.isPersistHistory) Cookies.set("history", discussionHistory);
}

/**
 *
 * Traversal Methods
 *
 */

/**
 * Get forst level node ot the traversal tree
 */
function findFirstLevelNodeWithName(type, name) {

  var root = conversationalJson;

  var blocFound = null;

  if (isArray(root)) {
    for (var i = 0; i < root.length; i++) {
      var elt = root[i];
      var eltType = elt["type"] ? elt["type"].toLowerCase() : "";
      if (eltType == type.toLowerCase()) {
        if (typeof name == 'undefined' || elt["name"] == name) {
          blocFound = elt;
          break;
        }
      }
    }
  }
  return blocFound;
}

function findNextStep(node, step) {
  var nextStep = null;
  if (node != null) {
    if (step == null) {
      // We take the first step of the currentbloc
      if (isArray(node["steps"]) && node["steps"].length > 0) {
        nextStep = currentConversationBloc["steps"][0];
      }
    } else {
      //We search the current step in each "steps" arrays
      if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          if (node[i] === step) {
            if (i + 1 < node.length) {
              nextStep = node[i + 1];
            } else {
              nextStep = -1;
            }
            break;
          } else {
            nextStep = findNextStep(node[i], step);
            if (nextStep != null) {
              if (nextStep == -1 && isArray(node["steps"])) {
                // We have found the step in a lower level
                if (i + 1 < node.length) nextStep = node[i + 1];
              }
              break;
            }
          }
        }
      } else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null) {
        for (var key in node) {
          if (node.hasOwnProperty(key)) {
            nextStep = findNextStep(node[key], step);
            if (nextStep != null) return nextStep;
          }
        }
      }
    }
  }
  return nextStep;
}

function findPreviousStep(node, step) {
  var previousStep = null;
  if (node != null) {
    if (step == null) {
      // We take the first step of the currentbloc
      if (isArray(node["steps"]) && node["steps"].length > 0) {
        previousStep = currentConversationBloc["steps"][0];
      }
    } else {
      //We search the current step in each "steps" arrays
      if (isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          if (node[i] === step) {
            if (i - 1 > 0) {
              previousStep = node[i - 1];
            } else {
              previousStep = -1;
            }
            break;
          } else {
            previousStep = findPreviousStep(node[i], step);
            if (previousStep != null) {
              if (previousStep == -1 && isArray(node["steps"])) {
                // We have found the step in a lower level
                if (i - 1 > 0) previousStep = node[i - 1];
              }
              break;
            }
          }
        }
      } else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null) {
        for (var key in node) {
          if (node.hasOwnProperty(key)) {
            previousStep = findPreviousStep(node[key], step);
            if (previousStep != null) return previousStep;
          }
        }
      }
    }
  }
  return previousStep;
}

/**
 *
 * Scrolling Methods
 *
 */

function updateScroll() {
  window.setTimeout(function () {
    if (needScrollAtBottomBeforeAppending) {
      //Yes, so we scroll to bottom
      flowZone.each(function () {

        this.scrollTop = this.scrollHeight;
      });
    }
  }, 1);
}

function isScrollBarAtBottom() {
  var isBottom = false;
  flowZone.each(function () {
    isBottom = this.scrollHeight - this.clientHeight <= this.scrollTop + 1;
  });
  return isBottom;
}

function removeSpecialCharacters(str) {
  var defaultDiacriticsRemovalMap = [
  /*  this is for uppercase letter, which we don't have here
  {"base":"A", "letters":/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
  {"base":"AA","letters":/[\uA732]/g},
  {"base":"AE","letters":/[\u00C6\u01FC\u01E2]/g},
  {"base":"AO","letters":/[\uA734]/g},
  {"base":"AU","letters":/[\uA736]/g},
  {"base":"AV","letters":/[\uA738\uA73A]/g},
  {"base":"AY","letters":/[\uA73C]/g},
  {"base":"B", "letters":/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
  {"base":"C", "letters":/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
  {"base":"D", "letters":/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
  {"base":"DZ","letters":/[\u01F1\u01C4]/g},
  {"base":"Dz","letters":/[\u01F2\u01C5]/g},
  {"base":"E", "letters":/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
  {"base":"F", "letters":/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
  {"base":"G", "letters":/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
  {"base":"H", "letters":/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
  {"base":"I", "letters":/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
  {"base":"J", "letters":/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
  {"base":"K", "letters":/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
  {"base":"L", "letters":/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
  {"base":"LJ","letters":/[\u01C7]/g},
  {"base":"Lj","letters":/[\u01C8]/g},
  {"base":"M", "letters":/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
  {"base":"N", "letters":/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
  {"base":"NJ","letters":/[\u01CA]/g},
  {"base":"Nj","letters":/[\u01CB]/g},
  {"base":"O", "letters":/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
  {"base":"OI","letters":/[\u01A2]/g},
  {"base":"OO","letters":/[\uA74E]/g},
  {"base":"OU","letters":/[\u0222]/g},
  {"base":"P", "letters":/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
  {"base":"Q", "letters":/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
  {"base":"R", "letters":/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
  {"base":"S", "letters":/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
  {"base":"T", "letters":/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
  {"base":"TZ","letters":/[\uA728]/g},
  {"base":"U", "letters":/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
  {"base":"V", "letters":/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
  {"base":"VY","letters":/[\uA760]/g},
  {"base":"W", "letters":/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
  {"base":"X", "letters":/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
  {"base":"Y", "letters":/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
  {"base":"Z", "letters":/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
                              */
  { "base": "a", "letters": /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { "base": "aa", "letters": /[\uA733]/g }, { "base": "ae", "letters": /[\u00E6\u01FD\u01E3]/g }, { "base": "ao", "letters": /[\uA735]/g }, { "base": "au", "letters": /[\uA737]/g }, { "base": "av", "letters": /[\uA739\uA73B]/g }, { "base": "ay", "letters": /[\uA73D]/g }, { "base": "b", "letters": /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { "base": "c", "letters": /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { "base": "d", "letters": /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { "base": "dz", "letters": /[\u01F3\u01C6]/g }, { "base": "e", "letters": /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { "base": "f", "letters": /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { "base": "g", "letters": /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { "base": "h", "letters": /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { "base": "hv", "letters": /[\u0195]/g }, { "base": "i", "letters": /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { "base": "j", "letters": /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { "base": "k", "letters": /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { "base": "l", "letters": /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { "base": "lj", "letters": /[\u01C9]/g }, { "base": "m", "letters": /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { "base": "n", "letters": /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { "base": "nj", "letters": /[\u01CC]/g }, { "base": "o", "letters": /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { "base": "oi", "letters": /[\u01A3]/g }, { "base": "ou", "letters": /[\u0223]/g }, { "base": "oo", "letters": /[\uA74F]/g }, { "base": "p", "letters": /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { "base": "q", "letters": /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { "base": "r", "letters": /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { "base": "s", "letters": /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { "base": "t", "letters": /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { "base": "tz", "letters": /[\uA729]/g }, { "base": "u", "letters": /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { "base": "v", "letters": /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { "base": "vy", "letters": /[\uA761]/g }, { "base": "w", "letters": /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { "base": "x", "letters": /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { "base": "y", "letters": /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { "base": "z", "letters": /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }, { "base": " ", "letters": /[\u002D\u005F\u002E\u003F\u0021\u002C\u0027]/g }, { "base": "", "letters": /[\u0028\u0029\u003A\u003B\u005B\u005C\u005D\u00EE]/g }];

  for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
  }

  return str;
}

function log(message, value) {
  if (options.isLogEnabled && console) {
    if (value) console.log(message, value);else console.log(message);
  }
}

function getConversationAsJson() {
  if (conversationalJson) return JSON.stringify(conversationalJson);
}

expose.loadJSON = expose.loadMD = function (url) {
  load(url).then(function (data) {
    isInitialized = true;
    conversationalJson = data;
    loadingStop();
  });
  return this;
};
expose.setOptions = setOptions;
expose.start = start;
expose.addFunction = addFunction;
expose.next = nextFromFunction;
expose.getConversationAsJson = getConversationAsJson;

expose.answers = {};
expose.options = {};

init();

module.exports = expose;

/***/ })
/******/ ]);
});