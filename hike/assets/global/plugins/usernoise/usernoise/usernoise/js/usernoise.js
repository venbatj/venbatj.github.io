/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var MiniRequire;

	MiniRequire = __webpack_require__(1);

	jQuery.extend(usernoise, {
	  isMobileDevice: function() {
	    return jQuery(window).width() < 768;
	  },
	  miniRequire: new MiniRequire({
	    baseUrl: usernoise.config.urls.usernoise + "js",
	    shim: {
	      'jQuery': jQuery
	    }
	  }),
	  window: {
	    show: function(bindTo) {
	      var _this;
	      _this = this;
	      return usernoise.miniRequire.require(['popup/dist/popup'], function(popup) {
	        var el, offset, props;
	        props = {};
	        if (bindTo) {
	          bindTo = jQuery(bindTo);
	        }
	        if (!bindTo && _this !== usernoise.window) {
	          bindTo = jQuery(_this);
	        }
	        if (bindTo && bindTo.is('#un-button')) {
	          if (bindTo.is('.un-left')) {
	            offset = {
	              top: (bindTo.outerWidth() - bindTo.outerHeight()) / 2,
	              left: -bindTo.outerHeight()
	            };
	            props.offset = offset;
	          }
	        }
	        if (bindTo) {
	          props.bindTo = bindTo;
	        }
	        el = jQuery('<div class="un-popup un-fade-transition"></div>');
	        jQuery('body').append(el);
	        return usernoise.window.current = popup(el[0], props);
	      });
	    },
	    hide: function() {
	      var elements;
	      elements = jQuery("#un-overlay, #un-iframe, #un-loading}");
	      elements.removeClass('un-visible');
	      return setTimeout((function() {
	        return elements.remove();
	      }), 500);
	    }
	  }
	});

	jQuery(function($) {
	  if (navigator && navigator.appVersion && (navigator.appVersion.indexOf("MSIE 6.0") !== -1 || navigator.appVersion.indexOf("MSIE 7.0") !== -1)) {
	    return;
	  }
	  return usernoise.miniRequire.require(['vendor/vue', 'popup/dist/popup'], function() {
	    var button, handleButtonClick, selector;
	    if (usernoise.config.button.enabled && !(window.usernoise.isMobileDevice() && usernoise.config.button.disableOnMobiles)) {
	      button = $('<button id="un-button" rel="usernoise"/>');
	      button.text(usernoise.config.button.text);
	      button.attr({
	        style: usernoise.config.button.style
	      });
	      $('body').append(button);
	      button.addClass(usernoise.config.button['class']);
	      setTimeout((function() {
	        return button.addClass('un-visible');
	      }), 1);
	      handleButtonClick = function(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        return usernoise.window.show(this);
	      };
	      selector = 'a[rel=usernoise], button[rel=usernoise], a[href="#usernoise"]';
	      if ($.on) {
	        return $.on('click', selector, handleButtonClick);
	      } else {
	        return $(selector).click(handleButtonClick);
	      }
	    }
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var MiniRequire;

	MiniRequire = (function() {
	  function MiniRequire(options) {
	    var module;
	    this.options = options != null ? options : {};
	    if (!this.options.baseUrl) {
	      this.options.baseUrl = "/";
	    }
	    this.moduleStore = {};
	    if (this.options.shim) {
	      for (module in this.options.shim) {
	        this.moduleStore[module] = (function() {
	          return this.options.shim[module];
	        });
	      }
	    }
	    this.define.amd = {};
	    this.watched = {};
	  }

	  MiniRequire.prototype.define = function(moduleName, dependencyNames, moduleDefinition) {
	    var _this;
	    _this = this;
	    if (this.moduleStore[moduleName]) {
	      return this.moduleStore[moduleName];
	    }
	    return this.require(dependencyNames, function(deps) {
	      _this.moduleStore[moduleName] = moduleDefinition.apply(_this, arguments);
	      return this.resolve(moduleName);
	    });
	  };

	  MiniRequire.prototype.waitFor = function(moduleName, callback) {
	    var callbacks;
	    if (!(callbacks = this.watched[moduleName])) {
	      this.watched[moduleName] = [];
	    }
	    return this.watched[moduleName].push(callback);
	  };

	  MiniRequire.prototype.resolve = function(moduleName) {
	    var callback, i, len, ref, results;
	    if (!this.watched[moduleName]) {
	      return;
	    }
	    ref = this.watched[moduleName];
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      callback = ref[i];
	      results.push(callback.call(this, this.moduleStore[moduleName]));
	    }
	    return results;
	  };

	  MiniRequire.prototype.require = function(moduleNames, callback) {
	    var _this, availableModuleNames, i, len, moduleLoaded, moduleName;
	    availableModuleNames = [];
	    if (typeof moduleNames === 'string') {
	      moduleNames = [moduleNames];
	    }
	    _this = this;
	    moduleLoaded = function() {
	      if (availableModuleNames.length === moduleNames.length) {
	        return callback.apply(_this, moduleNames.map(function(dependency) {
	          return _this.moduleStore[dependency];
	        }));
	      } else {
	        return void 0;
	      }
	    };
	    for (i = 0, len = moduleNames.length; i < len; i++) {
	      moduleName = moduleNames[i];
	      if (this.moduleStore[moduleName]) {
	        availableModuleNames.push(moduleName);
	      } else {
	        this.loadModule(moduleName, function() {
	          availableModuleNames.push(moduleName);
	          return moduleLoaded();
	        });
	      }
	    }
	    return moduleLoaded();
	  };

	  MiniRequire.prototype.loadModule = function(name, callback) {
	    return (this.getScriptForModule(name) || this.buildScriptForModule(name)).addEventListener('load', (function(_this) {
	      return function() {
	        if (_this.moduleStore[name]) {
	          return callback();
	        } else {
	          return _this.waitFor(name, callback);
	        }
	      };
	    })(this));
	  };

	  MiniRequire.prototype.getScriptForModule = function(module) {
	    var query;
	    query = document.querySelectorAll('[data-module-name="' + module + '"]');
	    if (query.length > 0) {
	      return query[0];
	    } else {
	      return null;
	    }
	  };

	  MiniRequire.prototype.buildScriptForModule = function(module) {
	    var moduleScript;
	    moduleScript = document.createElement('script');
	    moduleScript.src = this.options.baseUrl + "/" + module + ".js";
	    moduleScript.setAttribute('data-module-name', module);
	    document.body.appendChild(moduleScript);
	    return moduleScript;
	  };

	  return MiniRequire;

	})();

	if (module.exports) {
	  module.exports = MiniRequire;
	}

	if (typeof window !== 'undefined') {
	  window.MiniRequire = MiniRequire;
	}


/***/ }
/******/ ]);