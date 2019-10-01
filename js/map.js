'use strict';

(function () {

  window.MAP_X_MIN = 0;
  window.MAP_X_MAX = 1200;

  window.MAP_Y_MIN = 130;
  window.MAP_Y_MAX = 630;

  var ENTER_KEYCODE = 13;

  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 60;
  var MAIN_PIN_BOTTOM = 30;

  window.cards = window.generateCards();

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelectorAll('.map__filter');


  var mainPinActivateHandler = function () {
    map.classList.remove('map--faded');
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
    window.setPins();
    window.activateNoticeForm();
    setMainPinLocation();
  };

  var isEntered = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.addEventListener('load', function () {
    window.noticeFormAddress.readOnly = true;
    setMainPinLocation();
  });

  mainPin.addEventListener('mousedown', mainPinActivateHandler);
  mainPin.addEventListener('keydown', function (evt) {
    isEntered(evt, mainPinActivateHandler);
  });


  var setMainPinLocation = function () {
    var mainPinX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    if (window.noticeForm.classList.contains('ad-form--disabled')) {
      mainPinY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
    } else {
      var mainPinY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_BOTTOM);
    }

    window.noticeFormAddress.value = mainPinX + ', ' + mainPinY;
  };
})();
