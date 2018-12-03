var Tele2 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Configuration
 */

var secure = window.location.protocol === 'https:';

module.exports = {
    name: 'likely',
    prefix: 'likely__',
    secure: secure,
    protocol: secure ? 'https:' : 'http:',
    storageKey: 'likelyServices',
    breakpoint: 680
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

var div = document.createElement('div'),
    gid = 0;

var dom = module.exports = {
    /**
     * Wrap SVG coords from data object into SVG tag
     *
     * @param {String} coords
     */
    wrapSVG: function (coords) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" ' + 'viewBox="0 0 16 16"><path d="M' + coords + 'z"/></svg>';
    },

    /**
     * Create node from HTML
     *
     * @param {String} html
     */
    createNode: function (html) {
        div.innerHTML = html;

        return div.children[0];
    },

    /**
     * Load script
     *
     * @param {String} url
     */
    getScript: function (url) {
        var script = document.createElement('script'),
            head   = document.head;

        script.type = 'text/javascript';
        script.src  = url;

        head.appendChild(script);
        head.removeChild(script);
    },

    /**
     * Get JSON
     *
     * @param {String} url
     * @param {Function} callback
     */
    getJSON: function (url, callback) {
        var name = encodeURIComponent('random_fun_' + (++gid));

        url = url.replace(
            /callback=(\?)/,
            'callback=' + name
        );

        window[name] = callback;

        dom.getScript(url);
    },

    /**
     * Find first node by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {Node}
     */
    find: function (selector, node) {
        return (node || document).querySelector(selector);
    },

    /**
     * Find all nodes by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {NodeList}
     */
    findAll: function (selector, node) {
        return (node || document).querySelectorAll(selector);
    },

    /**
     * Check mobile media query
     */
    isMobile: function() {
        return !window.matchMedia('(min-width: ' + config.breakpoint + 'px)').matches;
    },

    /**
     * Open the popup
     *
     * @param {String} url
     * @param {String} winId
     * @param {Number} width,
     * @param {Number} height
     */
    openPopup: function (url, winId, width, height) {
        var left = Math.round(screen.width / 2 - width / 2),
            top  = 0;

        if (screen.height > height) {
            top = Math.round(screen.height / 3 - height / 2);
        }

        var options = 'left='    + left +
                      ',top='    + top +
                      ',width='  + width +
                      ',height=' + height +
                      ',personalbar=0,toolbar=0,scrollbars=1,resizable=1';

        var win = window.open(url, winId, options);

        // if (!win) {
        //     location.href = url;
        //     return location.href;
        // }

        // win.focus();

        return win;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var bool = {yes: true, no: false},
    rUrl = /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/gi;

/**
 * @internal
 */
var utils = {
    /**
     * Simple $.each, only for objects
     *
     * @param {Object} object
     * @param {Function} callback
     */
    each: function (object, callback) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                callback(object[key], key);
            }
        }
    },

    /**
     * Convert array-like object to array
     *
     * @param {Object} arrayLike
     * @return {Array}
     */
    toArray: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    },

    /**
     * Merge given dictionaries (objects) into one object
     *
     * @param {Object} ...objects
     * @return {Object}
     */
    merge: function () {
        var result = {};

        for (var i = 0; i < arguments.length; i ++) {
            var arg = arguments[i];

            if (arg) {
                for (var key in arg) {
                    result[key] = arg[key];
                }
            }
        }

        return result;
    },

    /**
     * Extend one (target) object by other (subject)
     *
     * @param {Object} target
     * @param {Object} subject
     */
    extend: function (target, subject) {
        for (var key in subject) {
            target[key] = subject[key];
        }
    },

    /**
     * Check new flexbox syntax support
     */
    flexboxSupport: function(element, name){
        var d = document, f = 'flex', fw = '-webkit-'+f, e = d.createElement('b'), c;

        try {
            e.style.display = fw;
            e.style.display = f;
            c = (e.style.display == f || e.style.display == fw) ? f : 'no-'+f;
        } catch(e) {
            c = 'no-'+f;
        }

        element.className += ' ' + name + '--' + c;
    },

    /**
     * Return node.dataset or plain object for IE 10without setters
     * based on https://gist.github.com/brettz9/4093766#file_html5_dataset.js
     *
     * @param {Node} node
     * @return {Object}
     */
    getDataset: function (node) {
        if (typeof node.dataset === 'object') {
            return node.dataset;
        }

        var i,
            dataset = {},
            attributes = node.attributes,
            attribute,
            attributeName;

        var toUpperCase = function (n0) {
            return n0.charAt(1).toUpperCase();
        };

        for (i = attributes.length - 1; i >= 0; i--) {
            attribute = attributes[i];
            if (attribute && attribute.name &&
                (/^data-\w[\w\-]*$/).test(attribute.name)) {
                    attributeName = attribute.name.substr(5).replace(/-./g, toUpperCase);
                    dataset[attributeName] = attribute.value;
                }
        }

        return dataset;
    },

    /**
     * Convert "yes" and "no" to true and false.
     *
     * @param {Node} node
     */
    bools: function (node) {
        var result = {},
            data   = utils.getDataset(node);

        for (var key in data) {
            var value = data[key];

            result[key] = bool[value] || value;
        }

        return result;
    },

    /**
     * Map object keys in string to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    template: function (text, data) {
        return !text ? '' : text.replace(/\{([^\}]+)\}/g, function (value, key) {
            return key in data ? data[key] : value;
        });
    },

    /**
     * Map object keys in URL to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    makeUrl: function (text, data) {
        for (var key in data) {
            data[key] = encodeURIComponent(data[key]);
        }

        return utils.template(text, data);
    },

    /**
     * Create query string out of data
     *
     * @param {Object} data
     * @return {String}
     */
    query: function (data) {
        var filter = encodeURIComponent,
            query  = [];

        for (var key in data) {
            if (typeof data[key] === 'object') continue;

            query.push(filter(key) + '=' + filter(data[key]));
        }

        return query.join('&');
    },

    /**
     * Set value in object using dot-notation
     *
     * @param {Object} object
     * @param {String} key
     * @param {Object} value
     */
    set: function (object, key, value) {
        var frags = key.split('.'),
            last  = null;

        frags.forEach(function (key, index) {
            if (typeof object[key] === 'undefined') {
                object[key] = {};
            }

            if (index !== frags.length - 1) {
                object = object[key];
            }

            last = key;
        });

        object[last] = value;
    }
};

module.exports = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendPageView = exports.sendEvent = undefined;

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSOLE_STYLE = 'color: #E87E04';

/**
 * Send analytics events via GTM
 * @param {String} label - event label
 * @param {String} action - event action ("Click" by default)
 */
var sendEvent = exports.sendEvent = function sendEvent(label) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Click';

    var value = _config2.default.analyticsCategory + ' \u2014 ' + label + ' \u2014 ' + action;

    if (false) {}

    if (window.dataLayer !== undefined && _config2.default.analyticsCategory) {
        window.dataLayer.push({
            event: 'data_event',
            data_description: value
        });
    }
};

/**
 * Send pageview event via GTM
 */
var sendPageView = exports.sendPageView = function sendPageView() {
    if (false) {}

    if (window.dataLayer !== undefined) {
        window.dataLayer.push({
            event: 'Page — View',
            post_details: {},
            section: 'special',
            tags: [],
            title: document.title,
            url: window.location.pathname
        });
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Make html element
 * @param {String} tagName
 * @param {Array|String} classNames - array of classnames or string for single classname
 * @param {Object} attributes - object with html attributes
 */
var makeElement = exports.makeElement = function makeElement(tagName) {
    var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    tagName = tagName.toLowerCase();

    var element = document.createElement(tagName);

    if (classNames) {
        if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) === 'object') {
            classNames.forEach(function (cname) {
                element.classList.add(cname);
            });
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }
    }

    for (var attr in attributes) {
        if (attr === 'data') {
            var dataAttributes = attributes[attr];

            for (var _attr in dataAttributes) {
                element.dataset[_attr] = dataAttributes[_attr];
            }
        } else {
            element[attr] = attributes[attr];
        }
    }

    return element;
};

/**
 * Cache elements with [data-view] attribute and put them in given object
 * @param {Object} obj - object
 */
var cacheElements = exports.cacheElements = function cacheElements(obj) {
    var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'view';

    var newObj = {},
        elements = document.querySelectorAll('[data-' + attr + ']');

    Array.prototype.forEach.call(elements, function (el) {
        var name = el.dataset[attr];
        newObj[name] = el;
    });

    Object.assign(obj, newObj);
};

/**
 * Get all siblings of specified element, excluding this element
 * @param {Element} element
 */
var getSiblings = exports.getSiblings = function getSiblings(element) {
    var siblings = [],
        sibling = element.parentNode.firstChild;

    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType !== 1 || sibling === element) continue;
        siblings.push(sibling);
    }

    return siblings;
};

/**
 * Remove all children from element
 * @param {Element} parent
 */
var removeChildren = exports.removeChildren = function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

/**
 * Remove specified element from its parent
 * @param {Element} element
 */
var removeElement = exports.removeElement = function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
};

/**
 * Transform html string to node
 * @param {String} html
 */
var htmlStringToNode = exports.htmlStringToNode = function htmlStringToNode(html) {
    var el = document.createElement('div');

    el.innerHTML = html;

    return el.firstChild;
};

/**
 * Prepend source element before first child of target element
 * @param {Element} parent
 * @param {Element} el
 */
var prepend = exports.prepend = function prepend(parent, el) {
    parent.insertBefore(el, parent.firstChild);
};

/** Quick check if element is in DOM */
var isElementInDom = exports.isElementInDom = function isElementInDom(el) {
    return el.parentNode;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Social network services
 */

var Service = __webpack_require__(17),
    utils   = __webpack_require__(2),
    svg     = __webpack_require__(18);

var services = {
    odnoklassniki: __webpack_require__(19),
    vkontakte:     __webpack_require__(20),
    facebook:      __webpack_require__(21),
    twitter:       __webpack_require__(22),
    gplus:         __webpack_require__(23),
    pocket:        __webpack_require__(24),
    telegram:      __webpack_require__(25),
    whatsapp:      __webpack_require__(26),
    viber:         __webpack_require__(27),
    email:         __webpack_require__(28),
    more:          __webpack_require__(29)
};

utils.each(services, function (service, key) {
    Service(service);

    service.svgi = svg[key];
    service.name = key;
});

module.exports = services;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'Tele2', // уникальное имя спецпроекта. Оно же — название главного класса. Используется на странице, куда интегрируется спецпроект
  analyticsCategory: 'Tele2',
  sendPageView: false, // отключаем, если спецпроект не на отдельной странице
  listenedEvents: ['click'] // слушаем события (click, input, change, etc.). Обычно нужен только click
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var isAvailable = function() {

    try {
        window.localStorage.setItem('isStorageAvailable', 1);
        window.localStorage.removeItem('isStorageAvailable');
        return true;
    } catch (e) {
        return false;
    }

};

var storage = {

    /**
     * Get item from localStorage
     * @param {String} key
     */
    getItem: function(key){

        if (isAvailable()) {

            var item = window.localStorage.getItem(key);

            try {
                JSON.parse(item);
            } catch (e) {
                return item;
            }

            return JSON.parse(item);

        }

    },

    /**
     * Save item in localStorage
     * @param {String} key
     * @param {String} value
     */
    setItem: function(key, value) {

        value = (typeof value === 'string') ? value : JSON.stringify(value);

        if (isAvailable()) {
            window.localStorage.setItem(key, value);
        }

    },

    /**
     * Remove item from localStorage
     * @param {String} key
     */
    removeItem: function(key) {

        if (isAvailable()) {
            window.localStorage.removeItem(key);
        }

    }

};

module.exports = storage;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _special = __webpack_require__(9);

var _special2 = _interopRequireDefault(_special);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.Special = _special2.default; // Тут используется CommonJS модуль, чтобы можно было использовать название класса как глобальную переменную
/**
 * Entry point
 */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(10);

var _base = __webpack_require__(11);

var _base2 = _interopRequireDefault(_base);

var _dom = __webpack_require__(4);

var _slider = __webpack_require__(12);

var _slider2 = _interopRequireDefault(_slider);

var _share = __webpack_require__(13);

var Share = _interopRequireWildcard(_share);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

var _svg = __webpack_require__(32);

var _svg2 = _interopRequireDefault(_svg);

var _data = __webpack_require__(33);

var _data2 = _interopRequireDefault(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSS = {
  main: 'tele2'
};

var EL = {};

var Special = function (_BaseSpecial) {
  _inherits(Special, _BaseSpecial);

  function Special() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Special);

    var _this = _possibleConstructorReturn(this, (Special.__proto__ || Object.getPrototypeOf(Special)).call(this));

    Object.assign(_this.params, params);
    _this.saveParams();

    if (_data2.default && params.data) {
      Object.assign(_data2.default, params.data);
    }

    _this.answer = _this.answer.bind(_this);

    if (_this.params.css) {
      _this.loadStyles(_this.params.css).then(function () {
        return _this.init();
      });
    } else {
      _this.init();
    }
    return _this;
  }

  _createClass(Special, [{
    key: 'start',
    value: function start() {
      Analytics.sendEvent('Start');

      this.main.removeChild(this.enter);
      this.main.appendChild(EL.test);

      this.slider = new _slider2.default({
        container: EL.tSliderWrap
      });

      this.makeNextQuestion();
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.setInitialParams();

      this.main.classList.remove('is-result');
      this.main.removeChild(EL.result);
      this.main.appendChild(EL.test);

      this.slider.reset();
      EL.tBtn.classList.remove('is-filled');
      EL.tBtn.textContent = 'Скачать';
      EL.tBtn.dataset.click = 'download';
      this.makeNextQuestion();
    }
  }, {
    key: 'continue',
    value: function _continue() {
      this.activeIndex += 1;
      this.slider.reset();
      EL.tBtn.classList.remove('is-filled');
      EL.tBtn.textContent = 'Скачать';
      EL.tBtn.dataset.click = 'download';
      this.makeNextQuestion();
    }
  }, {
    key: 'result',
    value: function result() {
      var result = Special.getResult(this.traffic / _data2.default.questions.length);

      this.main.classList.add('is-result');
      this.main.removeChild(EL.test);
      this.main.appendChild(EL.result);

      EL.rImg.src = result.img;
      EL.rNotice.innerHTML = '<div>\u0412\u0441\u0435 \u0444\u0430\u0439\u043B\u044B \u0442\u0435\u0441\u0442\u0430 \u0432\u0435\u0441\u0438\u043B\u0438 ' + this.filesSize + ' \u0433\u0438\u0433\u0430\u0431\u0430\u0439\u0442\u0430, \u0430 \u0432\u044B \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u043B\u0438 <span>' + this.traffic + '&nbsp;\u0433\u0438\u0433\u0430\u0431\u0430\u0439\u0442</span>.</div>';
      EL.rTitle.innerHTML = result.title;
      EL.rCaption.innerHTML = '\u0423\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u0441\u0451 \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0432 ' + this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + ' \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0439';

      (0, _dom.removeChildren)(EL.rShare);
      Share.make(EL.rShare, {
        url: this.params.share.url + this.correctAnswers,
        title: this.params.share.title,
        twitter: this.params.share.title
      });
    }
  }, {
    key: 'makeNextQuestion',
    value: function makeNextQuestion() {
      this.downloading = false;

      var q = _data2.default.questions[this.activeIndex];

      EL.tPages.textContent = this.activeIndex + 1 + '/' + _data2.default.questions.length;

      (0, _dom.removeChildren)(EL.tHead);
      EL.tHead.appendChild(EL.tImg);

      EL.tImg.classList.remove('is-enable');
      EL.tImg.innerHTML = q.img;
      EL.qText.textContent = q.text;
      EL.qTitle.textContent = q.title;
      EL.qNotice.textContent = q.notice;

      (0, _dom.removeChildren)(EL.tBody);
      EL.tBody.appendChild(EL.q);
    }
  }, {
    key: 'download',
    value: function download() {
      if (this.downloading) {
        return;
      }
      this.downloading = true;

      var q = _data2.default.questions[this.activeIndex];

      EL.tHead.removeChild(EL.tImg);
      EL.tHead.appendChild(EL.tSpinner);

      EL.tBtn.classList.add('is-disabled');

      this.slider.download(q.size, this.answer);
    }
  }, {
    key: 'answer',
    value: function answer(type, chosenSize) {
      var q = _data2.default.questions[this.activeIndex];

      EL.tHead.removeChild(EL.tSpinner);
      EL.tHead.appendChild(EL.tImg);

      setTimeout(function () {
        EL.tImg.classList.add('is-enable');
      }, 100);

      EL.aTitle.innerHTML = q.answer[type].title;
      EL.aText.innerHTML = q.answer[type].text;

      (0, _dom.removeChildren)(EL.tBody);
      EL.tBody.appendChild(EL.a);

      this.traffic += chosenSize;
      this.filesSize += q.size;
      if (type === 'correct' || type === 'more') {
        this.correctAnswers += 1;
      }

      EL.tBtn.classList.remove('is-disabled');
      EL.tBtn.classList.add('is-filled');
      if (this.activeIndex < _data2.default.questions.length - 1) {
        EL.tBtn.textContent = 'Далее';
        EL.tBtn.dataset.click = 'continue';
      } else {
        EL.tBtn.textContent = 'Результат';
        EL.tBtn.dataset.click = 'result';
      }
    }
  }, {
    key: 'setInitialParams',
    value: function setInitialParams() {
      this.activeIndex = 0;
      this.correctAnswers = 0;
      this.traffic = 0;
      this.filesSize = 0;
    }
  }, {
    key: 'init',
    value: function init() {
      this.setInitialParams();
      this.container.style.opacity = '1';
      this.main = this.container.querySelector('#tele2-special-main');
      this.enter = this.main.querySelector('#tele2-special-enter');
      this.enterImg = this.main.querySelector('#tele2-special-enter-img');

      this.enterImg.classList.add('is-enable');

      Special.createElements();
    }
  }], [{
    key: 'createElements',
    value: function createElements() {
      EL.test = (0, _dom.makeElement)('div', CSS.main + '-test');
      EL.tPages = (0, _dom.makeElement)('div', CSS.main + '-test__pages');
      EL.tInner = (0, _dom.makeElement)('div', CSS.main + '-test__inner');
      EL.tHead = (0, _dom.makeElement)('div', CSS.main + '-test__head');
      EL.tImg = (0, _dom.makeElement)('div', CSS.main + '-test__img');
      EL.tSpinner = (0, _dom.makeElement)('div', CSS.main + '-test__spinner', {
        innerHTML: _svg2.default.spinner
      });

      EL.tBody = (0, _dom.makeElement)('div', CSS.main + '-test__body');
      EL.q = (0, _dom.makeElement)('div', CSS.main + '-test__q');
      EL.qText = (0, _dom.makeElement)('div', CSS.main + '-test__q-text');
      EL.qTitle = (0, _dom.makeElement)('div', CSS.main + '-test__q-title');
      EL.qNotice = (0, _dom.makeElement)('div', CSS.main + '-test__q-notice');
      EL.a = (0, _dom.makeElement)('div', CSS.main + '-test__answer');
      EL.aTitle = (0, _dom.makeElement)('div', CSS.main + '-test__answer-title');
      EL.aText = (0, _dom.makeElement)('div', CSS.main + '-test__answer-text');

      EL.q.appendChild(EL.qText);
      EL.q.appendChild(EL.qTitle);
      EL.q.appendChild(EL.qNotice);

      EL.a.appendChild(EL.aTitle);
      EL.a.appendChild(EL.aText);

      EL.tBottom = (0, _dom.makeElement)('div', CSS.main + '-test__bottom');
      EL.tSliderWrap = (0, _dom.makeElement)('div', CSS.main + '-test__slider');
      EL.tBtnWrap = (0, _dom.makeElement)('div', CSS.main + '-test__btn');
      EL.tBtn = (0, _dom.makeElement)('button', CSS.main + '-btn', {
        textContent: 'Скачать',
        data: {
          click: 'download'
        }
      });

      EL.tBtnWrap.appendChild(EL.tBtn);

      EL.tBottom.appendChild(EL.tSliderWrap);
      EL.tBottom.appendChild(EL.tBtnWrap);

      EL.tInner.appendChild(EL.tHead);
      EL.tInner.appendChild(EL.tBody);
      EL.tInner.appendChild(EL.tBottom);

      EL.test.appendChild(EL.tPages);
      EL.test.appendChild(EL.tInner);

      EL.result = (0, _dom.makeElement)('div', CSS.main + '-result');
      EL.rNotice = (0, _dom.makeElement)('div', CSS.main + '-result__notice');
      EL.rHead = (0, _dom.makeElement)('div', CSS.main + '-result__head');
      EL.rHeadInner = (0, _dom.makeElement)('div', CSS.main + '-result__head-inner');
      EL.rBottom = (0, _dom.makeElement)('div', CSS.main + '-result__bottom');

      EL.rImg = (0, _dom.makeElement)('img', CSS.main + '-result__img');
      EL.rTitle = (0, _dom.makeElement)('div', CSS.main + '-result__title');
      EL.rCaption = (0, _dom.makeElement)('div', CSS.main + '-result__caption');
      EL.rShare = (0, _dom.makeElement)('div', CSS.main + '-result__share');
      EL.rRestart = (0, _dom.makeElement)('div', CSS.main + '-result__restart', {
        innerHTML: '<span>\u041F\u0440\u043E\u0439\u0442\u0438 \u0435\u0449\u0435 \u0440\u0430\u0437</span>' + _svg2.default.refresh,
        data: {
          click: 'restart'
        }
      });
      EL.rText = (0, _dom.makeElement)('div', CSS.main + '-result__text', {
        textContent: _data2.default.result.text
      });
      EL.rBtnWrap = (0, _dom.makeElement)('div', CSS.main + '-result__btn');
      EL.rBtn = (0, _dom.makeElement)('a', CSS.main + '-btn', {
        href: _data2.default.result.link,
        target: '_blank',
        textContent: 'Как это работает'
      });

      EL.rBtnWrap.appendChild(EL.rBtn);

      EL.rHeadInner.appendChild(EL.rTitle);
      EL.rHeadInner.appendChild(EL.rCaption);
      EL.rHeadInner.appendChild(EL.rShare);
      EL.rHeadInner.appendChild(EL.rRestart);

      EL.rHead.appendChild(EL.rImg);
      EL.rHead.appendChild(EL.rHeadInner);

      EL.rBottom.appendChild(EL.rText);
      EL.rBottom.appendChild(EL.rBtnWrap);

      EL.result.appendChild(EL.rNotice);
      EL.result.appendChild(EL.rHead);
      EL.result.appendChild(EL.rBottom);
    }
  }, {
    key: 'getResult',
    value: function getResult(score) {
      var result = '';
      _data2.default.results.some(function (item) {
        if (item.range[0] <= score && item.range[1] >= score) {
          result = item;
          return true;
        }
        return false;
      });

      return result;
    }
  }]);

  return Special;
}(_base2.default);

exports.default = Special;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base special constructor with common methods
 */
var BaseSpecial = function () {
  function BaseSpecial() {
    _classCallCheck(this, BaseSpecial);

    this.keyCodes = {
      enter: 13
    };
    this.params = {
      container: document.body
    };

    if (_config2.default.sendPageView) {
      Analytics.sendPageView();
    }
  }

  /**
     * Save custom params
     * @param {Object} params - params object with custom values
     */


  _createClass(BaseSpecial, [{
    key: 'saveParams',
    value: function saveParams() {
      Object.assign(this.params, _config2.default);
      this.container = this.params.container;

      this.addEventListeners();
    }

    /**
       * Load css file
       * @param {String} path
       */

  }, {
    key: 'loadStyles',
    value: function loadStyles(path) {
      return new Promise(function (resolve, reject) {
        var link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = path;

        link.onload = function () {
          return resolve();
        };
        link.onerror = function () {
          return reject();
        };

        document.body.appendChild(link);
      });
    }

    /**
       * Add event listeners to document
       */

  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      this.params.listenedEvents.forEach(function (eventName) {
        _this.container.addEventListener(eventName, function (event) {
          return _this.defaultEventHandler(event, eventName);
        });
      });
    }

    /**
       * Default events handler
       * @param {Object} event
       * @param {String} eventName
       */

  }, {
    key: 'defaultEventHandler',
    value: function defaultEventHandler(event, eventName) {
      var target = event.target;
      var action = void 0;

      while (target.parentNode && target !== event.currentTarget) {
        action = target.dataset[eventName];

        /** Send all links clicks to analytics */
        if (eventName === 'click' && target.tagName.toLowerCase() === 'a') {
          Analytics.sendEvent(target.href);
        }

        if (action) break;
        target = target.parentNode;
      }

      action = target.dataset[eventName];

      if (action && this[action]) {
        this[action](event.target, event);
      }
    }
  }]);

  return BaseSpecial;
}();

exports.default = BaseSpecial;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
  function Slider() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    this.props = _extends({
      container: document.body,
      clsPrefix: 't2slider',
      tooltipSuffix: ' Гб',
      min: 0,
      max: 10,
      value: 0,
      startValue: 0
    }, props);

    this.settings = {
      step: 100 / this.props.max,
      shift: 0
    };

    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);
    this.clickHandler = this.clickHandler.bind(this);

    this.init();
  }

  _createClass(Slider, [{
    key: 'start',
    value: function start(e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.touches) {
        e = e.touches[0];
      }

      var baseRect = this.el.base.getBoundingClientRect();

      this.settings.prevX = e.clientX;
      this.settings.minX = baseRect.x;
      this.settings.maxX = baseRect.x + this.el.base.offsetWidth;
      this.settings.betweenSteps = this.el.base.offsetWidth / this.settings.step;

      document.addEventListener('mousemove', this.move);
      document.addEventListener('touchmove', this.move);
      document.addEventListener('mouseup', this.stop);
      document.addEventListener('mouseleave', this.stop);
      document.addEventListener('touchend', this.stop);
      document.addEventListener('touchleave', this.stop);
      document.addEventListener('touchcancel', this.stop);
    }
  }, {
    key: 'move',
    value: function move(e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.touches) {
        e = e.touches[0];
      }

      this.settings.currentX = e.clientX;

      // if (this.settings.currentX < this.settings.minX
      //   || this.settings.currentX > this.settings.maxX) {
      //   return;
      // }

      if (this.settings.currentX < this.settings.minX) {
        this.settings.currentX = this.settings.minX;
      } else if (this.settings.currentX > this.settings.maxX) {
        this.settings.currentX = this.settings.maxX;
      }

      if (this.settings.currentX < this.settings.minX + this.settings.betweenSteps * this.props.value + this.settings.betweenSteps / 2 && this.settings.currentX > this.settings.minX + this.settings.betweenSteps * this.props.value - this.settings.betweenSteps / 2) {
        return;
      }

      var direction = null;
      if (this.settings.prevX - this.settings.currentX > 0) {
        direction = 'left';
      } else if (this.settings.prevX - this.settings.currentX < 0) {
        direction = 'right';
      } else {
        return;
      }

      var value = direction === 'left' ? this.props.value - 1 : this.props.value + 1;

      this.settings.prevX = this.settings.currentX;

      this.setPosition(value);
    }
  }, {
    key: 'stop',
    value: function stop(e) {
      document.removeEventListener('mousemove', this.move);
      document.removeEventListener('touchmove', this.move);
      document.removeEventListener('mouseup', this.stop);
      document.removeEventListener('mouseleave', this.stop);
      document.removeEventListener('touchend', this.stop);
      document.removeEventListener('touchleave', this.stop);
      document.removeEventListener('touchcancel', this.stop);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.touches) {
        e = e.touches[0];
      }

      var x = e.clientX;
      var rect = this.el.lines.getBoundingClientRect();
      var minX = rect.x;
      var step = this.el.base.offsetWidth / this.props.max;
      var prevPoint = minX;
      var currPoint = prevPoint;

      for (var i = 0; i < this.props.max; i++) {
        currPoint += step;

        if (Math.abs(prevPoint - x) < Math.abs(currPoint - x)) {
          this.setPosition(i);
          return;
        } else if (i === this.props.max - 1) {
          this.setPosition(this.props.max);
          return;
        }

        prevPoint = currPoint;
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.initEvents();
      this.el.handle.appendChild(this.el.handleTool);
      this.el.lineDiff1.style = '';

      this.el.lineDiff.classList.remove('is-less');
      this.el.lineDiff.classList.remove('is-more');
      this.el.lineDiff.style = '';

      this.el.handleTooltip.classList.remove('is-incorrect');

      this.el.originReal.style.transform = 'translate3d(0,0,0)';
      this.el.handleRealTooltip.textContent = '';

      this.setPosition(this.props.startValue);
    }
  }, {
    key: 'setPosition',
    value: function setPosition(value) {
      if (value === this.props.value) {
        return;
      }

      if (value < this.props.min) {
        this.props.value = this.props.min;
      } else if (value > this.props.max) {
        this.props.value = this.props.max;
      } else {
        this.props.value = value;
      }

      var shift = this.settings.step * value;
      if (shift < 0) {
        shift = 0;
      } else if (shift > 100) {
        shift = 100;
      }

      this.el.lineHope.style.width = this.props.value * this.settings.step + '%';

      this.el.origin.style.transform = 'translate3d(' + shift + '%,0,0)';
      this.el.handleTooltip.textContent = this.props.value + this.props.tooltipSuffix;
    }
  }, {
    key: 'download',
    value: function download(value, callback) {
      var _this = this;

      this.destroyEvents();
      this.el.handle.removeChild(this.el.handleTool);

      var type = 'correct';
      var start1 = 0;
      var end1 = value;
      var start2 = 0;
      var end2 = 0;
      var delay = 2000 * (value / this.props.max);

      if (this.props.value < value) {
        type = 'less';
        start2 = this.props.value;
        end2 = value - this.props.value;
        end1 -= end2;
        this.el.lineDiff.classList.add('is-less');
        this.el.lineDiff.style.left = start2 * this.settings.step + '%';
      } else if (this.props.value > value) {
        type = 'more';
        start2 = value;
        end2 = this.props.value - start2;
        this.el.lineDiff.classList.add('is-more');
        this.el.lineDiff.style.left = start2 * this.settings.step + '%';
      }

      var coeff = end1 / (end1 + end2);
      var dur1 = delay * coeff;
      var dur2 = delay - dur1;

      this.el.lineDiff1.style.transition = 'width ' + dur1 + 'ms linear';
      this.el.lineDiff1.style.width = end1 * this.settings.step + '%';

      this.el.lineDiff.style.transition = 'width ' + dur2 + 'ms ' + dur1 + 'ms linear';
      this.el.lineDiff.style.width = end2 * this.settings.step + '%';

      if (this.props.value !== value) {
        this.el.handleTooltip.classList.add('is-incorrect');

        this.el.originReal.style.transform = 'translate3d(' + value * this.settings.step + '%,0,0)';
        this.el.handleRealTooltip.textContent = value;
      }

      setTimeout(function () {
        callback(type, _this.props.value);
      }, delay);
    }
  }, {
    key: 'makeElements',
    value: function makeElements() {
      var _this2 = this;

      this.el = {};

      this.el.slider = (0, _dom.makeElement)('div', this.props.clsPrefix);
      this.el.base = (0, _dom.makeElement)('div', this.props.clsPrefix + '-base');

      this.el.lines = (0, _dom.makeElement)('div', this.props.clsPrefix + '-lines');

      this.el.lineHope = (0, _dom.makeElement)('div', [this.props.clsPrefix + '-line', this.props.clsPrefix + '-line--hope']);
      this.el.lineDiff1 = (0, _dom.makeElement)('div', [this.props.clsPrefix + '-line', this.props.clsPrefix + '-line--diff1']);
      this.el.lineDiff = (0, _dom.makeElement)('div', [this.props.clsPrefix + '-line', this.props.clsPrefix + '-line--diff']);

      this.el.origin = (0, _dom.makeElement)('div', this.props.clsPrefix + '-origin');

      this.el.handle = (0, _dom.makeElement)('div', this.props.clsPrefix + '-handle');
      this.el.handleTool = (0, _dom.makeElement)('div', this.props.clsPrefix + '-handle__tool');
      this.el.handleTooltip = (0, _dom.makeElement)('div', this.props.clsPrefix + '-handle__tooltip', {
        textContent: this.props.value + this.props.tooltipSuffix
      });

      this.el.originReal = (0, _dom.makeElement)('div', this.props.clsPrefix + '-origin');

      this.el.handleReal = (0, _dom.makeElement)('div', this.props.clsPrefix + '-handle');
      this.el.handleRealTooltip = (0, _dom.makeElement)('div', [this.props.clsPrefix + '-handle__tooltip', this.props.clsPrefix + '-handle__tooltip--real']);

      this.el.scale = (0, _dom.makeElement)('div', this.props.clsPrefix + '-scale');
      this.el.scale.innerHTML += '<span data-value="' + this.props.min + '" style="left: 0"></span>';
      var offsetX = 0;
      [].concat(_toConsumableArray(Array(this.props.max - 1))).forEach(function (item) {
        offsetX += _this2.settings.step;
        _this2.el.scale.innerHTML += '<span style="left: ' + offsetX + '%"></span>';
      });
      this.el.scale.innerHTML += '<span data-value="' + this.props.max + '" style="left: 100%"></span>';

      this.el.lines.appendChild(this.el.lineHope);
      this.el.lines.appendChild(this.el.lineDiff1);
      this.el.lines.appendChild(this.el.lineDiff);

      this.el.handle.appendChild(this.el.handleTool);
      this.el.handle.appendChild(this.el.handleTooltip);

      this.el.origin.appendChild(this.el.handle);

      this.el.handleReal.appendChild(this.el.handleRealTooltip);

      this.el.originReal.appendChild(this.el.handleReal);

      this.el.base.appendChild(this.el.lines);
      this.el.base.appendChild(this.el.origin);
      this.el.base.appendChild(this.el.originReal);

      this.el.slider.appendChild(this.el.base);
      this.el.slider.appendChild(this.el.scale);

      this.props.container.appendChild(this.el.slider);
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.el.handleTool.addEventListener('mousedown', this.start);
      this.el.handleTool.addEventListener('touchstart', this.start);

      this.el.lines.addEventListener('click', this.clickHandler);
    }
  }, {
    key: 'destroyEvents',
    value: function destroyEvents() {
      this.el.handleTool.removeEventListener('mousedown', this.start);
      this.el.handleTool.removeEventListener('touchstart', this.start);

      this.el.lines.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: 'init',
    value: function init() {
      if (this.props.container instanceof HTMLElement) {
        this.makeElements();
        this.initEvents();
        this.setPosition(this.props.startValue);
      }
    }
  }]);

  return Slider;
}();

exports.default = Slider;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.init = undefined;

var _cmttLikely = __webpack_require__(14);

var _cmttLikely2 = _interopRequireDefault(_cmttLikely);

var _dom = __webpack_require__(4);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSS = {
    likely: 'likely',
    likelyCustom: 'likely--custom'
};

var init = exports.init = function init() {
    _cmttLikely2.default.initate();
};

/**
 * Make likely buttons and append to specified element
 * @param {Element} parentContainer - likely container will be placed here
 * @param {Object} set - object with optional params (title, url, twitter)
 */
var make = exports.make = function make(parentContainer) {
    var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var likelyContainer = (0, _dom.makeElement)('div', [CSS.likely, CSS.likelyCustom]);
    var socials = ['facebook', 'vkontakte', 'twitter'];

    socials.forEach(function (social) {
        var button = (0, _dom.makeElement)('div', social);

        if (social === 'facebook') button.innerHTML = 'Поделиться';

        button.addEventListener('click', function () {
            Analytics.sendEvent('Share ' + social);
        });

        likelyContainer.appendChild(button);
    });

    parentContainer.appendChild(likelyContainer);

    if (set.url) likelyContainer.dataset.url = set.url;
    if (set.twitter) likelyContainer.dataset.twitter = set.twitter;
    if (set.title) likelyContainer.dataset.title = set.title;

    init();
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 'use strict';

var Likely = __webpack_require__(15),
    config = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1);

/**
 * @param {Node} node
 * @param {Object} options
 */
var likely = function (node, options) {
    options = options || {};

    var widget = node[config.name];

    if (widget) {
        widget.update(options);
    }
    else {
        node[config.name] = new Likely(node, utils.merge(
            {}, likely.defaults,
            options, utils.bools(node)
        ));
    }

    return widget;
};

/**
 * Initiate Likely buttons on load
 */
likely.initiate = likely.initate = function () {
    var widgets = dom.findAll('.' + config.name);

    utils.toArray(widgets).forEach(likely);
};

/**
 * Defaults options for likely
 */
likely.defaults = {
    counters: true,
    timeout:  1e3,
    zeroes:   false,
    title:    document.title,
    wait:     0.5e3,
    url:      window.location.href.replace(window.location.hash, '')
};

module.exports = likely;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Button = __webpack_require__(16);

var services = __webpack_require__(5),
    config   = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

/**
 * Main widget view
 *
 * @param {Node} container
 * @param {Object} options
 */
function Likely(container, options) {
    this.isSmartOrder = container.dataset.smart !== undefined ? true : false;
    this.container = container;
    this.options   = options;

    this.countersLeft = 0;
    this.buttons      = [];
    this.number       = 0;

    this.init();
}

Likely.prototype = {

    /**
     * Change buttons order, if previous clicks were saved
     * @param {Array} children
     */
    reorder: function (children) {
        var savedServices = storage.getItem(config.storageKey);

        if (savedServices) {
            savedServices.reverse();

            savedServices.forEach(function (service) {

                var button = dom.find('.' + service);

                if (button) {
                    button.parentNode.insertBefore(button, button.parentNode.firstChild);
                }

            });
        }
    },

    /**
     * Initiate the social buttons widget
     */
    init: function () {

        var buttons = utils.toArray(this.container.children);

        if (dom.isMobile() && this.isSmartOrder) {
            this.reorder(buttons);
        }

        buttons.forEach(this.addButton.bind(this));

        if (this.options.counters) {
            this.timer   = setTimeout(this.appear.bind(this), this.options.wait);
            this.timeout = setTimeout(this.ready.bind(this),  this.options.timeout);
        }
        else {
            this.appear();
        }

        utils.flexboxSupport(this.container, config.name);
    },

    /**
     * Add a button
     *
     * @param {Node} node
     */
    addButton: function (node) {
        var button = new Button(node, this, this.options);

        this.buttons.push(button);

        if (button.options.counterUrl) {
            this.countersLeft++;
        }
    },

    /**
     * Update the timer with URL
     *
     * @param {Object} options
     */
    update: function (options) {
        if (
            options.forceUpdate ||
            options.url !== this.options.url
        ) {
            this.countersLeft = this.buttons.length;
            this.number = 0;

            this.buttons.forEach(function (button) {
                button.update(options);
            });
        }
    },

    /**
     * Update counter
     *
     * @param {String} service
     * @param {Number} counter
     */
    updateCounter: function (service, counter) {
        if (counter) {
            this.number += counter;
        }

        this.countersLeft--;

        if (this.countersLeft === 0) {
            this.appear();
            this.ready();
        }
    },

    /**
     * Show the buttons with smooth animation
     */
    appear: function () {
        this.container.classList.add(config.name + '--visible');
    },

    /**
     * Get. Set. Ready.
     */
    ready: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);

            this.container.classList.add(config.name + '--ready');
        }
    }
};

module.exports = Likely;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(5),
    config = __webpack_require__(0),
    fetch = __webpack_require__(30),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

var htmlSpan = '<span class="{className}">{content}</span>';

/**
 * Separate social link widget
 *
 * @param {Node} widget
 * @param {Likely} likely
 * @param {Object} options
 */
function LikelyButton (widget, likely, options) {
    this.widget  = widget;
    this.likely  = likely;
    this.options = utils.merge(options);

    this.init();
}

LikelyButton.prototype = {
    /**
     * Initiate the button
     */
    init: function () {
        this.detectService();
        this.detectParams();

        if (this.service) {
            this.initHtml();

            setTimeout(this.initCounter.bind(this), 0);
        }
    },

    /**
     * Update the counter
     *
     * @param {Object} options
     */
    update: function (options) {
        var className = '.' + config.prefix + 'counter',
            counters  = dom.findAll(className, this.widget);

        utils.extend(this.options, utils.merge({forceUpdate: false}, options));
        utils.toArray(counters).forEach(function (node) {
            node.parentNode.removeChild(node);
        });

        this.initCounter();
    },

    /**
     * Get the config.name of service and its options
     */
    detectService: function () {
        var widget  = this.widget,
            service = utils.getDataset(widget).service;

        if (!service) {
            var classes = widget.className.split(' ');

            for (var i = 0; i < classes.length; i++) {
                if (classes[i] in services) break;
            }

            service = classes[i];
        }

        if (service) {
            this.service = service;

            utils.extend(this.options, services[service]);
        }
    },

    /**
     * Merge params from data-* attributes into options hash map
     */
    detectParams: function () {
        var options = this.options,
            data    = utils.getDataset(this.widget);

        if (data.counter) {
            var counter = parseInt(data.counter, 10);

            if (isNaN(counter)) {
                options.counterUrl = data.counter;
            }
            else {
                options.counterNumber = counter;
            }
        }

        options.title = data.title || options.title;
        options.url   = data.url   || options.url;
    },

    /**
     * Inititate button's HTML
     */
    initHtml: function () {
        var options = this.options,
            widget  = this.widget,
            text    = widget.innerHTML;

        widget.addEventListener('click', this.click.bind(this));
        widget.classList.remove(this.service);
        widget.className += (' ' + this.className('widget'));

        var button = utils.template(htmlSpan, {
            className: this.className('button'),
            content:   text
        });

        var icon = utils.template(htmlSpan, {
            className: this.className('icon'),
            content:   dom.wrapSVG(options.svgi)
        });

        widget.innerHTML = icon + button;
    },

    /**
     * Fetch or get cached counter value and update the counter
     */
    initCounter: function () {
        var options = this.options;

        if (options.counters && options.counterNumber) {
            this.updateCounter(options.counterNumber);
        }
        else if (options.counterUrl) {
            fetch(
                this.service,
                options.url,
                options
            )(this.updateCounter.bind(this));
        }
    },

    /**
     * @param {String} className
     * @return {String}
     */
    className: function (className) {
        var fullClass = config.prefix + className;

        return fullClass + ' ' + fullClass + '--' + this.service;
    },

    /**
     * Update counter
     *
     * @param {String} e
     */
    updateCounter: function (counter) {
        counter = parseInt(counter, 10) || 0;

        var counterElement = dom.find('.' + config.name + '__counter', this.widget);

        if (counterElement) {
            counterElement.parentNode.removeChild(counterElement);
        }

        var options = {
            className: this.className('counter'),
            content:   counter
        };

        if (!counter && !this.options.zeroes) {
            options.className += ' ' + config.prefix + 'counter--empty';
            options.content = '';
        }

        this.widget.appendChild(
            dom.createNode(utils.template(htmlSpan, options))
        );

        this.likely.updateCounter(this.service, counter);
    },

    /**
     * Click event listener
     */
    click: function () {
        var options = this.options;

        if ( this.service == 'more' ){

            this.widget.classList.toggle('active');
            this.widget.parentElement.classList.toggle(this.options.className);

        } else if (this.service == 'email'){

            var url = utils.makeUrl(options.popupUrl, {
                url: options.url,
                title: options.title
            });

            window.location = url;

            this.rememberClicked(this.service);

        } else {

            if (options.click.call(this)) {

                var twitterText = this.likely.container.dataset.twitter,
                    twitterUrl = this.likely.container.dataset.twitterUrl;

                var window_url = utils.makeUrl(options.popupUrl, {
                    url:   (this.service === 'twitter' && twitterUrl !== '' && twitterUrl !== undefined) ? twitterUrl : options.url,
                    title: (this.service === 'twitter' && twitterText !== '' && twitterText !== undefined) ? twitterText : options.title
                });

                dom.openPopup(
                    this.addAdditionalParamsToUrl(window_url),
                    config.prefix + this.service,
                    options.popupWidth,
                    options.popupHeight
                );

                this.rememberClicked(this.service);
            }

        }

        return false;
    },

    /**
     * Append service data to URL
     *
     * @param {String} url
     */
    addAdditionalParamsToUrl: function (url) {
        var parameters = utils.query(utils.merge(
                this.widget.dataset,
                this.options.data
            )),
            delimeter = url.indexOf('?') === -1 ? '?' : '&';

        return (parameters === '') ? url : (url + delimeter + parameters);
    },

    /**
     * Remember last clicked button and save to storage
     */
    rememberClicked: function (service) {
        var services = storage.getItem(config.storageKey) || [],
            serviceIndex = services.indexOf(service);

        if (serviceIndex !== -1) {
            services.splice(serviceIndex, 1);
        }

        services.splice(0, 0, service);

        storage.setItem(config.storageKey, services);
    }
};

module.exports = LikelyButton;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(1);

/**
 * @param {String} url
 * @param {Function} factory
 */
var counter = function (url, factory) {
    var self = this;
    
    dom.getJSON(url, function (count) {
        try {
            if (typeof self.convertNumber === 'function') {
                count = self.convertNumber(count);
            } 
            
            factory(count);
        } 
        catch (e) {}
    });
};

/**
 * @param {Object} options
 */
module.exports = function (options) {
    options.counter = options.counter || counter;
    options.click   = options.click   || function () { return true; };
};

/***/ }),
/* 18 */
/***/ (function(module) {

module.exports = {"facebook":"5.9 16h3.3V8h2.2l.3-2.8H9.2V3.8c0-.7.1-1.1 1.1-1.1h1.4V0H9.5C6.9 0 5.9 1.3 5.9 3.6v1.7H4.3V8H6v8","twitter":"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353","vkontakte":"15.4 12.8h-1.8c-.7 0-.9-.5-2.1-1.7-1-1-1.5-1.1-1.7-1.1-.4 0-.5.1-.5.6v1.6c0 .4-.1.7-1.3.7-1.9 0-3.9-1.1-5.3-3.2C.6 6.5 0 4.2 0 3.7c0-.3.1-.5.6-.5h1.8c.4 0 .6.2.8.7C4 6.4 5.4 8.6 6 8.6c.2 0 .3-.1.3-.7V5.4c0-1.2-.6-1.3-.6-1.7 0-.2.2-.4.4-.4h2.8c.4 0 .5.2.5.6v3.5c0 .4.2.5.3.5.2 0 .4-.1.8-.5 1.3-1.4 2.2-3.6 2.2-3.6.1-.3.3-.5.8-.5h1.8c.5 0 .6.3.5.6-.2 1-2.4 4-2.4 4-.2.3-.3.4 0 .8.2.3.8.8 1.2 1.3.8.8 1.3 1.6 1.5 2.1 0 .4-.2.7-.7.7","gplus":"8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8","odnoklassniki":"8 2.6c.9 0 1.7.7 1.7 1.7C9.7 5.2 9 6 8 6c-.9 0-1.7-.7-1.7-1.7S7.1 2.6 8 2.6zm0 5.7c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm1.6 3.2c.8-.2 1.6-.5 2.3-1 .5-.3.7-1.1.4-1.6-.3-.6-1.1-.7-1.6-.4-1.6 1-3.8 1-5.4 0-.6-.3-1.3-.1-1.6.4-.4.6-.2 1.3.3 1.7.7.5 1.5.8 2.3 1l-2.2 2.2c-.5.5-.5 1.2 0 1.7.2.2.5.3.8.3.3 0 .6-.1.8-.3L8 13.2l2.2 2.2c.5.5 1.2.5 1.7 0s.5-1.2 0-1.7l-2.3-2.2","pocket":"12.533 6.864L8.77 10.4c-.213.2-.486.3-.76.3-.273 0-.547-.1-.76-.3L3.488 6.865c-.437-.41-.45-1.09-.032-1.52.42-.428 1.114-.443 1.55-.032l3.006 2.823 3.004-2.823c.438-.41 1.132-.396 1.55.032.42.43.406 1.11-.03 1.52zm3.388-4.928c-.207-.56-.755-.936-1.363-.936H1.45C.854 1 .31 1.368.096 1.917.032 2.08 0 2.25 0 2.422v4.73l.055.94c.232 2.14 1.366 4.01 3.12 5.314.03.024.063.047.094.07l.02.013c.94.673 1.992 1.13 3.128 1.353.524.104 1.06.157 1.592.157.492 0 .986-.045 1.472-.133.058-.01.116-.022.175-.034.016-.003.033-.01.05-.018 1.088-.233 2.098-.677 3.003-1.326l.02-.015c.032-.022.064-.045.096-.07 1.753-1.303 2.887-3.173 3.12-5.312l.054-.94v-4.73c0-.165-.02-.327-.08-.487","telegram":"12.4 4.2L6.6 9.6c-.2.2-.3.4-.4.7L6 11.8c0 .2-.3.2-.3 0l-.8-2.6c-.1-.4.1-.7.3-.8l7-4.3c.2-.2.4 0 .2.1zm2.9-3L.5 6.9c-.4.1-.4.7 0 .8L4.1 9l1.4 4.5c.1.3.4.4.7.2l2-1.6c.2-.2.5-.2.7 0l3.6 2.6c.3.2.6 0 .7-.3l2.6-12.8c.1-.2-.2-.5-.5-.4","whatsapp":"15.8 7.8c0 4.2-3.4 7.6-7.6 7.6-1.3 0-2.6-.3-3.7-.9L.3 15.8l1.4-4.1C1 10.6.6 9.2.6 7.8.6 3.6 4 .2 8.2.2c4.2 0 7.6 3.4 7.6 7.6M8.1 1.4c-3.5 0-6.4 2.9-6.4 6.4 0 1.4.5 2.7 1.2 3.7l-.8 2.4 2.5-.8c1 .7 2.2 1.1 3.5 1.1 3.5 0 6.4-2.9 6.4-6.4.1-3.5-2.8-6.4-6.4-6.4M12 9.5c0-.1-.2-.1-.4-.2s-1.1-.5-1.3-.6c-.2-.1-.3-.1-.4.1-.1.2-.4.6-.6.7-.1.1-.2.1-.4 0-.1 0-.8-.2-1.5-.8-.6-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3 0-.2 0-.3-.1-.4 0-.1-.4-1-.6-1.4-.1-.3-.3-.2-.4-.2h-.4c-.1 0-.3 0-.5.2-.1.2-.6.6-.6 1.5s.7 1.8.8 1.9c.1.1 1.3 2.1 3.2 2.8 1.9.7 1.9.5 2.2.5.3 0 1.1-.4 1.3-.9.1-.4.1-.8.1-.9","viber":"13.7 6.7c0 .3.1.7-.3.8-.6.1-.5-.4-.5-.8-.4-2.3-1.2-3.2-3.5-3.7-.4-.1-.9 0-.8-.5.1-.5.5-.4.9-.3 2.3.3 4.2 2.3 4.2 4.5zM8.8 1.2c3.7.6 5.5 2.4 5.9 6.1 0 .3-.1.9.4.9s.4-.5.4-.9c0-3.6-3.1-6.8-6.7-7-.2.1-.8-.1-.8.5 0 .4.4.3.8.4zm5.7 10.2c-.5-.4-1-.7-1.5-1.1-1-.7-1.9-.7-2.6.4-.4.6-1 .6-1.6.4-1.7-.8-2.9-1.9-3.7-3.6-.3-.7-.3-1.4.5-1.9.4-.3.8-.6.8-1.2 0-.8-2-3.5-2.7-3.7-.3-.1-.6-.1-1 0C.9 1.2.2 2.7.9 4.4c2.1 5.2 5.8 8.8 11 11 .3.1.6.2.8.2 1.2 0 2.5-1.1 2.9-2.2.3-1-.5-1.5-1.1-2zM9.7 4c-.2 0-.5 0-.6.3-.1.4.2.5.5.5.9.2 1.4.7 1.5 1.7 0 .3.2.5.4.4.3 0 .4-.3.4-.6 0-1.1-1.2-2.3-2.2-2.3","email":"12.7 1c1 .5 1.8 1.2 2.3 2.2.5.9.8 1.9.8 3.1 0 .9-.1 1.8-.5 2.7-.3.9-.8 1.6-1.4 2.2-.6.6-1.4.9-2.3.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.7-.7-1.2-.6 1.1-1.5 1.6-2.5 1.6-.8 0-1.5-.3-1.9-.8-.5-.6-.7-1.3-.7-2.2 0-.8.1-1.6.4-2.5S5.5 5 6.1 4.4c.7-.6 1.5-.8 2.6-.8.5 0 1 .1 1.4.2.5.1.9.3 1.3.6l-.7 4.9v.3c0 .2 0 .4.1.5.1.1.3.2.5.2.4 0 .8-.2 1.1-.7.3-.4.5-1 .7-1.6.1-.7.2-1.3.2-1.9 0-1.3-.4-2.3-1.1-3-.8-.7-1.9-1-3.4-1s-2.7.4-3.7 1.1c-.9.7-1.6 1.6-2 2.6S2.6 7.9 2.6 9c0 .9.2 1.8.6 2.5.4.7 1 1.3 1.7 1.7.7.4 1.7.6 2.7.6.5 0 1-.1 1.6-.2.6-.1 1.1-.3 1.5-.4l.4 1.9c-.6.2-1.2.4-1.8.5-.7.1-1.3.2-1.9.2-1.4 0-2.7-.3-3.8-.9s-1.9-1.4-2.5-2.4S.2 10.3.2 9c0-1.3.3-2.7 1-4 .6-1.4 1.6-2.5 3-3.4C5.5.7 7.2.2 9.2.2c1.3 0 2.5.3 3.5.8zm-4 8.4l.6-3.9c-.3-.1-.5-.2-.7-.2-.7 0-1.2.4-1.5 1.2-.3.8-.5 1.7-.5 2.6 0 .8.3 1.2.8 1.2s.9-.3 1.3-.9","more":"14.725 6.667H9.333V1.275C9.333.57 8.738 0 8 0S6.667.57 6.667 1.275v5.392H1.275C.57 6.667 0 7.262 0 8s.57 1.334 1.275 1.334h5.392v5.393C6.667 15.43 7.262 16 8 16s1.333-.57 1.333-1.273V9.334h5.392C15.43 9.334 16 8.738 16 8s-.57-1.333-1.275-1.333"};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Odnoklassniki service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var odnoklassniki = {
    counterUrl: config.secure 
        ? undefined 
        : 'http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: 'http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}',
    popupWidth: 640,
    popupHeight: 400
};

utils.set(window, 'ODKL.updateCount', function (index, counter) {
    odnoklassniki.promises[index](counter);
});

module.exports = odnoklassniki;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vkontakte service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var vkontakte = {
    counterUrl: 'https://vk.com/share.php?act=count&url={url}&index={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: config.protocol + '//vk.com/share.php?url={url}&title={title}',
    popupWidth: 550,
    popupHeight: 330
};

utils.set(window, 'VK.Share.count', function (index, count) {
    vkontakte.promises[index](count);
});

module.exports = vkontakte;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Facebook service provider
 */

module.exports = {
    counterUrl: 'https://graph.facebook.com/?fields=share,og_object{likes.limit(0).summary(true),comments.limit(0).summary(true)}&id={url}&callback=?',
    convertNumber: function (counter) {
        return counter.share.share_count;
    },
    popupUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    popupWidth: 600,
    popupHeight: 500
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Twitter service provider
 */

var config = __webpack_require__(0);

var twitter = {
    popupUrl: config.protocol + '//twitter.com/intent/tweet?url={url}&text={title}',
    popupWidth: 600,
    popupHeight: 450,
    click: function () {
        if (!/[\.\?:\-–—]\s*$/.test(this.options.title)) {
            this.options.title += ':';
        }

        return true;
    }
};

module.exports = twitter;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Google+ service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var gplus = {
    gid: 0,
    promises: {},
    popupUrl: 'https://plus.google.com/share?url={url}',
    popupWidth: 700,
    popupHeight: 500
};

module.exports = gplus;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Pocket service provider
 */

var config = __webpack_require__(0);

var pocket = {
    popupUrl: config.protocol + '//getpocket.com/save?url={url}&format=json&callback=?',
    popupWidth: 600,
    popupHeight: 300
};

module.exports = pocket;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * Telegram service provider
 */

module.exports = {
    popupUrl: 'tg://msg?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * WhatsApp service provider
 */

module.exports = {
    popupUrl: 'whatsapp://send?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Viber service provider
 */

module.exports = {
    popupUrl: 'viber://forward?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * E-mail service provider
 */

var config = __webpack_require__(0);

var email = {
    popupUrl: 'mailto:?subject={title}&body={url}',
    popupWidth: 0,
    popupHeight: 0
};

module.exports = email;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

module.exports = {
	parent: config.name,
    className: config.name + '--expanded'
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(5),
    Factory  = __webpack_require__(31),
    utils    = __webpack_require__(2),
    dom      = __webpack_require__(1);

var factories = {};

/**
 * Fetch data
 *
 * @param {String} service
 * @param {String} url
 * @param {Object} options
 * @return {Promise}
 */
module.exports = function (service, url, options) {
    if (!factories[service]) {
        factories[service] = {};
    }

    var counters = factories[service],
        counter  = counters[url];

    if (!options.forceUpdate && counter) {
        return counter;
    }

    counter = Factory();

    var href = utils.makeUrl(options.counterUrl, {
        url: url
    });

    services[service].counter(href, counter, url);

    counters[url] = counter;

    return counters[url];
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

/**
 * Factory function
 * 
 * This function returns function with following API:
 * 
 * - if passed argument is callback, then this callback would be callled
 *   if the value was changed
 * - if passed argument is anything but undefined or function, then this 
 *   function behaves like setter
 * - if argument isn't provided, then return value stored in closure
 * 
 * @param {Object} value
 * @return {Function}
 */
module.exports = function (value) {
    var listeners = [];
    
    return function (argument) {
        var type = typeof argument;
        
        if (type == 'undefined') {
            return value;
        }
        else if (type == 'function') {
            listeners.push(argument);
        }
        else {
            value = argument;
            
            listeners.forEach(function (listener) {
                listener(argument);
            });
        }
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  spinner: '<svg viewBox="0 0 34 34"><circle cx="17" cy="2" r="2"/><circle cx="17" cy="32" r="2" style="isolation:isolate" opacity=".3"/><circle cx="24.5" cy="4" r="2" style="isolation:isolate" opacity=".3"/><circle cx="9.5" cy="30" r="2" style="isolation:isolate" opacity=".3"/><circle cx="9.5" cy="4" r="2" style="isolation:isolate" opacity=".93"/><circle cx="24.5" cy="30" r="2" style="isolation:isolate" opacity=".3"/><circle cx="2" cy="17" r="2" style="isolation:isolate" opacity=".65"/><circle cx="32" cy="17" r="2" style="isolation:isolate" opacity=".3"/><circle cx="4" cy="9.5" r="2" style="isolation:isolate" opacity=".86"/><circle cx="30" cy="24.5" r="2" style="isolation:isolate" opacity=".3"/><circle cx="4" cy="24.5" r="2" style="isolation:isolate" opacity=".44"/><circle cx="30" cy="9.5" r="2" style="isolation:isolate" opacity=".3"/></svg>',
  refresh: '<svg width="15" height="15"><path d="M14.62.674c-.268-.11-.495-.065-.684.136l-1.27 1.26A7.58 7.58 0 0 0 10.278.542 7.357 7.357 0 0 0 7.5 0a7.298 7.298 0 0 0-2.91.596 7.565 7.565 0 0 0-2.393 1.601A7.567 7.567 0 0 0 .596 4.59 7.298 7.298 0 0 0 0 7.5c0 1.015.199 1.986.596 2.91a7.567 7.567 0 0 0 1.601 2.393 7.57 7.57 0 0 0 2.393 1.601A7.298 7.298 0 0 0 7.5 15c1.12 0 2.185-.236 3.194-.708a7.333 7.333 0 0 0 2.578-1.997.32.32 0 0 0 .073-.22.27.27 0 0 0-.093-.2l-1.338-1.348a.376.376 0 0 0-.244-.087c-.104.013-.179.052-.224.117a4.904 4.904 0 0 1-1.748 1.436A4.925 4.925 0 0 1 7.5 12.5a4.87 4.87 0 0 1-1.938-.395 5.034 5.034 0 0 1-1.597-1.07A5.038 5.038 0 0 1 2.896 9.44 4.87 4.87 0 0 1 2.5 7.5c0-.677.132-1.323.396-1.938a5.036 5.036 0 0 1 1.07-1.597c.449-.45.98-.806 1.596-1.07A4.87 4.87 0 0 1 7.5 2.5c1.309 0 2.445.446 3.409 1.338L9.56 5.186c-.202.195-.248.42-.137.674.11.26.303.39.576.39h4.375a.6.6 0 0 0 .44-.185.6.6 0 0 0 .185-.44V1.25a.584.584 0 0 0-.38-.576z"/></svg>'
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  questions: [{
    text: 'В ноябре в российский прокат вышел фильм про историю успеха группы Queen. Теперь стоит скачать все их альбомы.',
    title: 'Сколько трафика на это уйдёт?',
    notice: 'В среднем одна песня группы в MP3 весит около 8 мегабайт.',
    img: '<svg width="274.24" height="200" viewBox="0 0 274.24 200"><path class="neon-a" d="M248.79 43.78l.05-2.14a1.51 1.51 0 0 0-.05 2.14zM242 37.36a1.518 1.518 0 0 0 1.91-2.36A84.78 84.78 0 0 0 200 15.94v3a81.74 81.74 0 0 1 42 18.38z"/><path class="neon-a" d="M251 41.7a1.51 1.51 0 0 0-2.14-.06l-.06 2.14A81.7 81.7 0 0 1 200 181v3.05A84.72 84.72 0 0 0 251 41.7z"/><path class="neon-a" d="M241 100a1.51 1.51 0 1 0-3 0 48.49 48.49 0 0 1-38 47.27v3.09A51.52 51.52 0 0 0 241 100zM236.47 154.76a1.51 1.51 0 0 0 2.13.12A73.73 73.73 0 0 0 263.15 100a1.51 1.51 0 0 0-3 0 70.71 70.71 0 0 1-23.53 52.62 1.51 1.51 0 0 0-.12 2.13l-.74.67z"/><path class="neon-a" d="M250.54 98.49A1.51 1.51 0 0 0 249 100a59.47 59.47 0 0 1-36 54.71 1.512 1.512 0 1 0 1.19 2.78A62.49 62.49 0 0 0 252 100a1.51 1.51 0 0 0-1.46-1.51zM200 139a40.35 40.35 0 0 0 0-78v78zm0-63.35a26.45 26.45 0 0 1 0 48.35V75.61zm0 51.64a29.46 29.46 0 0 0 0-54.9v-8.21a37.32 37.32 0 0 1 0 71.64v-8.57z"/><path class="neon-a" d="M210.45 100a1.51 1.51 0 0 0-1.51-1.51h-5.55a1.51 1.51 0 1 0 0 3h5.55a1.51 1.51 0 0 0 1.51-1.49zM52.64 88.72a13.21 13.21 0 0 0-4.17-3.86 10.87 10.87 0 0 0-2.24-.86 11 11 0 0 0-2.12-.33 10.91 10.91 0 0 0-6 1.37 9.69 9.69 0 0 0-3.31 3.06c-3.16 4.76-3 13.55.4 18.79a10.64 10.64 0 0 0 10 5.26 8.24 8.24 0 0 0 3.78-.9c4.87-2.24 7.2-8.18 6.08-15.49a20.19 20.19 0 0 0-2.42-7.04zm-4.5 20.74a7.55 7.55 0 0 1-1.44.54 8.35 8.35 0 0 1-1.59.18 8.65 8.65 0 0 1-8.19-4.34 16.91 16.91 0 0 1-2.33-8.54 14.48 14.48 0 0 1 1.91-8.06 8.69 8.69 0 0 1 11.07-2.59 11.31 11.31 0 0 1 3.43 3.2 12 12 0 0 1 1.19 2.62 21.72 21.72 0 0 1 .9 3.61c1.04 6.86-1.23 11.66-4.96 13.38zM174.1 85a2.42 2.42 0 0 0-.89-.48 5.66 5.66 0 0 0-1.21-.18c-.83-.06-2.16-.07-4.21-.07-1.66 0-3 0-3.89.07-.45 0-.85.05-1.17.1a3.73 3.73 0 0 0-.57.12 2.31 2.31 0 0 0-.49.22 2.06 2.06 0 0 0-.91 1.12 2.18 2.18 0 0 0 .34 2 2.54 2.54 0 0 0 1.11.8 10 10 0 0 0 1.8.42.81.81 0 0 1 .59.64v.51c0 .44.05 1.05.07 1.78 0 1.46.07 3.37.07 5.38v3c-1.14-1.22-2.5-2.71-3.9-4.29-3.49-3.92-7.08-8.17-8.23-9.84l-1.31-1.9-4.16-.17a21.67 21.67 0 0 0-3.31 0 4.15 4.15 0 0 0-.67.14 2.49 2.49 0 0 0-1 .52 2.13 2.13 0 0 0-.68 2 2.28 2.28 0 0 0 .65 1.22 2.2 2.2 0 0 0 .56.4l.29.13.47.15c.31.09.68.17 1 .24a1.59 1.59 0 0 1 .75.29.77.77 0 0 1 .23.38V90.38c0 .52.05 1.24.08 2.11 0 1.75.07 4.1.07 6.71 0 5.12 0 7.53-.19 8.81a3.14 3.14 0 0 1-.12.6l-.26.17-.13.07-.23.08-.2.05a3.65 3.65 0 0 0-1.93.54 2.42 2.42 0 0 0-1 1.28 2.21 2.21 0 0 0 .56 2.24 2 2 0 0 0 .79.49l.27.07H153.82l.27-.07a2 2 0 0 0 .79-.49 2.21 2.21 0 0 0 .58-2.14 2.41 2.41 0 0 0-.85-1.26 3.2 3.2 0 0 0-2-.66 1.39 1.39 0 0 1-.62-.19 1.37 1.37 0 0 1-.27-.19.5.5 0 0 1-.09-.1.4.4 0 0 1 0-.13 7.3 7.3 0 0 1-.11-1c-.07-1.12-.1-3-.14-6.52v-4.21l.85 1c2 2.33 5.6 6.45 8 9.15s4.63 5.3 5 5.76a5.38 5.38 0 0 0 1.1 1.08 2.78 2.78 0 0 0 2 .53 2.28 2.28 0 0 0 1.88-1.54 6.68 6.68 0 0 0 .26-1.83c.07-1.45.07-4.23.07-9.54v-7.9-2.58V90v-.35a1.35 1.35 0 0 1 .19-.3l.16-.16a2.86 2.86 0 0 1 .63-.12 6.62 6.62 0 0 0 1.48-.32 2.8 2.8 0 0 0 .88-.51 2.21 2.21 0 0 0 .76-1.66 2.12 2.12 0 0 0-.54-1.58zm-2.61 2.12l-.55.08a2.3 2.3 0 0 0-1.49.85l-.18.22a2.91 2.91 0 0 0-.56 1.34V110.31c-.06 1.79-.18 1.86-.44 1.9a1.67 1.67 0 0 1-1.23-.86l-.25-.3-.11-.13c-.82-1-2.73-3.17-4.71-5.42-2.38-2.7-6-6.81-8-9.14-.85-1-1.66-1.91-2.32-2.64l-.25-.28a15.53 15.53 0 0 0-1.4-1.37c-.13 0-.23 0-.3.34a5.69 5.69 0 0 0-.11.9v7.63c0 3.19.06 5.11.12 6.32a5 5 0 0 0 .4 2.27 2.19 2.19 0 0 0 .18.28 3.37 3.37 0 0 0 1.57 1.07 3.12 3.12 0 0 0 1 .17h.14c.49.07.86.4.63.63a4.13 4.13 0 0 1-.82.07h-8.18a5.44 5.44 0 0 1-1-.07c-.23-.23.09-.51.61-.61a2.05 2.05 0 0 1 .38 0 2.94 2.94 0 0 0 .81-.15 3.74 3.74 0 0 0 .79-.35 2.52 2.52 0 0 0 .88-.74 5.34 5.34 0 0 0 .55-2.55c.08-1.33.1-3.3.1-6.29v-1.7c0-2.75 0-5.22-.08-7a24.87 24.87 0 0 0-.17-2.95 3.06 3.06 0 0 0-.48-1 3 3 0 0 0-1.6-1l-.42-.22a4.89 4.89 0 0 1-1.33-.38c-.21-.21-.08-.35.43-.43a8.35 8.35 0 0 1 1.06-.07h1.98l3.16.13.7 1.12a208.32 208.32 0 0 0 13.72 15.83l.25.25a6.49 6.49 0 0 0 1.48 1.3c.08 0 .14-.11.18-.42a14.51 14.51 0 0 0 .1-1.56v-.37-1.23-3.77c0-2.53 0-4.92-.11-6.47a12.89 12.89 0 0 0-.13-1.72 3.42 3.42 0 0 0-.49-1 2.64 2.64 0 0 0-1.53-1.06h-.18c-1.42-.24-1.78-.38-1.69-.65a4.82 4.82 0 0 1 1.84-.21h6.91c1.13 0 1.45.13 1.45.3s-.41.29-1.31.42z"/><path class="neon-a" d="M140.16 104a2.11 2.11 0 0 0-1.83-.25 2.43 2.43 0 0 0-.8.45 6.14 6.14 0 0 0-1.29 1.74 4.11 4.11 0 0 1-.49.69 3.26 3.26 0 0 1-.26.27l-.11.09a1.2 1.2 0 0 1-.21.12 1.4 1.4 0 0 1-.31.05c-.54.06-1.47.06-3.49.05-1.58 0-2.64 0-3.4-.09a3.59 3.59 0 0 1-.79-.14 2.16 2.16 0 0 1-.08-.32 21.52 21.52 0 0 1-.2-2.62v-.11c0-1-.08-1.69-.07-2.2h1.98a2.9 2.9 0 0 0 .19.67 2.22 2.22 0 0 0 2.15 1.38 2.42 2.42 0 0 0 1.74-.93 4.28 4.28 0 0 0 .61-1.06c.57-1.36 1.22-3.21 1.7-4.73.24-.76.45-1.48.59-2 .07-.27.13-.55.16-.79a3.14 3.14 0 0 0 0-.49 2.28 2.28 0 0 0-.05-.47 2.06 2.06 0 0 0-.55-1l-.22-.2a2.92 2.92 0 0 0 .28-.39 7.4 7.4 0 0 0 .37-.71c.24-.5.52-1.17.81-1.92.59-1.51 1.28-3.45 1.83-5.24a3.7 3.7 0 0 0 .15-.72 2.36 2.36 0 0 0-.2-1.24 2.1 2.1 0 0 0-1.88-1.2 2.31 2.31 0 0 0-1.22.35 4 4 0 0 0-1 .88 8.18 8.18 0 0 0-.74 1.09 5.14 5.14 0 0 1-.59.92h-.05a1.39 1.39 0 0 1-.32.1 13.76 13.76 0 0 1-2.39.2h-5.1c-2.84 0-4.8 0-6.06.06-.62 0-1.13.05-1.51.1a3.73 3.73 0 0 0-.68.14 2.27 2.27 0 0 0-.64.32 2 2 0 0 0-.84 1.65 2.17 2.17 0 0 0 .74 1.61 2.84 2.84 0 0 0 .67.44 4.56 4.56 0 0 0 1.18.37 4.12 4.12 0 0 1 1.11.3h.05a10.26 10.26 0 0 1 .11 1.33c.06 1.42.07 3.86.07 8.3 0 3.57 0 6.06-.07 7.72 0 .83-.05 1.42-.09 1.82v.2a3.19 3.19 0 0 1-1 .31 4.64 4.64 0 0 0-1.31.39 2.72 2.72 0 0 0-.76.55 2.34 2.34 0 0 0-.33.44c.36-1 .67-2 .9-2.68.12-.39.22-.73.29-1s.07-.28.09-.42a2.49 2.49 0 0 0 0-.32 2.11 2.11 0 0 0 0-.34 2 2 0 0 0-.28-.84 2.32 2.32 0 0 0-1.4-1.08 2.23 2.23 0 0 0-2 .49 3.31 3.31 0 0 0-.67.82 7.91 7.91 0 0 0-.41.8 3.12 3.12 0 0 1-.77 1 1.82 1.82 0 0 1-.74.44 12.65 12.65 0 0 1-1.57.07c-.82 0-1.8 0-2.77-.05s-1.89-.1-2.61-.16l-.69-.08v-.14a16.57 16.57 0 0 1-.21-3.35v-.1-1.74h1.85a3.29 3.29 0 0 0 .21.66 2.32 2.32 0 0 0 1.61 1.35 2.27 2.27 0 0 0 2.15-.73 3.52 3.52 0 0 0 .64-1.06c.29-.74.94-2.55 1.49-4.15.28-.81.55-1.6.74-2.19l.24-.75.08-.28v-.16-.14a2.13 2.13 0 0 0 0-.33 2.39 2.39 0 0 0-.23-1.05A2.16 2.16 0 0 0 111 92a3 3 0 0 0 .42-.52 7.49 7.49 0 0 0 .5-1c.31-.7.69-1.68 1.13-2.93.36-1 .7-2 .94-2.76.12-.37.23-.7.3-1l.1-.36a2.65 2.65 0 0 0 .09-.61 2.61 2.61 0 0 0-.11-.77 2.1 2.1 0 0 0-2.78-1.35 2.51 2.51 0 0 0-.7.41 8.08 8.08 0 0 0-1.34 1.63l-.22.33a5.15 5.15 0 0 1-.52.71.51.51 0 0 1-.31.12 12.94 12.94 0 0 1-2.27.18H101.17c-2.76 0-4.75 0-6.06.08-.65 0-1.18.06-1.57.1a4.64 4.64 0 0 0-.63.11 2.45 2.45 0 0 0-.51.19 2.08 2.08 0 0 0-.86.83 2.16 2.16 0 0 0-1-.93 2.87 2.87 0 0 0-.54-.01 11.81 11.81 0 0 0-2-.21c-.82 0-1.9-.07-3.24-.08h-4.34a5 5 0 0 0-1.25.2 2.34 2.34 0 0 0-1 .59 2.14 2.14 0 0 0-.61 1.5A2.37 2.37 0 0 0 79 88.58a5.21 5.21 0 0 0 1.4.38 1.83 1.83 0 0 1 .85.35l.1.09c0 .08 0 .22.08.48s.09.76.14 1.36c.12 1.3.18 4.6.13 7.29-.09 4.36-.19 4.88-.55 5.91-.67 1.93-1.36 2.71-2.35 3.26a3 3 0 0 1-.91.4 10.48 10.48 0 0 1-1.79.08 10.53 10.53 0 0 1-1.79-.08 2.86 2.86 0 0 1-.88-.39 4.14 4.14 0 0 1-1.27-1 6 6 0 0 1-.91-1.73c-.33-.9-.41-1.14-.5-8.28l-.09-6.91.23-.35a1.47 1.47 0 0 1 .13-.18 3.58 3.58 0 0 1 .8-.26 9.65 9.65 0 0 0 1.32-.43 4.12 4.12 0 0 0 .62-.32 2.47 2.47 0 0 0 .45-.37 2.09 2.09 0 0 0 .59-1.38 2 2 0 0 0-1-1.83 2.32 2.32 0 0 0-.54-.22 4.18 4.18 0 0 0-.57-.11c-.34 0-.78-.08-1.29-.1-1-.06-2.54-.09-4.41-.12h-4.93a5.94 5.94 0 0 0-1.3.18 2.41 2.41 0 0 0-1 .51 2.13 2.13 0 0 0-.71 1.59 2.21 2.21 0 0 0 .17.86 16.05 16.05 0 0 0-2.57-3 18.42 18.42 0 0 0-12.54-4.36 18.41 18.41 0 0 0-8.5 1.92 17.7 17.7 0 0 0-10 16.29 17.62 17.62 0 0 0 2.85 10A18.37 18.37 0 0 0 40 115.62c.54.1 1.08.21 1.53.31l.54.14h.1l.22.14.89.59c.72.49 1.65 1.14 2.6 1.82 7.4 5.32 13.07 8.49 19 10.53a53.27 53.27 0 0 0 9.59 2.21 24 24 0 0 0 10.42-1.13 15.33 15.33 0 0 0 2.67-1.44 12.58 12.58 0 0 0 1.14-.84 5.49 5.49 0 0 0 .5-.47 2.76 2.76 0 0 0 .55-.86 2.71 2.71 0 0 0 .09-1.87 2.24 2.24 0 0 0-.94-1.17 2.4 2.4 0 0 0-1.12-.35 3.79 3.79 0 0 0-1.41.22 10.41 10.41 0 0 0-1.27.53 12.54 12.54 0 0 1-7 1.25c-4.21-.18-8.36-1.52-14.48-4.89a90.94 90.94 0 0 1-7.76-5c-.94-.66-1.78-1.28-2.46-1.81a17.92 17.92 0 0 0 8.84-17.36 18.43 18.43 0 0 0-2.57-8.3 2.8 2.8 0 0 0 .87.63 5.22 5.22 0 0 0 1.4.38 1.24 1.24 0 0 1 1.16.91v.55c0 .3.05 1 .07 1.71 0 1.39.07 3.18.07 5a52.3 52.3 0 0 0 .47 9 8.82 8.82 0 0 0 2.55 4.95 10.32 10.32 0 0 0 5.06 2.86 18 18 0 0 0 4.59.31c.82 0 1.65-.1 2.39-.2a9 9 0 0 0 2-.48 10.47 10.47 0 0 0 6.41-6.89c.52-1.62.62-3.3.8-9.46.06-2 .14-3.94.22-5.4 0-.73.08-1.34.12-1.78 0-.22 0-.39.05-.5a1 1 0 0 1 .1-.17 3.09 3.09 0 0 1 .92-.29c.33-.08.63-.17.89-.25a4.28 4.28 0 0 0 .84-.35 2.29 2.29 0 0 0 .71-.63l.12-.19.08.14a2.41 2.41 0 0 0 .69.73 3.29 3.29 0 0 0 1.2.5L94 89l.57.12.43.14a12.62 12.62 0 0 1 .27 2.77c0 1.22 0 2.78.06 4.82v1.71c0 5.13 0 7.71-.11 9.14a3.83 3.83 0 0 1-.17.92l-.08.07-.25.1a3.28 3.28 0 0 1-.58.17 5.92 5.92 0 0 0-1.23.34 3.52 3.52 0 0 0-.63.33 2.28 2.28 0 0 0-.9 1.15 2 2 0 0 0 .36 1.94 2.16 2.16 0 0 0 .82.61 3.17 3.17 0 0 0 .79.21 15.71 15.71 0 0 0 1.59.11c1.36 0 3.57.07 7 .07 4.42 0 6.68 0 7.86.13v.21a2.67 2.67 0 0 0 .18.58 2.17 2.17 0 0 0 .76.92 2.08 2.08 0 0 0 1.72.28 2.21 2.21 0 0 0 .9-.5 3.21 3.21 0 0 0 .6-.76 23.79 23.79 0 0 0 1.49-3.54 2.25 2.25 0 0 0 0 .34 2.11 2.11 0 0 0 1.17 1.88 3 3 0 0 0 .84.26 13 13 0 0 0 1.6.13c1.35.05 3.61.07 7.28.07h7.62v.09a2.14 2.14 0 0 0 1.5 1.75 2.37 2.37 0 0 0 1.44 0 2.05 2.05 0 0 0 .7-.4 2.17 2.17 0 0 0 .25-.26 2.52 2.52 0 0 0 .21-.3 4.52 4.52 0 0 0 .22-.4c.12-.25.26-.57.41-.92.29-.71.65-1.63 1-2.57s.69-1.9 1-2.69c.13-.39.24-.76.33-1.06a4.74 4.74 0 0 0 .2-1 2.71 2.71 0 0 0-.07-.77 2.16 2.16 0 0 0-.99-1.19zm-79.93-7.61a16 16 0 0 1-9 16.11 2.16 2.16 0 0 0-1 .84c0 .73 7.81 6.25 12.43 8.8 6.26 3.44 10.72 4.94 15.36 5.14h2.53a13.29 13.29 0 0 0 3-.49 14.67 14.67 0 0 0 2.44-1q.4-.2.73-.33c1-.41 1.44-.26 1.17.45a3.82 3.82 0 0 1-1.15 1l-.13.09a13.58 13.58 0 0 1-2.42 1.33 16.18 16.18 0 0 1-3.41.86 24.76 24.76 0 0 1-6.08.14 51.5 51.5 0 0 1-9.14-2.11c-5.65-2-11.15-5-18.46-10.27-1.93-1.39-3.77-2.63-4.08-2.76a20.4 20.4 0 0 0-2.62-.61A16.37 16.37 0 0 1 30.11 107c-3.37-4.9-3.32-12.77.11-17.91a16.63 16.63 0 0 1 6.25-5.46l.76-.35a16.36 16.36 0 0 1 6.87-1.37 20.4 20.4 0 0 1 2.47.14c7.78.95 13.07 6.37 13.66 14.34zM88.43 87l-.57.16a2.54 2.54 0 0 0-1.49 1 3.06 3.06 0 0 0-.34.74 36.43 36.43 0 0 0-.32 4.1c-.06 1.23-.11 2.64-.16 4.11v1.51c-.15 4.64-.26 6-.57 7.13l-.08.26q-.16.49-.34.93a9.38 9.38 0 0 1-.66 1.28 8.08 8.08 0 0 1-3.12 2.91 11.08 11.08 0 0 1-1.14.53 12.74 12.74 0 0 1-3.46.52 16.93 16.93 0 0 1-4.28-.23 8.33 8.33 0 0 1-4.11-2.3c-2.12-2.23-2.43-3.81-2.44-12.43 0-3.74-.11-7.24-.24-7.78a3.08 3.08 0 0 0-.64-1.3 3.27 3.27 0 0 0-1.46-1 4 4 0 0 0-.79-.14c-.76-.11-1.14-.29-1.14-.53s.25-.25 1.27-.29h6.17l2.29.07h.31a4.61 4.61 0 0 1 1.68.21 3.05 3.05 0 0 1-1.47.62l-.4.11a2.43 2.43 0 0 0-1.57 1l-.08.12-.58.86.09 7.53c.09 7 .13 7.64.62 9a6.29 6.29 0 0 0 3.09 3.79c1.16.64 1.5.72 3.55.72h.09a7.33 7.33 0 0 0 2.75-.28 7.44 7.44 0 0 0 .92-.45 6 6 0 0 0 2.34-2.27 9.31 9.31 0 0 0 .53-1q.16-.35.3-.75l.11-.3c.48-1.38.57-2.22.66-6.53v-1.52-4.07c0-.79-.06-1.46-.1-1.93-.18-2-.26-2.46-.65-2.92a3.67 3.67 0 0 0-.33-.32 3.48 3.48 0 0 0-1.17-.66 4.07 4.07 0 0 0-.75-.21c-.76-.11-1.14-.29-1.14-.53s.25-.26 1.27-.3h4.67c.89 0 1.63 0 2.23.06h.46c2.01.15 1.94.37.19.77zm26.29 19.87l-.22.68c-.21.67-.49 1.47-.79 2.32l-.1.28q-.22.62-.42 1.14l-.36.91q-.26.65-.47 1.06c-.45.91-.67.9-.67 0a1 1 0 0 0-.61-1.16l-.34-.1c-1.12-.25-3.56-.26-8.88-.26H94.54l-.82-.06c-.38 0-.52-.1-.5-.17a2 2 0 0 1 1.19-.49 5.17 5.17 0 0 0 .68-.17 3.91 3.91 0 0 0 1-.47 2.24 2.24 0 0 0 .58-.58c.63-1 .66-3.05.6-11.18 0-6.46 0-9.1-.6-10.29a1.66 1.66 0 0 0-.44-.57 2.81 2.81 0 0 0-1.17-.49c-.36-.08-.78-.16-1.28-.26s-.66-.27-.6-.42a1.35 1.35 0 0 1 .82-.19l1.25-.07 2.47-.06h3.46c5.17 0 7.18 0 8.27-.42a2.21 2.21 0 0 0 .58-.34 5.76 5.76 0 0 0 1-1.32l.13-.19a9.25 9.25 0 0 1 .8-1.05c.32-.34.48-.34.48 0a14.67 14.67 0 0 1-.47 1.59v.11c-.22.67-.5 1.48-.8 2.33l-.08.24q-.24.66-.44 1.2l-.21.54q-.23.58-.41 1a1.41 1.41 0 0 1-.52.77.65.65 0 0 1-.51-.73.94.94 0 0 0-.67-1h-.15a18.41 18.41 0 0 0-3.58-.11l-3.67.07v8.15l2.72.07a8.76 8.76 0 0 0 3.24-.29 3.29 3.29 0 0 0 1.64-1.65l.12-.22a4.63 4.63 0 0 1 .73-1c.32-.32.57-.36.57 0 0 .07-.19.66-.47 1.49l-.07.22c-.26.76-.58 1.68-.89 2.57l-.39 1.1-.26.72-.33.89-.11.28c-.34.85-.75.76-.85-.18v-.16a1 1 0 0 0-.48-.84 1.45 1.45 0 0 0-.29-.12 8.65 8.65 0 0 0-1.88-.2c-1.46-.06-2.23-.11-2.64.26s-.46 1.4-.46 3.55c0 3.64.27 4.77 1.28 5.32.65.35 7.52.63 9 .36a3 3 0 0 0 .88-.33 5.06 5.06 0 0 0 1.73-1.62 4.66 4.66 0 0 0 .36-.65l.16-.35c.34-.67.58-.81.79-.47a5 5 0 0 1-.31 1.05zm-7.53-16a3 3 0 0 0 .34.71 2.58 2.58 0 0 0 .74.74 6.06 6.06 0 0 0-1.34 1.68 1.93 1.93 0 0 1-.72 1 7.06 7.06 0 0 1-2.48.16h-.77V90.9H107.18zm13.67 18.89a1.11 1.11 0 0 0 .18-.32c.21-.47.3-3.4.3-10.54 0-8.84 0-10-.42-10.6v-.07a2.52 2.52 0 0 0-1.6-1.08 9.21 9.21 0 0 0-1-.21 1.19 1.19 0 0 1-.93-.45 1.71 1.71 0 0 1 1-.19h6.73c5.09 0 7.25 0 8.42-.42a2.3 2.3 0 0 0 .76-.44 4.86 4.86 0 0 0 .9-1.24l.11-.18a5.87 5.87 0 0 1 .64-.92c.48-.54.81-.57.58.18-.12.4-.26.81-.39 1.22l-.05.16c-.3.91-.62 1.81-.93 2.64-.14.37-.27.72-.4 1l-.31.77c-.17.42-.33.78-.46 1.06a1.62 1.62 0 0 1-.43.69c-.21 0-.34-.27-.34-.69a.89.89 0 0 0-.59-1.07l-.31-.08a22 22 0 0 0-3.34-.13c-3.35 0-3.67 0-3.9.48a17.24 17.24 0 0 0-.28 3.67 17.24 17.24 0 0 0 .26 3.72c.22.42.53.48 2.6.48a8 8 0 0 0 3.41-.5 4 4 0 0 0 1.61-1.5c.16-.24.32-.5.48-.79l.1-.18c.27-.49.53-.72.67-.59a2.07 2.07 0 0 1-.13.88c-.07.3-.17.65-.29 1.05-.21.73-.49 1.59-.79 2.46-.14.42-.29.84-.44 1.24l-.29.76c-.13.33-.26.65-.38.94-.41 1-.88 1-.88 0a2 2 0 0 0 0-.44.87.87 0 0 0-.51-.63l-.25-.1a8.75 8.75 0 0 0-2.29-.19c-1.31 0-2 0-2.42.35s-.44 1.54-.33 4.05c.23 5 .28 5.05 6.47 5.09 3.34 0 4.08 0 4.73-.33l.35-.2a5.17 5.17 0 0 0 1.36-1.46c.07-.11.14-.22.2-.33a6.17 6.17 0 0 1 .62-1c.32-.39.53-.41.51 0a8.47 8.47 0 0 1-.37 1.34l-.1.31c-.26.77-.59 1.71-.93 2.62l-.44 1.16-.33.79c-.21.53-.4 1-.54 1.28l-.12.25a.44.44 0 0 1-.12.17c-.17.06-.32 0-.34-.1a1.6 1.6 0 0 1 0-.42 1.85 1.85 0 0 0-.35-.8l-.28-.43-15.9-.21h-.84c-.86-.05-1.13-.13-1.13-.25a1.11 1.11 0 0 1 1-.5 5.65 5.65 0 0 0 .86-.19 2.91 2.91 0 0 0 1.62-1.04zm11.34-17.42a4.16 4.16 0 0 0-.68.94 3.53 3.53 0 0 1-1.25 1.6 5.9 5.9 0 0 1-2.61.33h-.79c0-.61-.06-1.39-.06-2.19s0-1.58.06-2.18h4.4a2.81 2.81 0 0 0 .22.64 2.47 2.47 0 0 0 .71.86z"/><path class="neon-b" d="M200 72.69v-8.51M200 76v48-48m0 51.35V124m0 11.78v-8.51m0 11.73v-3.14m0 11.45V139m0 11.4v-3.09m0-83.09V5a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v190a5 5 0 0 0 5 5h190a5 5 0 0 0 5-5v-44.64M197 195a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h190a2 2 0 0 1 2 2v190z"/></svg>',
    size: 2,
    answer: {
      correct: {
        title: 'Точно.',
        text: 'Столько весят 15 альбомов группы. Фредди Меркьюри работал над музыкой до последнего — к примеру, песню The Show Must Go On он записал, когда уже не мог выступать, но умудрился вытянуть ноты в студии.'
      },
      less: {
        title: 'Нет, все песни так не послушать.',
        text: 'Группа записала в студии 15 альбомов, это полтора гигабайта. Фредди Меркьюри работал над музыкой до последнего — к примеру, песню The Show Must Go On он записал, когда уже не мог выступать, но умудрился вытянуть ноты в студии.'
      },
      more: {
        title: 'Перерасход трафика.',
        text: 'Группа записала в студии 15 альбомов, это полтора гигабайта. Фредди Меркьюри работал над музыкой до последнего — к примеру, песню The Show Must Go On он записал, когда уже не мог выступать, но умудрился вытянуть ноты в студии.'
      }
    }
  }, {
    text: 'В интернете популярен ролик, где герой из «Властелина колец» десять часов машет головой под саксофон.',
    title: 'Сколько трафика уйдёт на его просмотр?',
    notice: 'В качестве 720p.',
    img: '<svg width="174.31" height="200" viewBox="0 0 174.31 200"><path class="neon-a" d="M67.37 57.97a23.47 23.47 0 0 0 3.44-2.56c2.4-2.18 2-3.65 1.36-6.71-.44-2.13-.71-4.25-1.36-6.44-.93-2.89 1.64-3.82 3.76-5.24 1 1.75 2 3.38 2.78 5.07s1.42 3.54 2.13 5.34l.55-.16c-1-4-2.07-8.07-3.11-12.16 2.29-1.2 3.05-1 4.25 1.42.76 1.53 1.36 3.11 2 4.69.49 1 .93 2.13 1.42 3.16l.55-.16a8 8 0 0 0-.21-2.31c-.93-2.78-2-5.45-3.05-8.18-.71-1.75-.38-2.24 1.42-2.62a33.26 33.26 0 0 0 4.47-1.53c1.58-.33 2.4.76 3.27 2.24a28.88 28.88 0 0 0 3.65 4.53 3.81 3.81 0 0 0 .55-.44c-2-2.78-2.18-6.82-5.62-8.4 3.38-3.44 8.73-1.58 12.22-4.8.16-.22.82.16 1.25.22.6.05 1.25.05 1.91.11a7.13 7.13 0 0 0 .07-1.83c-.6-1.8.38-1.75 1-1.75.82 1.8 1.2 3.38 2.18 4.47.33.38 2.35-.11 3-.76s.44-2.07.71-3.55c3.76-.16 8-.44 12.54-.65-3.76-1.85-7.42-2.78-11.4-1.64a2.31 2.31 0 0 1-1.2.11c-1.42-.44-2.67-.33-3.38 1s.38 2.29 1.25 3.16a1.7 1.7 0 0 1 .27.55.91.91 0 0 1-.38.49c-2.56.65-1.31-1.42-1.69-2.35-.33-.76-.76-2-1.09-2a6.88 6.88 0 0 0-3.11.93c-.38.22-.38 1.09-.55 1.64-.05-.16-.16-.33-.22-.49-1.15.38-2.29.76-3.38 1.2a6.5 6.5 0 0 1-.87.44c-2 .38-4 .55-5.94 1a23.46 23.46 0 0 0-2.84 1.47c-2 .93-4.2 1.64-5.62 3.65a1.8 1.8 0 0 1-1.15.22c-2.62.11-4.25 1.31-4.47 4-3 0-4.14.65-4.74 2.24-2.24 1.2-4.2 1.8-5.51 3.11-.76.71-.44 2.51-.55 3.44-1.15.82-2.13 1.58-3.22 2.24a2.6 2.6 0 0 1-1.36.49c-3-.11-3.76.65-4.09 3.71a2.81 2.81 0 0 1-1.31 1.58c-.93.6-2.35.76-2.95 1.58s-.38 2.07-.55 3.22c-2.45-1.09-5-2.29-7.85-3.54a3.09 3.09 0 0 0 .55 1.2c2 2 4 4 6.22 5.78s2.67 2.73 1.58 5.4a10.12 10.12 0 0 1-1.36 2.51 7.71 7.71 0 0 1-2 1.36c-.38-.76-.76-1.58-1.25-2.62.82.11 1.15.11 1.47.16a1.62 1.62 0 0 1 .55-.55 3.64 3.64 0 0 0-1.31-1 2 2 0 0 0-1.25 1 3.38 3.38 0 0 0 1 4.25c1.42 1.2 2.84.71 4.09-.27 3.48-2.85 4.18-7.73 1.9-10.73.44-1.85.71-3.27 1.09-5 2.67-.27 5.13-1.42 4.53-4.69 1.64-.71 2.89-1.31 4.2-1.91a6.55 6.55 0 0 1 1.69-.71c1.69-.27 2.56.87 1.91 2.45a7.3 7.3 0 0 0-.82 1.58 2.1 2.1 0 0 0 .55 1.53c2.18.16 1.42 1.36.82 2.35-1.1 1.92-2.25 3.66-3.39 5.46zM31.32 169.4a1.89 1.89 0 0 0-1.31-1.25c-2.4.33-3.33-2.29-5.73-2.07a12.25 12.25 0 0 1 1-1.58 17.44 17.44 0 0 0 2.45-2.45c.38-.6.11-1.58.11-2.4a10.88 10.88 0 0 0-1.91.49 10.78 10.78 0 0 0-1.69 1.2c-2.56-3.16-1.64-6.87-1.64-10.36l-1.09-.33c-.38.65-.76 1.25-1.15 1.91s-.65 1.36-1 2.07a10 10 0 0 1-.93-3.82c-.16-4.69.11-5 4.31-5.56.05 0 .16-.16.11-.11-.38-1.31-1.31-2.67-1.09-3.76.6-3.16.65-3.33-2.45-4.36a3.09 3.09 0 0 1-1.75-1.15c-1.09-2 0-3.76 2.56-4 1.64-.16 2-1 1.8-2.24s-.82-2.29-2.45-1.47a1 1 0 0 1-.87-.16 1.09 1.09 0 0 1-.05-.93c.6-1.64 1.25-3.27 2.07-5.35.38 1.8.33 3.49 1.15 4.69s2.45 1.85 3.71 2.78a9.74 9.74 0 0 0-1.41-2.12c-.49-.71-1.25-1.53-1.15-2.24.27-2.29-.71-3.93-2.13-5.51a3.06 3.06 0 0 1-.82-2.29 31.09 31.09 0 0 1 1.69-4.58 5 5 0 0 1 1.2.49 8.06 8.06 0 0 1 .76.65c-2.18 1.2-2 1.09-.55 3.05a48.52 48.52 0 0 1 3.77 6.27 7.17 7.17 0 0 1 .6 2.18c1.53-1.85.38-3.38-.27-4.85a45.52 45.52 0 0 0-2.73-4.69c1.91-.44 2.35-1.25 1-2.67a19 19 0 0 0-2.95-2.07 3.23 3.23 0 0 1-1.31-1.25 2.11 2.11 0 0 1 .93-1.42 21.77 21.77 0 0 1 2.62-1c1.75-.6 2.13-1.36 1.09-2.84-1.42-2-1.09-3.71.27-5.4.82-1 1.8-2 2.78-3-5.07 1.8-6.54 4.14-5.73 9.16a6.6 6.6 0 0 1-.93.38c-3.05 1.31-3.6 2.35-3.27 5.62a3.84 3.84 0 0 1-.38 2.35c-1.69 2.73-1.53 5.73-1.47 8.73a5.63 5.63 0 0 1-.6 2.89c-1.69 2.62-1.64 3.33 1 5.18a11.12 11.12 0 0 1 .93.82c-1.8.65-3.54 1.14-3.49 3.38.05 3.05 1.69 4.85 4.53 5.24a11.5 11.5 0 0 0 .65 3.11 13.27 13.27 0 0 0 2.13 2.34c-.65-.16-1-.33-1.42-.38-2.73-.55-3.82.16-4.58 2.89-.93 3.16-.05 6.05 1.53 8.78a2.05 2.05 0 0 0 1.42 1c1.75 0 1.85 1.14 2.07 2.4.49 2.78 1.58 3.55 4.47 2.84a13.41 13.41 0 0 0-1.78 2.28 2.1 2.1 0 0 0 .11 1.91c1.69 1.26 3.55 2.29 5.51 3.55-1 1.47-.16 2.62 1.42 3.49a7.56 7.56 0 0 1 1.14 1.05l4 3.33a20.18 20.18 0 0 0-2.89-5.62c-.83-.99-2.17-1.53-1.92-3.22zM170.01 75.32c.38-1.75 1.36-3.38 1.53-5.13a26.48 26.48 0 0 0-1.09-11.28c-.6-1.69-.93-3.55-1.47-5.29a4.26 4.26 0 0 0-.82-1.2 1.9 1.9 0 0 1-.16 1.15c-1.47 1.75-.93 3 .55 4.58 1.2 1.25 1.8 3.11 2.62 4.69l-.76.44c-4.8-3.76-7-9.44-10.2-14.4 2 5.24 4.31 10.25 6.6 15.27.76 1.58 1.91 3.16 2.13 4.8.55 4.2-1.25 7.8-3.55 11.56-1-2-1.91-3.6-2.73-5.34-.76-1.58-1.36-3.27-2.07-4.91 1.31 6.11 2.51 12.22 6.38 17.13-.82.6-1.42 1.09-2 1.58a9.06 9.06 0 0 1-1.47 1.42c-1.53.87-1.85 1.91-.87 3.33.44.65.93 1.25 1.42 1.85l-.16.65h-3.32c-2.07 0-2.4.55-1.47 2.45.6 1.25 1.36 2.35 2.07 3.54a1 1 0 0 1-.27.22c-1-.76-1.91-1.47-2.73-2.07-2.51 1.36-2.07 3.49-1.64 5.45a6.35 6.35 0 0 1-1.14 5.56c-1.25 1.58-2.29 3.27-3.38 4.91a13.89 13.89 0 0 0 3.16-2.67c1.31-1.64 3.05-3.16 3.6-5s-.22-4.09-.44-6.38a9 9 0 0 1 1.47 1.15c1.8 2.07 2.24 4.58 2.18 7.25v6c.27.06.6.06.87.11a57.91 57.91 0 0 0 1.32-6.83c.16-2.73-1.91-5.13-1.36-8.13.22-1-1.2-2.24-1.69-3.05a16.16 16.16 0 0 0 4.2-2.18c2-1.75-.06-3.05-1-4.31 1.75-1.25 3-2.89 5.07-3.38a1.21 1.21 0 0 0 .71-.87c-.65-2.07.33-4.53-1.69-6.27a2.87 2.87 0 0 1-.76-2.18 7 7 0 0 0 2.36-4.22zM123.07 165.3c.65-.82 1-1.31 1.42-1.85 1.47-2.13 2.56-4.42 1.64-7a3 3 0 0 0-1.8-1.91 2.77 2.77 0 0 0-2 1.58 15.07 15.07 0 0 0-1.25 5.07c-.05 2.18-1.2 2.94-2.95 3.49a2.5 2.5 0 0 0-2.18 2.51c-.16 2.4-2.51 3.82-5 3.49a2.64 2.64 0 0 0-2.13 1.09c-.6 2.95-2.73 4.64-4.75 6.44-.87.82-2.13 1.14-3.55 1.85-2.35-1.42-3.27-1.09-5.07 2.94-.49 1.09-1.15 2.13-1.69 3.22-.16-.16-.33-.38-.49-.54-.76.38-1.91.6-2.13 1.2-.7 2.03-2.07 2.59-4.07 2.2a5 5 0 0 0-2 .05 1.89 1.89 0 0 0-1.2.82c.22 2.73-2.07 3.33-3.71 4.42a2 2 0 0 1-2-.44c-1.15-1.85-2.13-1.2-3.49-.27a32.89 32.89 0 0 1-4.36 2.25c1.64 1.91 3.65.65 5.62-.33 3.22 3.22 8.73.71 11-5 2.14.68 4.14.58 5.14-1.67a.63.63 0 0 1 .44-.33c2.95.49 3.49-2 4.58-3.76.55-1 1-2 1.47-3.05 3.22 2 3.22 2 5.89-.55.93-.87 1.91-1.2 2.84-.16s1.75.93 2.62-.33l-2.13-2.29a21.36 21.36 0 0 0 2.56-3 3.1 3.1 0 0 1 2.51-1.64 6.82 6.82 0 0 0 5.56-4.58 3.64 3.64 0 0 1 2.84-2.67c3.87 3.16 5.56 1.36 9.11-3.87-2.35.99-4.15 3.12-7.29 2.62zm.22-8.51a3.37 3.37 0 0 1 1.09-1.25 3.47 3.47 0 0 1 .71 1.64 40.9 40.9 0 0 1-1.74 4.25c-.27-.11-.55-.16-.82-.27a38.45 38.45 0 0 1 .74-4.36zM168.21 52.41c-.33-2.07-.6-4.14-.87-6.22-.27 0-.49.05-.76.05a12.26 12.26 0 0 0 .05 3.16 13.2 13.2 0 0 0 1.58 3.01z"/><path class="neon-b" d="M172.81 57.04c-3.93-13.58-8.24-26.47-18.29-36.74-8.45-8.71-18.24-15.39-30.05-18.66-.67-.18-1.34-.34-2-.49l-.57-.12-1.62-.33-.41-.08a27.68 27.68 0 0 0-4.65-.59c-3.17-.1-6.77.06-9 .17-9.47.46-18.15 4.01-26.35 8.34C57.73 20.3 39.76 36.91 25.7 57.68q-1.68 2.47-3.22 5-.77 1.27-1.5 2.56a146.38 146.38 0 0 0-10.8 24.25c-1.3 3.72-2.5 7.49-3.62 11.29-4.28 14.55-7.12 29.31-6.49 44.55a44.86 44.86 0 0 0 7.75 24.44c8.82 12.83 20.91 21.34 35.45 26.52a61 61 0 0 0 28.56 3.21 75.13 75.13 0 0 0 19.84-5.88 116.07 116.07 0 0 0 33.21-21.23c15.83-14.44 29.5-30.66 38.45-50.21 13.74-30.04 11.45-58.27 9.48-65.14zM11.32 168.59c-4.44-4.76-6.42-11-7.33-17.49-1.82-12.35-.16-24.49 2.46-36.52 4-18.13 9.89-35.61 19.73-51.44 13.8-22.09 32.46-39.23 55.29-51.77 4.92-2.73 10.32-4 15.83-4.65a20.08 20.08 0 0 1 11.77 2.46 62.64 62.64 0 0 1 23 20.11c.11.21.21.43.54 1-7.22-1.12-13.9.11-20.53 2.14a98.42 98.42 0 0 0-13.51 5 93.35 93.35 0 0 0-8.42 4.48 91.33 91.33 0 0 0-11.78 8.23A125.61 125.61 0 0 0 54.2 76.72c-10 14.71-17.33 30.59-21 48-1.93 9-3.15 18.18-2.19 27.43.91 8.93 3.42 17.32 9.73 24.12a5.26 5.26 0 0 1 .7 1c-11.46 1.26-22.05-.07-30.12-8.68zm34.38 6.58c-5.78-5.08-8.61-11.76-9.89-19.14-2.25-13.1-.43-25.94 3.26-38.5 7.27-24.82 20.43-46.1 39.89-63.27 11.18-9.89 23.9-17.11 38.72-20.16a39.7 39.7 0 0 1 15.08-.64 3.56 3.56 0 0 1 2.89 2.57 55.27 55.27 0 0 1 3.37 21.23 117.74 117.74 0 0 1-14.22 54.06c-10.17 19.09-23.73 35.45-41.4 48.12a102.51 102.51 0 0 1-34.87 16.47 2.67 2.67 0 0 1-2.83-.74zm117.91-65.46c-5.28 17-15.61 31.34-27.43 44.54-.88 1-1.75 2-2.62 3l-2.14 2.42-.69.76q-.87 1-1.76 1.9l-.75.78c-.82.84-1.65 1.66-2.51 2.46a154.48 154.48 0 0 1-31.19 22.54q-3.11 1.64-6.28 3a68.55 68.55 0 0 1-16.46 5q-1.71.28-3.46.46c-7.43.75-14.65-.48-21.71-2.67q-1.8-.56-3.54-1.2c-.38-.14-.74-.3-1.12-.44-.78-.3-1.57-.6-2.33-.93-.47-.2-.92-.43-1.39-.64-.66-.3-1.32-.59-2-.9-.49-.24-1-.51-1.46-.76s-1.21-.62-1.81-.95-1-.57-1.45-.86-1.15-.66-1.71-1-.94-.63-1.42-.94-1.11-.72-1.66-1.11-.89-.66-1.34-1-1.1-.8-1.64-1.23-.84-.69-1.25-1-1-.81-1.51-1.24l-.23-.21c-.16-.16-.32-.37-.43-.48l.75.18h.18l1 .27 1.53.45h.07l2.24.6 1 .27c1 .24 1.9.47 2.86.66 6.15 1.12 12.3.32 18.29-1 19.95-4.44 37-14.44 51.55-28.45 19.49-18.69 33.28-40.83 40.28-67.08a110 110 0 0 0 3.74-26.68c.16-11-1.39-21.66-7.49-31.23q-.72-1.09-1.45-2.09c-.17-.23-.35-.46-.52-.69-.33-.44-.66-.89-1-1.32-.21-.27-.44-.52-.66-.79s-.63-.77-1-1.15-.49-.53-.74-.8-.65-.71-1-1.05-.54-.53-.8-.79l-1-1c-.34-.34-.57-.51-.86-.77s-.68-.61-1-.91-.6-.49-.91-.73-.71-.58-1.07-.86l-1-.7c-.37-.27-.73-.54-1.11-.8l-1-.66c-.38-.25-.76-.5-1.14-.74l-1-.62-1.14-.62-1.07-.58-1.21-.63-1.1-.53-1.24-.57-1.14-.48-1.27-.51-1.17-.43-1.3-.46-1.2-.38-1.31-.43-1.22-.33c-.62-.16-1.25-.33-1.88-.47.33-.09.68-.17 1.05-.24h.06l.68-.12.3-.05 1.17-.16h.21l1-.09H113.3l.77.03.64.05.8.07.64.07.8.09.62.08.8.12.61.1.79.14.57.11.8.17.52.11.85.21.43.11c.41.11.81.23 1.2.36 19.52 6.36 33.15 19 40.21 38.34a112.37 112.37 0 0 1 5.41 20.3c.11.66.2 1.33.27 2 0 .22 0 .43.06.65 0 .46.08.91.11 1.37v2.87c.07-.03 1.02 14.49-6.59 38.91z"/></svg>',
    size: 5,
    answer: {
      correct: {
        title: 'Идеально.',
        text: 'Десятичасовые ролики действительно популярны на YouTube. Странно, что есть люди, которые не только досматривают, но и снимают на них десятичасовые реакции.'
      },
      less: {
        title: 'Нет, это почти пять гигабайт.',
        text: 'Так можно пропустить важный момент в конце. Десятичасовые ролики действительно популярны на YouTube. Странно, что есть люди, которые не только досматривают, но и снимают на них десятичасовые реакции.'
      },
      more: {
        title: 'Многовато.',
        text: 'Там было всего пять гигабайт — можно было бы приступить к ещё одному десятичасовому ролику. Странно, что есть люди, которые не только досматривают, но и снимают на них десятичасовые реакции.'
      }
    }
  }, {
    text: 'Джордж Лукас, отец «Звёздных войн» снял далеко не все фильмы киносаги.',
    title: 'Сколько трафика уйдёт на просмотр фильмов с его режиссурой?',
    notice: 'Если на каждый фильм нужно 1,5 гигабайта.',
    img: '<svg width="182.91" height="200" viewBox="0 0 182.91 200"><path class="neon-a" d="M78.63 25.64A27.35 27.35 0 1 0 105.98 53a27.39 27.39 0 0 0-27.35-27.36zm0 51.28A23.93 23.93 0 1 1 102.56 53a24 24 0 0 1-23.93 23.92z"/><path class="neon-a" d="M78.63 42.74A10.26 10.26 0 1 0 88.89 53a10.27 10.27 0 0 0-10.26-10.26zm0 17.09A6.84 6.84 0 1 1 85.45 53a6.84 6.84 0 0 1-6.82 6.83z"/><path class="neon-b" d="M181.19 128.21h-32.48v-26.5h15.38a1.71 1.71 0 0 0 1.71-1.71V71.79h15.38a1.71 1.71 0 0 0 1.71-1.71V53a1.71 1.71 0 0 0-1.71-1.71h-23.92V29.06h8.77a1.71 1.71 0 0 0 1.59-1.1 1.7 1.7 0 0 0-.44-1.87 100 100 0 1 0 0 147.82 1.7 1.7 0 0 0 .44-1.87 1.71 1.71 0 0 0-1.59-1.1h-8.77v-13.67h23.93a1.71 1.71 0 0 0 1.71-1.71v-25.65a1.71 1.71 0 0 0-1.71-1.7zM3.63 95.67v-.06a95.82 95.82 0 0 1 10.45-39.52l.72-1.39h21.1a1.71 1.71 0 1 0 0-3.42H16.56l2.59-4a96.26 96.26 0 0 1 136.53-26.07l4.12 2.93-4.8 1.6a1.71 1.71 0 0 0-1.16 1.62v23.92h-15.39a1.71 1.71 0 1 0 0 3.42h41v13.68H164.1a1.71 1.71 0 0 0-1.71 1.71v28.2H3.63v-2.62zm175.82 58.18h-23.9a1.71 1.71 0 0 0-1.71 1.71v17.09a1.71 1.71 0 0 0 1.16 1.62l4.8 1.6-4.12 2.93a96.26 96.26 0 0 1-136.53-26.11l-2.59-4h27.89a1.71 1.71 0 1 0 0-3.42H14.79l-.72-1.39a95.81 95.81 0 0 1-6.92-17.56l-.93-3.26h55.32a1.71 1.71 0 0 0 0-3.42H5.45l-.39-2.1a96.55 96.55 0 0 1-1.46-13.17l-.12-2.68H145.3v26.5h-23.94a1.71 1.71 0 0 0 0 3.42h58.09v22.23z"/></svg>',
    size: 6,
    answer: {
      correct: {
        title: 'Всё верно, всего четыре фильма.',
        text: 'Снимать кинофантастику в докомпьютерную эру было крайне тяжело. Работа над первым фильмом саги настолько утомила режиссёра, что после неё он не снимал 22 года, но затем срежиссировал три эпизода оригинальной трилогии.'
      },
      less: {
        title: 'Нет, нужно было шесть гигабайт.',
        text: 'Всего таких фильмов четыре. Джорджа Лукаса настолько утомила съёмка первого эпизода, что после него он не снимал 22 года. Затем Лукас вернулся в режиссёрское кресло, чтобы снять оригинальную трилогию.'
      },
      more: {
        title: 'На них бы ушло шесть гигабайт.',
        text: 'Джорджа Лукаса настолько утомила съёмка первого эпизода, что после него он не снимал 22 года. Затем Лукас вернулся в режиссёрское кресло, чтобы снять три эпизода оригинальной трилогии.'
      }
    }
  }, {
    text: 'Шоу Юрия Дудя обрело популярность в том числе и благодаря его интервью с рэперами (рилток).',
    title: 'Сколько трафика нужно, чтобы посмотреть все такие выпуски?',
    notice: 'Передача с рэпером весит в среднем 260 мегабайт.',
    img: '<svg width="320.54" height="180" viewBox="0 0 320.54 180"><path class="neon-a" d="M0 180v-17.5h12.43c8.35 0 17 0 25.48.06 1.8 0 2.42-.27 3-2.06C56.76 111.27 72.45 62.76 91.15 5.08c.11-.34.24-.69.39-1.11s.31-.87.52-1.47l.87-2.5 1.34 3.4c.41 1 .73 1.83 1 2.65q9.58 27.69 19.19 55.45 14.72 42.51 29.42 85c.58 1.68 1.17 3.35 1.76 5 1.08 3.06 2.2 6.23 3.21 9.37.43 1.37.94 1.73 2.49 1.73l76.12-.05 74.76-.05h10.29l.29.28a1.39 1.39 0 0 1 .35 1.07v1.01l-26.58 1.29-285.54 13.8zm2-15.54v13.49l277-13.41h-51.53l-76.12.05c-2.4 0-3.66-.9-4.35-3.09-1-3.11-2.12-6.26-3.19-9.31-.59-1.68-1.19-3.35-1.77-5q-14.69-42.53-29.42-85Q102.99 34.4 93.4 6.67c-.11-.34-.23-.69-.36-1v.08C74.32 63.37 58.6 111.86 42.79 161.11c-.95 2.85-2.51 3.4-4.89 3.4-8.51-.08-17.13-.07-25.47-.06H1.96zm142.28-.6h-98l.54-1.34 19.25-48.09c8.65-21.6 17.32-43.26 26.06-65.12l.86-2.16.94 2.13c17.5 39.67 34.88 79.24 49.8 113.21zm-95.15-2h92.16c-14.51-33.05-31.31-71.28-48.25-109.71q-12.68 31.71-25.2 62.96z"/><path class="neon-b" d="M267.39 149.6h-78.15v-1-2.56c0-2.5 0-5.08.06-7.62 0-1.1 1.62-2 2.49-2.12a37.23 37.23 0 0 1 6.6 0 2.76 2.76 0 0 0 1.94-.23 3.14 3.14 0 0 0 .45-2.11c-.18-19.1-.1-38.41-.05-57.1a28.77 28.77 0 0 1 6.69-18.84c6-7.19 14.33-11 22.92-10.39s16.46 5.55 21.47 13.6a28.51 28.51 0 0 1 4.37 15.21v57.12c0 .85-.05 1.68-.05 2.76h11.27v13.28zm-76.19-2h74.23v-9.37h-11.27v-1c0-1.62 0-2.7.05-3.79v-57a26.58 26.58 0 0 0-4.07-14.18c-4.66-7.5-11.93-12.12-19.94-12.67s-15.69 3-21.27 9.69a26.86 26.86 0 0 0-6.24 17.58c-.05 18.68-.11 38 .05 57.11a4.66 4.66 0 0 1-1.1 3.57 4.41 4.41 0 0 1-3.45.72 35.41 35.41 0 0 0-6.24 0 1.88 1.88 0 0 0-.7.41c-.07 2.47-.06 5-.05 7.37v1.59zm.05-9.17s.01.06.01.04zm53.16-.3h-31.63l-.14-1a14.94 14.94 0 0 1-.2-2.15v-19.56-39.16a16.24 16.24 0 0 1 6.05-12.68 15.82 15.82 0 0 1 13.3-3.23c7 1.47 12.58 8.6 12.63 16.23v61.56zm-29.94-2h28v-15-14.85-29.7c0-6.74-4.92-13-11.08-14.33a13.87 13.87 0 0 0-11.66 2.84 14.29 14.29 0 0 0-5.32 11.16V134.96a9.31 9.31 0 0 0 .07 1.25zM2.94 149.86a2.69 2.69 0 0 1-2-.66 3.31 3.31 0 0 1-.71-2.61v-91.2c-.05-.88-.05-1.88-.05-3.15v-1h1c11.88.31 24.26 1.78 34.43 10.44 4.47 3.8 7.69 10.69 8.21 17.54a23.54 23.54 0 0 1-4.94 16.74 25.22 25.22 0 0 1 7.09 12.41 43.38 43.38 0 0 1 .16 19.79c-2.69 11.7-12.53 19.8-25.76 21.12-3.65.35-7.37.38-11 .42-2 0-4.13 0-6.2.12h-.23zm-.76-96.61c0 .8 0 1.45.05 2.09v91.25a2.86 2.86 0 0 0 .11 1.17 1.26 1.26 0 0 0 .78.11c2.1-.08 4.22-.1 6.26-.12 3.55 0 7.22-.07 10.79-.41 12.32-1.23 21.55-8.74 24.09-19.6a41.44 41.44 0 0 0-.15-18.88 23.43 23.43 0 0 0-7.19-12.06l-.7-.64.63-.72a21.53 21.53 0 0 0 5.06-16c-.48-6.35-3.43-12.71-7.52-16.19-8.94-7.66-19.37-9.59-32.21-10zm10 84.95V64.7h1c8.08.16 16.08 5.59 18.23 12.3 2.61 7.84.12 13.4-9.55 20.83l.24.15c1.16.7 2.37 1.42 3.48 2.18a22 22 0 0 1 9.93 19.25c-.12 7.94-4 13.48-11.18 16a50.22 50.22 0 0 1-7.29 1.76c-1.2.23-2.42.46-3.67.74zm2-71.46v69l2.54-.49a48.8 48.8 0 0 0 7-1.68c6.44-2.28 9.77-7.06 9.87-14.21.1-7.5-2.87-13.26-9.09-17.62-1.06-.73-2.23-1.43-3.37-2.11l-1.5-.9-1.24-.76 1.17-.86c9.91-7.34 12.44-12.27 10-19.53-1.84-5.72-8.48-10.3-15.42-10.85zM153.17 153.19h-2.39v-13.5l.88-.09 2.87-.27c1.58-.14 3.07-.28 4.58-.47 9.33-1.22 12.89-5.17 13.15-14.55v-2.41-.32l-2.37-.37a47.27 47.27 0 0 1-6.28-1.23c-13.81-4-23.83-16.6-24.37-30.66-.3-8.54-.23-17.24-.17-25.65 0-3.7.06-7.41.06-11.14v-1h13.23l.05.93c.05 1 .11 2 .11 2.89V86.6c.05 10.39 9.12 20 19 20.24a5 5 0 0 0 .55 0V51.48h13.6v72.87c0 11.45-3.51 19-11 23.75-6.79 4.34-14.58 5.09-21.5 5.09zm-.43-2c6.73.05 14.36-.62 20.88-4.82 6.91-4.36 10.13-11.38 10.13-22.1V78.32v-25h-9.69v55.05l-.83.13a11.06 11.06 0 0 1-1.7.17c-10.93-.11-20.93-10.68-20.93-22.07V65.76 55.34c0-.59 0-1.22-.06-1.85h-9.42c0 3.41 0 6.8-.06 10.18-.07 8.39-.13 17.08.16 25.57.51 13.22 10 25.09 23 28.85a45.72 45.72 0 0 0 6 1.17c1.06.16 2.14.32 3.23.52l.81.15V124.37c-.28 10.31-4.58 15.08-14.85 16.42-1.55.2-3.06.34-4.66.48l-2 .18v9.79zM278.45 149.6c-1.36 0-2.67-.05-3.9-.16l-.89-.08v-.9c-.05-31.84-.05-64.46-.05-96v-1h13.44v28l2.07.29a38.33 38.33 0 0 1 5.23.94c10.59 2.8 18.79 9.58 23.08 19.08a35.74 35.74 0 0 1-.78 30.81 31.17 31.17 0 0 1-8.48 9.88c-7.91 6.47-20.18 9.14-29.72 9.14zm-2.84-2c9.45.6 23-1.78 31.32-8.56a29.27 29.27 0 0 0 8-9.24 34.25 34.25 0 0 0 .75-29.14c-4-9-11.79-15.35-21.81-18a37 37 0 0 0-5-.89c-1-.13-1.95-.26-3-.43l-.82-.14V53.43h-9.45v94.12zm9.69-10V92.41h1a21.08 21.08 0 0 1 18.3 9.38c5.31 7.55 5.56 15.92.74 24.19-4.16 7.24-10.54 11.11-19 11.49zm2-43.15v41.08A19.85 19.85 0 0 0 303.6 125c4.42-7.57 4.19-15.2-.65-22.08a19 19 0 0 0-15.69-8.55z"/></svg>',
    size: 4,
    answer: {
      correct: {
        title: 'В десятку.',
        text: 'Всего на канале «вДудь» 16 интервью с рэперами. Теперь вы знаете, что сказал бы каждый, оказавшись перед президентом.'
      },
      less: {
        title: 'Нужно было около четырёх гигабайт.',
        text: 'Всего на канале «вДудь» 16 таких интервью. За бортом оказалось несколько рэперов, но неизвестно, потеряли ли вы что-то, не посмотрев их.'
      },
      more: {
        title: 'Это больше, чем нужно.',
        text: 'Всего на канале «вДудь» 16 таких интервью, на них уйдёт около четырёх гигабайт трафика. Возможно, скоро их станет гораздо больше.'
      }
    }
  }, {
    text: 'Разговор с обеими бабушками в Skype занял один час, ещё час они не могли на вас наглядеться, и потом полчаса прощались.',
    title: 'Сколько трафика ушло на этот сеанс групповой видеосвязи?',
    notice: '',
    img: '<svg width="200" height="200" viewBox="0 0 200 200"><path class="neon-b" d="M120.31 194.61a55.22 55.22 0 0 0 23.93 5.39h.48A56 56 0 0 0 200 144.62a55.25 55.25 0 0 0-5.36-24.26 14.27 14.27 0 0 1-1.28-8 95.14 95.14 0 0 0 .78-13.94 93.6 93.6 0 0 0-15.91-50.61A1.951 1.951 0 1 0 175 50a89.72 89.72 0 0 1 15.25 48.51 91.38 91.38 0 0 1-.75 13.37 18.15 18.15 0 0 0 1.62 10.12 51.37 51.37 0 0 1 5 22.56 52.08 52.08 0 0 1-51.43 51.51h-.43a51.41 51.41 0 0 1-22.27-5 17.25 17.25 0 0 0-7.48-1.67 18.33 18.33 0 0 0-2.43.16A90.31 90.31 0 0 1 10.53 88.16 17.56 17.56 0 0 0 9 78.2a51.37 51.37 0 0 1-5.1-22.74A52 52 0 0 1 55.54 3.89h.33A51.12 51.12 0 0 1 78.19 9 17.9 17.9 0 0 0 86 10.77a18 18 0 0 0 2.31-.15A91.39 91.39 0 0 1 100 9.87h1.62a89.71 89.71 0 0 1 48.63 15.34 1.95 1.95 0 1 0 2.2-3.21 93.58 93.58 0 0 0-50.74-16H100a95.26 95.26 0 0 0-12.21.79 14.11 14.11 0 0 1-1.8.12 14 14 0 0 1-6.13-1.4A55.21 55.21 0 0 0 55.76 0h-.24A55.93 55.93 0 0 0 0 55.43a55.22 55.22 0 0 0 5.48 24.45 13.69 13.69 0 0 1 1.19 7.76 95.09 95.09 0 0 0-.83 12.49A94.15 94.15 0 0 0 100 194.29a95.07 95.07 0 0 0 12.59-.84 14.43 14.43 0 0 1 1.91-.13 13.39 13.39 0 0 1 5.81 1.29z"/><path class="neon-a" d="M166.52 36.35a1.92 1.92 0 0 0 .56-1.38 2 2 0 0 0-.58-1.39 1.95 1.95 0 0 0-2.77 2.73l.06.06a1.9 1.9 0 0 0 1.34.54 1.94 1.94 0 0 0 1.39-.56zM147.78 141.63c5.56-8.87 6.56-18.64 2.82-27.51-8.48-20-30-24.78-50.82-29.39-3.4-.75-6.89-1.53-10.3-2.36-8-1.92-12.19-5.68-11.61-10.32.91-7.23 11-12.26 19.41-12.26h.37c10.39.19 17.72 6.53 24.19 12.12 4.6 4 8.57 7.41 12.7 7.41a7.77 7.77 0 0 0 .94-.06 13.66 13.66 0 0 0 11.06-9.71c2-6.52-.81-13.61-7.62-19.45-11.54-9.85-24.81-14.43-41.76-14.43-3 0-6.13.15-9.36.44a45.28 45.28 0 0 0-25.67 10.5c-7.67 6.7-12.25 16.06-13.25 27.06s4.18 20.44 15 27.71C75.27 109 89.15 111.93 96.42 113c10 1.47 22.42 5.34 24.65 11.4.92 2.5 0 5.42-2.88 8.67-3.64 4.15-9.09 6.34-15.77 6.34a41.5 41.5 0 0 1-19.65-5.31 30.69 30.69 0 0 1-5.26-5c-4.33-4.74-9.69-10.62-17.22-10.62h-.95A12.8 12.8 0 0 0 48 127c-2.4 6.74.35 14.69 7.36 21.28 10.56 9.88 21.72 16 44.69 16 2.37 0 4.89-.07 7.5-.2h.05c16.4-.84 32.17-9.66 40.18-22.45zm-40.43 18.61c-2.58.13-5.07.2-7.4.2-21.61 0-32.06-5.73-41.93-15-5.85-5.49-8.23-11.89-6.36-17.13a9 9 0 0 1 7.94-6h.67c5.83 0 10.16 4.75 14.36 9.34a32.77 32.77 0 0 0 6.09 5.72 46.52 46.52 0 0 0 17.65 5.68 38.33 38.33 0 0 0 4.17.24c7.86 0 14.11-2.59 18.59-7.69 3.78-4.34 5-8.69 3.6-12.58-3.56-9.59-22.13-13.02-27.73-13.87-11.81-1.75-23.07-5.76-30.9-11C56.35 91.64 51.86 83.52 52.75 74c2.1-22.91 19.66-32.6 35.41-34 3.19-.29 6.28-.44 9.19-.44 15.84 0 28.25 4.29 39.05 13.51 5.67 4.86 8 10.31 6.43 15.37a9.86 9.86 0 0 1-7.8 7h-.44c-2.53 0-5.67-2.55-10.17-6.44-6.29-5.44-14.88-12.87-26.69-13.08h-.4a28 28 0 0 0-15.57 4.61c-4.4 3-7.22 7-7.73 11.06a10.67 10.67 0 0 0 1.47 6.71c2.21 3.66 6.61 6.3 13.07 7.86 3.46.84 7 1.62 10.37 2.37 20.77 4.6 40.38 8.94 48.07 27.11 4.14 9.82.91 18.43-2.54 23.93-7.24 11.58-22.17 19.88-37.12 20.67zM21.28 53.44a2 2 0 0 0-1.94 1.91v.12a1.95 1.95 0 1 0 1.94-2.03zM55.54 23.15a1.95 1.95 0 0 0 0-3.89 36.6 36.6 0 0 0-32.88 21.15A2 2 0 0 0 23.6 43a1.92 1.92 0 0 0 .82.18A2 2 0 0 0 26.19 42a32.69 32.69 0 0 1 29.35-18.85z"/></svg>',
    size: 3,
    answer: {
      correct: {
        title: 'Точно.',
        text: 'Вы узнали, как у них дела, рецепт оладушек и пару неизвестных слов.'
      },
      less: {
        title: 'Нет, трафика не хватило.',
        text: 'Разговор оборвался на рецептах оладушек. Более того, бабушки не получили особого удовольствия, ведь им не удалось с вами попрощаться. Нужно было около трёх гигабайт.'
      },
      more: {
        title: 'Потратили больше, чем нужно.',
        text: 'На разговор ушло бы около трёх гигабайт трафика. Можно было бы и дедушку подключить, но он недолюбливает Skype.'
      }
    }
  }, {
    text: 'В 2015 году орбитальный телескоп «Хаббл» снял гигантскую фотографию галактики Андромеды. Разрешение снимка составляет 69536 x 22230 пикселей. Это 600 HD-телевизоров.',
    title: 'Сколько трафика нужно на его изучение?',
    notice: '',
    img: '<svg width="199.97" height="200" viewBox="0 0 199.97 200"><path class="neon-b" d="M120.36 40.32a44.39 44.39 0 0 0-29.31 5.23c-9.32 5.44-16.26 14.38-20.06 25.94-4.66 14.37-3 27.71 4.25 37.74 5.79 8 14.73 13 23.48 13.4h1.27a22.71 22.71 0 0 0 22.42-19.33l4-.25c2 7.33 1.65 15.63-1.13 24.21-5.88 18.11-20.4 29.09-38 29.09a44.52 44.52 0 0 1-7-.56c-21.33-3.37-42.46-22.65-42.46-57.42 0-51.65 31.55-77.66 50.29-88.52a2 2 0 0 0 .71-2.66 1.94 1.94 0 0 0-2.65-.72C66.58 17.84 33.9 44.77 33.9 98.4c0 16.93 4.9 31.7 14 42.81a51.66 51.66 0 0 0 31.7 18.46 46.87 46.87 0 0 0 7.32.58 43.53 43.53 0 0 0 22-5.81c9.32-5.45 16.26-14.38 20-25.94 4.66-14.37 3-27.71-4.25-37.74-5.8-8-14.77-13-23.53-13.4h-1.15A22.71 22.71 0 0 0 77.57 96.6l-4 .24c-2-7.31-1.63-15.6 1.15-24.15 6.65-20.5 24.35-31.8 45-28.54 21.33 3.37 42.46 22.65 42.46 57.42 0 50.84-30.76 76.84-49 87.78a1.94 1.94 0 0 0 1 3.61 1.92 1.92 0 0 0 1-.28c19.06-11.39 50.93-38.32 50.93-91.12 0-16.93-4.9-31.7-14-42.81a51.66 51.66 0 0 0-31.7-18.46M99.99 81.21a18.78 18.78 0 1 1-18.78 18.78 18.8 18.8 0 0 1 18.78-18.78zM186.26.57a1.94 1.94 0 0 0-2.74 0l-13.15 13.15a2 2 0 0 0 0 2.75l13.14 13.15a2 2 0 0 0 2.75 0l13.15-13.15a2 2 0 0 0 0-2.75zm-1.38 24.92l-10.4-10.4 10.4-10.4 10.39 10.4zM16.47 170.37a1.94 1.94 0 0 0-2.74 0L.57 183.51a1.94 1.94 0 0 0 0 2.74l13.15 13.15a2 2 0 0 0 2.75 0l13.15-13.15a1.94 1.94 0 0 0 0-2.74zm-1.38 24.91L4.7 184.89l10.4-10.39 10.4 10.39z"/><path class="neon-a" d="M186.08 174.57h-7.62v-7.78a1.945 1.945 0 1 0-3.89 0v7.78h-7.58a1.945 1.945 0 1 0 0 3.89h7.62v7.78a1.945 1.945 0 0 0 3.89 0v-7.78h7.62a1.945 1.945 0 1 0 0-3.89zM32.99 21.52h-7.58v-7.77a1.95 1.95 0 1 0-3.89 0v7.78H13.9a1.95 1.95 0 0 0 0 3.89h7.62v7.78a1.95 1.95 0 1 0 3.89 0v-7.79h7.58a1.95 1.95 0 0 0 0-3.89zM12.91 82.69a2 2 0 0 0-1.37.57 1.94 1.94 0 1 0 3.32 1.39 1.94 1.94 0 0 0-1.94-1.94zM184.89 115.12a1.94 1.94 0 0 0-1.38 3.32 1.94 1.94 0 0 0 2.74 0 1.95 1.95 0 0 0-1.36-3.32zM101.9 197.33a1.94 1.94 0 0 0-2.48-1.17h-.1a1.95 1.95 0 1 0 .94 3.78l.31-.1.18-.06a1.94 1.94 0 0 0 1.15-2.45zM99.86 3.99a1.94 1.94 0 0 0 .66-.12h.15A2 2 0 0 0 99.42.11l-.23.08a1.95 1.95 0 0 0 .67 3.8zM28.06 153.46a2 2 0 0 0-1.6-.83 1.95 1.95 0 0 0-1.59 3.06c.78 1.12 1.62 2.22 2.47 3.28a1.95 1.95 0 1 0 3-2.44c-.77-.99-1.55-2.02-2.28-3.07zM117.76 163.85a1.94 1.94 0 0 0-1.28.48c-1 .85-2 1.68-3 2.45a1.951 1.951 0 0 0 2.19 3.23l.19-.15a60.99 60.99 0 0 0 3.17-2.61 1.95 1.95 0 0 0-1.27-3.4zM131.59 148.99a1.94 1.94 0 0 0-2.67.61c-.69 1.1-1.41 2.19-2.14 3.23a1.945 1.945 0 1 0 3.18 2.24c.77-1.09 1.53-2.24 2.26-3.41a2 2 0 0 0-.63-2.67zM43.66 172.92a1.95 1.95 0 0 0 1-3.59c-1.07-.68-2.15-1.42-3.19-2.18a1.953 1.953 0 0 0-2.5 3l.2.15c1.1.81 2.24 1.59 3.39 2.32a1.93 1.93 0 0 0 1.1.3zM97.21 179.65a2 2 0 0 0 .63-.1c1.3-.44 2.59-.93 3.85-1.45a1.95 1.95 0 0 0-1.2-3.71l-.29.12c-1.17.49-2.38.94-3.61 1.36a1.95 1.95 0 0 0 .62 3.78zM62.35 176.99c-1.25-.32-2.5-.69-3.71-1.08a1.95 1.95 0 0 0-1.21 3.7c1.3.42 2.63.81 3.94 1.15a1.974 1.974 0 0 0 1.17-3.77zM81.62 178.82h-.13c-1.27.08-2.55.12-3.82.12a1.95 1.95 0 1 0-.28 3.89h.28q2.09 0 4.11-.13a1.95 1.95 0 0 0-.16-3.88zM182.12 65.21a2 2 0 0 0 .56-.08 1.94 1.94 0 0 0 1.3-2.41c-.39-1.3-.82-2.62-1.29-3.9a1.94 1.94 0 0 0-2.48-1.17 2 2 0 0 0-1.16 2.5c.44 1.2.85 2.43 1.21 3.66a2 2 0 0 0 1.86 1.4zM175.11 44.29c-.78-1.11-1.61-2.22-2.47-3.28a1.94 1.94 0 0 0-1.52-.72 1.92 1.92 0 0 0-1.22.43 2 2 0 0 0-.29 2.74c.8 1 1.58 2 2.32 3.08a1.952 1.952 0 0 0 3.29-2.1zM184.79 76.99h-.11a1.94 1.94 0 0 0-1.84 2c.07 1.28.1 2.59.1 3.88a1.95 1.95 0 0 0 3.89 0c0-1.36 0-2.74-.11-4.09a1.94 1.94 0 0 0-1.93-1.79zM161.53 30.99a1.93 1.93 0 0 0-.77-1.27c-1.1-.8-2.24-1.59-3.4-2.32a1.95 1.95 0 0 0-2.09 3.28c1.09.69 2.16 1.42 3.19 2.18a1.95 1.95 0 0 0 3.07-1.87zM72.74 44.46a1.93 1.93 0 0 0-1.12-.35 2 2 0 0 0-1.59.83c-.77 1.1-1.53 2.25-2.26 3.41a1.95 1.95 0 1 0 3.3 2.06c.69-1.11 1.41-2.19 2.15-3.23a2 2 0 0 0-.48-2.72zM104.61 21.65a1.94 1.94 0 0 0-2.45-1.22c-1.3.44-2.59.93-3.85 1.45a1.95 1.95 0 1 0 1.2 3.71l.29-.12c1.18-.49 2.39-.95 3.61-1.36a2 2 0 0 0 1.2-2.46zM141.34 24.07a1.95 1.95 0 0 0 1.21-3.7c-1.3-.42-2.63-.81-3.94-1.15a1.95 1.95 0 0 0-1 3.77c1.27.32 2.51.68 3.73 1.08zM85.29 29.71a1.92 1.92 0 0 0-1.18.4c-1.12.83-2.12 1.71-3.12 2.61a1.95 1.95 0 0 0 2.57 2.92c1-.85 2-1.68 3-2.45a1.95 1.95 0 0 0-1.27-3.48zM124.29 19.08a2 2 0 0 0-1.94-1.95c-1.36 0-2.72 0-4.06.13a1.95 1.95 0 0 0 .12 3.89h.12c1.26-.08 2.55-.12 3.82-.12a2 2 0 0 0 1.94-1.95zM17.14 120.99c-.07-1.27-.1-2.58-.1-3.88a1.95 1.95 0 1 0-3.89 0c0 1.37 0 2.74.11 4.08a2 2 0 0 0 1.93 1.8h.11a1.94 1.94 0 0 0 1.84-2zM20.94 139.83c-.44-1.21-.85-2.44-1.21-3.67a1.94 1.94 0 0 0-2.41-1.31 1.94 1.94 0 0 0-1.33 2.4 65.9 65.9 0 0 0 1.29 3.9 1.944 1.944 0 0 0 3.65-1.34z"/></svg>',
    size: 5,
    answer: {
      correct: {
        title: 'Вы правы.',
        text: 'Если бы каждая звезда на этом снимке превратилась в песчинку, то их бы хватило на украшение аквариума.'
      },
      less: {
        title: 'Нужно больше четырёх гигабайт.',
        text: 'Придётся рассматривать галактику самостоятельно — в бинокле она похожа на маленький размытый овал.'
      },
      more: {
        title: 'Это больше, чем нужно.',
        text: 'Фотография занимает 4,3Гб. Может и хватило бы на остальные звёзды, но телескопу «Хаббл» уже почти тридцать лет,  и фотографировать ещё лучше он не умеет.'
      }
    }
  }, {
    text: 'В ожидании последнего сезона «Игры престолов» можно сравнить экранизированную сагу с оригиналом — книгами Джорджа Мартина.',
    title: 'Сколько трафика нужно на прослушивание всех аудиокниг?',
    notice: 'Один час аудиокниги весит около 46 мегабайт.',
    img: '<svg width="297.6" height="200" viewBox="0 0 297.6 200"><path class="neon-b" d="M160.29 56.71c-.71 0-1.43 0-2.16.05a44.79 44.79 0 0 0-5.12.53c1 2 3.78 5.39 7.07 6.06a44.84 44.84 0 0 1 7.91-5.86 35.13 35.13 0 0 0-7.7-.78z"/><path class="neon-a" d="M204.9 89.1a1.66 1.66 0 0 0 .47-.48 92.57 92.57 0 0 0 5.35-9.14c2.08-4.1 4.41-9.46 4-14.49v-.44l.27-.35a10.14 10.14 0 0 0 2.23-4.09 4.56 4.56 0 0 0-.4-3.3 4.67 4.67 0 0 0-3.14-2.05h-.22a63.78 63.78 0 0 0-7-.6h-.34l-.17-.16c-.42-.18-10.56-4.53-26.3-5.32h-.53l-.31-.43a20.75 20.75 0 0 0-8.39-7.25c-5.32-2.51-13-3.84-23.63-4.08h-.33l-.28-.19a35.73 35.73 0 0 0-8.2-4c-8-2.85-17.51-4.3-28.32-4.3h-.39a1.67 1.67 0 0 0-1.15 2.3 35.58 35.58 0 0 0 6.26 10.84l1.59 1.86H112.94a69 69 0 0 0-26.46 5.06 1.67 1.67 0 0 0-.17 3 25.58 25.58 0 0 1 3.06 2.64l1 1c1.2 1.19 2.55 2.53 4 4 3.24 3.12 7.05 6.6 11.36 8.51l1.63.72-1.36 1.15a28.63 28.63 0 0 1-16.33 6.72 1.67 1.67 0 0 0-1.1 2.77 31 31 0 0 0 4 3.45 23.2 23.2 0 0 0 4.66 2.58l1.41.59-1 1.16-.85 1a25.23 25.23 0 0 1-4.58 4.58 66.5 66.5 0 0 1-6.49 4.18 1.68 1.68 0 0 0 0 2.93s1.77.94 3.92 1.87a10.52 10.52 0 0 0 1.73.5c.52.12 1.05.25 1.58.42l1.17.43-.51 1.13a41.69 41.69 0 0 1-12.68 15.9h-.12a1.68 1.68 0 0 0-.16 2.87 1.65 1.65 0 0 0 .63.26h.31a1.67 1.67 0 0 0 1-.33 43.18 43.18 0 0 0 15.53-20.31 1.67 1.67 0 0 0-.79-2.08 1.68 1.68 0 0 0-.77-.19 23.12 23.12 0 0 1-4.67-1.38l-2.08-.78 1.87-1.2c.41-.26.68-.42.92-.57A14.3 14.3 0 0 0 94.12 95c3.6-2.63 7.58-5.76 9.32-9.75a1.67 1.67 0 0 0-1.46-2.36c-2-.09-4.25-1.33-6.14-2.53l-2.11-1.34 2.39-.64a32.49 32.49 0 0 0 13.91-7.91 1.67 1.67 0 0 0 .37-.47l.38-.73.81.15a26.08 26.08 0 0 0 4.7.44 17.62 17.62 0 0 0 7.83-1.61 1.72 1.72 0 0 0 .57-.41 1.67 1.67 0 0 0 .26-1.89 1.67 1.67 0 0 0-1.49-.92h-.18a1.67 1.67 0 0 0-.64.2 15.7 15.7 0 0 1-6.33 1.13 24.42 24.42 0 0 1-7.47-1.22c-3.19-1-7.24-3.84-12-8.46-1.72-1.58-3.32-3.13-4.72-4.5l-.28-.28-1.29-1.3 1.76-.6a71.46 71.46 0 0 1 29.7-2.84h.25a1.67 1.67 0 0 0 .92-.28c4.7-3.13 11.25-6.73 20.24-6.73 11.5 0 20.08 1.3 25.51 3.86a17.68 17.68 0 0 1 7.72 6.75l.3.42a1.68 1.68 0 0 0 1.3.67c15.66.53 26.15 5.11 27 5.49a1.67 1.67 0 0 0 .56.1h.19c.12 0 3 .1 6.91.62l1.26.16-.32 1.23a11 11 0 0 1-1.89 3.32 1.67 1.67 0 0 0-.37 1.47c.6 2.81-1.48 9-3.84 13.66a63.93 63.93 0 0 1-4.32 7.33l-.2.29-.28.41-.49.07a47.19 47.19 0 0 1-6.64.45c-5.34 0-12.94-.82-19.88-4.58v.2L174.21 81c-5.37-3.49-9.61-5.12-13.33-5.12-.41 0-.82 0-1.22.06-3.83.38-7.24 2.85-9.61 6.95a14.92 14.92 0 0 0-2.47 7.79 8.77 8.77 0 0 0 2.64 6c3.2 3.24 8.19 4.81 13.46 6.25 1.65.45 3.37.89 5 1.31a107.28 107.28 0 0 1 11.46 3.35c4.62 1.76 7.88 4 9.69 6.8l.33.49-.23.55a20 20 0 0 1-5.19 6.7 3.67 3.67 0 0 1-.64.46 1.8 1.8 0 0 0-.26.18l-1.35 1.07-.37-1.71-.09-.35a3.6 3.6 0 0 0-1-2.06 4.9 4.9 0 0 0-3.35-1.15 7.55 7.55 0 0 0-1.29.11 23.9 23.9 0 0 1-4 .35 22.3 22.3 0 0 1-6.67-1.11l-.76-.22a10.54 10.54 0 0 0-2.85-.51 5.57 5.57 0 0 0-1.37.17 6.54 6.54 0 0 0-3.62 3.14v.27c-1.92 4-1 8.44.06 11.84a3.61 3.61 0 0 0 .27.7 7.07 7.07 0 0 1 .31.71l.85 2.22-2.25-.76a29.09 29.09 0 0 1-4.56-2l-.09-.05-.08-.07a1.68 1.68 0 0 0-1.09-.41h-.3a1.67 1.67 0 0 0-1.17.85c-4.77 9.22 1.33 20.36 1.39 20.47a1.67 1.67 0 0 0 1.52 1h.11a1.68 1.68 0 0 0 1.17-.59 1.69 1.69 0 0 0 .32-.59 1.67 1.67 0 0 0 .06-.67 1.69 1.69 0 0 0-.21-.64v-.11c-.13-.31-3.17-7.58-2.17-13.87l.24-1.5 1.22.7a15.05 15.05 0 0 0 6.69 1.68 12.83 12.83 0 0 0 1.81-.13 1.67 1.67 0 0 0 1.29-.9 1.68 1.68 0 0 0 0-1.56 32.51 32.51 0 0 1-2.27-5.53c-1.09-3.57-1.21-7-.31-9.13v-.14a1.32 1.32 0 0 1 .19-.25c.72-1.13 1.06-1.39 1.47-1.49a1.32 1.32 0 0 1 .33 0 8.61 8.61 0 0 1 2.2.45l.47.13a27.42 27.42 0 0 0 7.94 1.26 26.68 26.68 0 0 0 4.37-.37c.26 0 .5-.08.71-.09h.91l.34.3-.5.55-.11.26.94-.15a6 6 0 0 1 .12.76 11.13 11.13 0 0 1-.38 3.18v.08a1.67 1.67 0 0 0 1.53 2.21h.06a1.67 1.67 0 0 0 .93-.28 55.24 55.24 0 0 0 5.56-4.19c3.06-2.63 6-5.6 6.88-9.43a1.7 1.7 0 0 0-.1-1.12c-1.56-3.29-4.47-5.87-9.15-8.09l-.82-.39.22-.88a17 17 0 0 0 .15-7 41.31 41.31 0 0 1-5.78 5.21l-.11.08-.46.34-.55-.17-.8-.25c-1-.3-2-.61-2.91-.87l-.94-.26.12-1c.06-.51.12-1 .16-1.47-.69.5-1.45 1-2.3 1.52l-.4.25-.46-.12-1.42-.38-1.2-.32-1-.25.13-1a15.16 15.16 0 0 0 .12-2.12 29.05 29.05 0 0 1-3 2l-.42.25-.42-.18c-1-.32-1.9-.58-2.76-.89l-.89-.32.17-.93a19.4 19.4 0 0 0 .27-2.09q-1.16.88-2.42 1.67l-.54.33-.56-.29a13.24 13.24 0 0 1-3.25-2.22 4.85 4.85 0 0 1-1.63-3.64 11.75 11.75 0 0 1 1.91-5.72v-.05l.16-.28c2-3.45 4-5 7-5.26h.73a12.3 12.3 0 0 1 2.2.22l.94.17v1c0 1-.07 2-.13 3.05a15.76 15.76 0 0 0 3-2.24l.56-.52.69.33c1.08.52 2.27 1.24 3.33 1.89l.46.28.07.54a20.48 20.48 0 0 1 .11 3.86 13 13 0 0 0 2.32-2l.57-.61.75.37c.92.46 1.78.84 2.63 1.19l.61.16v.78c0 .94-.13 1.93-.26 3a15 15 0 0 0 2.53-2.38l.47-.53.68.19a46.22 46.22 0 0 0 5.54 1.19l.81.13.12.81a37.45 37.45 0 0 1 .16 8.94c3.07-2.12 5.65-6.56 6.73-8.6l.31-.59h.67a51.3 51.3 0 0 0 7.66-.59 1.66 1.66 0 0 0 .63-.25zm-69.18-51.39a41.07 41.07 0 0 0-13.16 5.7l-.61.39-.61-.4c-2.58-1.72-5.2-4.9-7.77-9.45l-1-1.77 2 .1c8.46.43 16 1.59 21.22 3.28l3.9 1.26z"/><path class="neon-b" d="M110.63 166.19a114.27 114.27 0 0 1 27.71 3.4 146.82 146.82 0 0 1 21.62 6.92c5.41 2.32 12.7 5.85 22.29 10.8l6 3c8.49 4.25 18.31 6.4 29.21 6.4 19.88 0 45.06-8 74.84-23.85 1.15-.65 2.47-1.35 4-2.13 1.23-.64 1.23-.82 1.23-2V2.34c0-.78 0-1.19-1.14-2a2.46 2.46 0 0 0-1-.36 2.38 2.38 0 0 0-.87.28c-1.37.77-3.56 2-6.44 3.54-29.37 17.47-53.39 26-73.43 26a54.69 54.69 0 0 1-24.63-5.37 327.25 327.25 0 0 0-43.9-18.11A137.6 137.6 0 0 0 72.93 4a183.06 183.06 0 0 0-31.26 10.09c-10.05 4.35-18.24 8.08-24.32 11.09s-11.37 5.87-16.1 8.7c-1.26.84-1.26 1.25-1.26 2.05v161.84a1.72 1.72 0 0 0 .86 1.89 3.27 3.27 0 0 0 1.37.34 2.07 2.07 0 0 0 1.15-.28c14.51-8.85 32.08-16.71 52.22-23.34 20.53-6.76 39.03-10.19 55.04-10.19zM4.45 193V37.08l6.06-3.35C45.56 14.38 77.04 4.57 104.12 4.57a136.23 136.23 0 0 1 42.47 6.58 328.66 328.66 0 0 1 41.64 17.3h.16c7.45 3.79 16.3 5.71 26.31 5.71 17.86 0 38.45-6.21 61.19-18.45l17.23-9.23v161.05l-6.22 3.31c-27.13 14.42-49.83 21.44-69.41 21.44a60.49 60.49 0 0 1-27.28-6l-6.08-3c-7.76-3.81-13.69-6.65-17.64-8.45-3.69-1.68-9.09-3.85-16-6.45a97.2 97.2 0 0 0-19.06-5.07 136.89 136.89 0 0 0-20.78-1.5c-25.5 0-55.63 7.93-89.53 23.57z"/></svg>',
    size: 8,
    answer: {
      correct: {
        title: 'Всё верно.',
        text: 'Это неделя непрерывного прослушивания. Зато вы точно знаете, когда наступит зима.'
      },
      less: {
        title: 'Нужно значительно больше.',
        text: 'Ничего ты не знаешь, Джон Сноу. Непрерывное прослушивание всех книг занимает около недели и больше семи гигабайт трафика.'
      },
      more: {
        title: 'Потрачено больше, чем нужно.',
        text: 'Нужно было не больше восьми гигабайт. Но ваш размах наверняка удивил бы Джорджа Мартина.'
      }
    }
  }],
  result: {
    text: 'Трафик заканчивается быстрее, чем кажется. Зато абоненты Tele2 могут поддержать друг друга, поделившись с друзьями и близкими гигабайтами.',
    link: 'https://msk.tele2.ru/promo/share-gb?utm_source=TJ&utm_medium=SP&utm_content=Test&utm_campaign=Tele2_8flight&utm_term='
  },
  results: [{
    range: [0, 3.95],
    title: 'Я — крохобор',
    img: 'https://leonardo.osnova.io/d62c2294-f35c-d462-542c-24e533c0455e/'
  }, {
    range: [3.96, 4.45],
    title: 'Я — жадина',
    img: 'https://leonardo.osnova.io/6ff495dd-1db7-dbce-5af5-e46a06d6e565/'
  }, {
    range: [4.46, 4.95],
    title: 'Я — ювелир',
    img: 'https://leonardo.osnova.io/944b4d05-c3e8-6c4a-545b-4ff17b484abf/'
  }, {
    range: [4.96, 5.45],
    title: 'Я — расточитель',
    img: 'https://leonardo.osnova.io/1ae2f799-4d21-3b1d-9f9c-c8c793c0ec5c/'
  }, {
    range: [5.46, 100],
    title: 'Я — транжира',
    img: 'https://leonardo.osnova.io/d522a894-773c-e4fb-6d7a-7009cdf201a9/'
  }]
};

/***/ })
/******/ ]);
//# sourceMappingURL=all.js.map