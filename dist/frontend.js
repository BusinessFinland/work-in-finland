function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Filter = /*#__PURE__*/function () {
  function Filter(element, listing) {
    _classCallCheck(this, Filter);

    this.element = element;
    this.listing = listing;
    this.onClick = this.onClick.bind(this);
    this.element.addEventListener('click', this.onClick);
    this.onInit();
  }
  /**
   * Get the category param from this.listing in array format
   */


  _createClass(Filter, [{
    key: "parseCategory",
    value: function parseCategory() {
      if (this.listing.config.category === 0) {
        return [];
      }

      return this.listing.config.category.split(',');
    }
    /**
     * Take categories in array format and insert them into this.listing in the proper format
     */

  }, {
    key: "serializeCategory",
    value: function serializeCategory() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!list.length) {
        this.listing.config.category = 0;
        return this.listing.config.category;
      }

      return list.join(',');
    }
    /**
     * Used to determine what to do if there's other types of filters in the future.
     */

  }, {
    key: "getFilterTarget",
    value: function getFilterTarget() {
      var filterTarget = this.element.getAttribute("data-filtertarget");
      return filterTarget;
    }
    /**
     * Get value from the data attr
     */

  }, {
    key: "getValue",
    value: function getValue() {
      var filterTarget = this.getFilterTarget();
      var value = this.element.getAttribute("data-".concat(filterTarget));
      return value;
    }
    /**
     * Initialize filter. this.listing.config may be preconfigured and contain filters.
     */

  }, {
    key: "onInit",
    value: function onInit() {
      var filterTarget = this.getFilterTarget();
      var value = this.getValue();

      switch (filterTarget) {
        case 'category':
          {
            var categories = this.parseCategory();

            if (categories.indexOf(value) > -1) {
              this.element.classList.add('active');
            }

            break;
          }

        default:
          {
            console.log('Unhandled filter type');
            break;
          }
      }
    }
    /**
     * Click handler for the filter.
     */

  }, {
    key: "onClick",
    value: function onClick() {
      var _this = this;

      var isActive = this.element.classList.contains('active');
      var filterTarget = this.getFilterTarget();
      var value = this.getValue();
      this.element.classList.toggle('active');
      this.element.blur();

      switch (filterTarget) {
        case 'category':
          {
            var categories = this.parseCategory();

            if (isActive) {
              // Remove data from config
              categories.splice(categories.indexOf(value), 1);
              this.listing.config.category = this.serializeCategory(categories);
            } else {
              // Activate!
              categories.push(value);
              this.listing.config.category = this.serializeCategory(categories);
            }

            break;
          }

        default:
          {
            console.log('Unhandled filter type');
            break;
          }
      }

      this.listing.config.page = 1; // Changing a filter restarts the pagination

      this.listing.hideLoadMore();
      this.listing.removeAll();
      this.listing.setDataAttrs();
      this.listing.load().then(function () {
        return _this.listing.setURL();
      });
    }
  }]);

  return Filter;
}();

var ResetFilters = /*#__PURE__*/function (_Filter) {
  _inherits(ResetFilters, _Filter);

  var _super = _createSuper(ResetFilters);

  function ResetFilters() {
    _classCallCheck(this, ResetFilters);

    return _super.apply(this, arguments);
  }

  _createClass(ResetFilters, [{
    key: "onInit",
    value: function onInit() {}
  }, {
    key: "onClick",
    value: function onClick() {
      this.element.blur();
      this.listing.filters.forEach(function (filter) {
        filter.element.classList.remove('active');
      });
      this.listing.config.category = 0;
      this.listing.setDataAttrs();
      this.listing.setURL();
      this.listing.removeAll();
      this.listing.load();
    }
  }]);

  return ResetFilters;
}(Filter);

var Listing = /*#__PURE__*/function () {
  function Listing(element) {
    var _this = this;

    _classCallCheck(this, Listing);

    _defineProperty(this, "routerBase", '#jwif-listing?');

    _defineProperty(this, "loadMore", function () {
      _this.config.page++;

      _this.loadMoreEl.classList.add('loading');

      _this.load().then(function () {
        _this.setURL();

        _this.loadMoreEl.classList.remove('loading');
      })["catch"](function (e) {
        _this.loadMoreEl.classList.remove('loading');
      });
    });

    this.element = element;
    this.container = this.element.querySelector('.jwif-listing__jobs');
    this.filters = this.element.querySelectorAll('.jwif-listing__filter');
    this.config = _objectSpread2({}, this.getDataAttrs());
    /**
     * Check if the URL has params and overwrite config if necessary
     */

    var urlParams = this.parseURL();

    if (urlParams) {
      Object.keys(urlParams).forEach(function (k) {
        _this.config[k] = urlParams[k];
      });
      this.setDataAttrs();
      this.removeAll();
      this.load();
    }
    /**
    * Initialize pagination if it exists
    */


    if (this.config.totalPages > 1) {
      this.loadMoreEl = this.element.querySelector('.jwif-listing__more--button');
      this.loadMoreEl && this.loadMoreEl.addEventListener('click', this.loadMore);
    }
    /**
     * Initialize filters if they exist
     */


    if (this.filters.length) {
      this.filters = Array.prototype.map.call(this.filters, function (filter) {
        if (filter.classList.contains('jwif-listing__filter--reset')) {
          return new ResetFilters(filter, _this);
        } else {
          return new Filter(filter, _this);
        }
      });
    }
  }
  /**
   * Remove all jobs from the listing. If you want to animate the remove, add a class
   * and use setTimeout for each element.
   */


  _createClass(Listing, [{
    key: "removeAll",
    value: function removeAll() {
      var elements = this.container.querySelectorAll('.jwif-listing__job, h2');
      Array.prototype.forEach.call(elements, function (el) {
        el.parentNode.removeChild(el);
      });
    }
    /**
     * Load jobs with the values in this.config
     */

  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      var data = _objectSpread2({
        action: 'jwif_loadmore'
      }, this.config);

      var _window$jwif = window.jwif,
          adminAJAX = _window$jwif.adminAJAX,
          noResultsText = _window$jwif.noResultsText;
      var body = new FormData();
      Object.keys(data).forEach(function (k) {
        body.append(k, data[k]);
      });
      return fetch(adminAJAX, {
        method: 'POST',
        body: body
      }).then(function (r) {
        var headers = r.headers;
        var _ref = [headers.get('X-Total'), headers.get('X-Total-Pages')],
            total = _ref[0],
            totalPages = _ref[1];
        _this2.config.total = parseInt(total, 10);
        _this2.config.totalPages = parseInt(totalPages, 10);

        if (_this2.config.total === 0) {
          var noResults = document.createElement('h2');
          noResults.classList.add('jwif-listing__jobs__none');
          noResults.innerText = noResultsText;

          _this2.container.appendChild(noResults);
        }

        if (_this2.config.page >= _this2.config.totalPages) {
          _this2.hideLoadMore();
        } else {
          _this2.showLoadMore();
        }

        return r.text();
      }).then(function (r) {
        _this2.container.insertAdjacentHTML('beforeend', r);

        _this2.setDataAttrs();
      })["catch"](function (e) {
        console.error('Something went wrong while getting more jobs', e);
      });
    }
  }, {
    key: "showLoadMore",
    value: function showLoadMore() {
      if (this.loadMoreEl) {
        this.loadMoreEl.classList.remove('hidden');
      }
    }
  }, {
    key: "hideLoadMore",
    value: function hideLoadMore() {
      if (this.loadMoreEl) {
        this.loadMoreEl.classList.add('hidden');
      }
    }
    /**
     * Load the next page of jobs
     */

  }, {
    key: "getDataAttrs",
    value:
    /**
     * Get this.config values from this.element
     */
    function getDataAttrs() {
      return {
        region: parseInt(this.element.getAttribute('data-region'), 10),
        category: parseInt(this.element.getAttribute('data-category'), 10),
        total: parseInt(this.element.getAttribute('data-total'), 10),
        totalPages: parseInt(this.element.getAttribute('data-totalpages'), 10),
        page: parseInt(this.element.getAttribute('data-page'), 10),
        perPage: parseInt(this.element.getAttribute('data-perpage'), 10)
      };
    }
    /**
     * Write this.config to the this.element
     */

  }, {
    key: "setDataAttrs",
    value: function setDataAttrs() {
      var _this3 = this;

      var attrs = this.config;
      Object.keys(attrs).forEach(function (k) {
        _this3.element.setAttribute("data-".concat(k.toLowerCase()), attrs[k]);
      });
    }
    /**
     * Set the URL from params in this.config
     */

  }, {
    key: "setURL",
    value: function setURL() {
      var _this$config = this.config,
          category = _this$config.category,
          page = _this$config.page;
      var url = this.routerBase;

      if (category !== 0) {
        url = "".concat(url, "category=").concat(category, "&");
      }

      if (page > 1) {
        url = "".concat(url, "page=").concat(page);
      }

      window.location.hash = url.replace(/\&+$/, '');
    }
    /**
     * Parse values from the URL.
     */

  }, {
    key: "parseURL",
    value: function parseURL() {
      var url = window.location.hash.replace(this.routerBase, '');

      if (url) {
        var options = url.split('&').reduce(function (acc, part) {
          var _part$split = part.split('='),
              _part$split2 = _slicedToArray(_part$split, 2),
              k = _part$split2[0],
              v = _part$split2[1];

          if (k === 'page') {
            v = parseInt(v, 10);
          }

          acc[k] = v;
          return acc;
        }, {});
        return options;
      }

      return false;
    }
  }]);

  return Listing;
}();

function main() {
  var listingElements = document.querySelectorAll('.jwif-listing');
  var listings = Array.prototype.map.call(listingElements, function (listing) {
    return new Listing(listing);
  });
}

main();
