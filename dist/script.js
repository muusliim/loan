/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(oldOficcer, newOfficer, items) {
    try {
      this.oldOficcer = document.querySelector(oldOficcer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOficcer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {}
  }
  hideitems(items) {
    items.forEach((item, i, arr) => {
      if (i != arr.length - 1) {
        item.style.display = 'none';
      }
    });
  }
  bingTriggers(container, items, counter) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex';
        items[counter].classList.add('animated', 'fadeInDown');
        counter++;
      } else {
        items[counter].style.display = 'flex';
        items[items.length - 1].classList.add('animated', 'fadeOutDown');
      }
    });
  }
  init() {
    try {
      this.hideitems(this.newItems);
      this.hideitems(this.oldItems);
      this.bingTriggers(this.oldOficcer, this.oldItems, this.oldCounter);
      this.bingTriggers(this.newOfficer, this.newItems, this.newCounter);
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }
  downloadItem(path) {
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', 'picture');
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    document.body.remove(link);
  }
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Forms)
/* harmony export */ });
class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: `Thank you! we'll be in touch soon`,
      failure: 'Oops! something went wrong...'
    };
    this.path = 'assets/question.php';
  }
  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
    });
  }
  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
      input.addEventListener('keypress', e => {
        if (e.key.match(/[^a-z 0-9 @ \. -\_ +]/ig)) {
          e.preventDefault();
        }
      });
      input.addEventListener('input', () => {
        input.style.cssText = 'border: none';
        if (input.value.match(/[^a-z 0-9 @ \. \- + \_]/ig)) {
          input.style.cssText = 'border: 1px solid red';
        }
      });
    });
  }
  async postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
  }
  //phone mask
  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  //main init method
  init() {
    this.initMask();
    this.checkMailInputs();
    this.forms.forEach(item => {
      item.addEventListener('submit', e => {
        e.preventDefault();
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
                    margin-top: 20px;
                    color: grey;
                    font-size: 18px;
                `;
        item.parentElement.append(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(item);
        this.postData(this.path, formData).then(item => {
          console.log(item);
          statusMessage.textContent = this.message.success;
        }).catch(() => statusMessage.textContent = this.message.failure).finally(() => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/showInfo.js":
/*!************************************!*\
  !*** ./src/js/modules/showInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowInfo)
/* harmony export */ });
class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sibling = btn.closest('.module__info-show').nextElementSibling;
        sibling.classList.toggle('msg');
        sibling.style.marginTop = '20px';
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(obj) {
    super(obj);
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    try {
      this.hanson.style.opacity = '0';
      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (error) {}
    Array.from(this.slides).forEach(slide => {
      slide.style.display = 'none';
    });
    Array.from(this.slides)[this.slideIndex - 1].style.display = 'block';
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    this.modulePrevBtn.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
    this.moduleNextBtn.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }
  render() {
    if (this.container) {
      this.btns.forEach(btn => {
        btn.addEventListener('click', () => this.plusSlides(1));
        try {
          this.hanson = document.querySelector('.hanson');
        } catch (e) {}
        btn.parentElement.previousElementSibling.addEventListener('click', e => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      });
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(obj) {
    super(obj);
  }
  decorizeSlides() {
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });
    if (!Array.from(this.slides)[0].closest('button')) {
      Array.from(this.slides)[0].classList.add(this.activeClass);
    }
    if (this.animate) {
      Array.from(this.slides)[0].querySelector('.card__title').style.opacity = '1';
      Array.from(this.slides)[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }
  nextSlide() {
    Array.from(this.slides).map(slide => {
      if (slide.tagName === 'BUTTON') {
        this.container.append(slide);
      }
    });
    this.container.append(this.slides[0]);
    this.decorizeSlides();
  }
  bindTrigger() {
    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => {
      Array.from(this.slides).map(slide => {
        if (slide.tagName === 'BUTTON') {
          this.container.prepend(slide);
        }
      });
      this.container.prepend(this.slides[this.slides.length - 1]);
      this.decorizeSlides();
    });
  }
  init() {
    try {
      this.container.style.cssText = `
            display: flex; 
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
      this.bindTrigger();
      this.decorizeSlides();
      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      next = null,
      prev = null,
      moduleNxtBtn = null,
      modulePrevBtn = null,
      activeClass = '',
      animate = false,
      autoplay = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelectorAll(prev);
    this.next = document.querySelectorAll(next);
    this.moduleNextBtn = document.querySelectorAll(moduleNxtBtn);
    this.modulePrevBtn = document.querySelectorAll(modulePrevBtn);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

/***/ }),

/***/ "./src/js/modules/videoPlayer.js":
/*!***************************************!*\
  !*** ./src/js/modules/videoPlayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ videoPlayer)
/* harmony export */ });
class videoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
          if (this.path !== btn.getAttribute('data-url')) {
            this.path = btn.getAttribute('data-url');
            this.player.loadVideoById({
              videoId: this.path
            });
          }
        } else {
          this.path = btn.getAttribute('data-url');
          this.createPlayer(this.path);
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    this.overlay.style.display = 'flex';
  }
  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/videoPlayer */ "./src/js/modules/videoPlayer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showInfo */ "./src/js/modules/showInfo.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");







window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.page',
    btns: '.next'
  });
  slider.render();
  const modulePageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.moduleapp',
    btns: '.next',
    modulePrevBtn: '.prevmodule',
    moduleNextBtn: '.nextmodule'
  });
  modulePageSlider.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.modules__content-slider',
    next: '.modules__info-btns .slick-next',
    prev: '.modules__info-btns .slick-prev',
    activeClass: false,
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active',
    animate: false
  });
  feedSlider.init();
  new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_3__["default"]('.showup .play', '.overlay').init();
  new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_3__["default"]('.module__video-item', '.overlay').init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_0__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
  new _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__["default"]('.plus__content').init();
  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"]('.download').init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map