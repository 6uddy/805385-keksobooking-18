'use strict';

(function () {

  window.MAP_X_MIN = 0;
  window.MAP_X_MAX = 1200;

  window.MAP_Y_MIN = 130;
  window.MAP_Y_MAX = 630;

  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 60;
  var MAIN_PIN_BOTTOM = 30;


  window.cards = window.generateCards();

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelectorAll('.map__filter');

  window.mainPinLocation = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  var mainPinActivateHandler = function () {
    map.classList.remove('map--faded');
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
    window.setPins();
    window.activateNoticeForm();
    setMainPinLocation(window.mainPinLocation.offsetLeft, window.mainPinLocation.offsetTop);
  };

  window.addEventListener('load', function () {
    window.noticeFormAddress.readOnly = true;
    setMainPinLocation(window.mainPinLocation.offsetLeft, window.mainPinLocation.offsetTop);
  });

  mainPin.addEventListener('mousedown', mainPinActivateHandler);
  mainPin.addEventListener('keydown', function (evt) {
    window.isEntered(evt, mainPinActivateHandler);
  });


  window.setMainPinLocation = function (x, y) {
    var mainPinX = Math.floor(x + MAIN_PIN_WIDTH / 2);
    if (window.noticeForm.classList.contains('ad-form--disabled')) {
      mainPinY = Math.floor(y + MAIN_PIN_HEIGHT / 2);
    } else {
      var mainPinY = Math.floor(y + MAIN_PIN_HEIGHT + MAIN_PIN_BOTTOM);
    }

    window.noticeFormAddress.value = mainPinX + ', ' + mainPinY;
  };


  mainPin.querySelector('img').setAttribute('draggable', 'true');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPinLocation = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var mouseMoveMainPinHandler = function (evt) {
      evt.preventDefault();

      var shift = {
        x: startPinLocation.x - evt.clientX,
        y: startPinLocation.y - evt.clientY,
      };

      startPinLocation = {
        x: evt.clientX,
        y: evt.clientY,
      };

      window.mainPinLocation = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y,
      };
      if (window.mainPinLocation.x > window.MAP_X_MAX) {
        window.mainPinLocation.x = window.MAP_X_MAX;
      }
      if (window.mainPinLocation.x < window.MAP_X_MIN) {
        window.mainPinLocation.x = window.MAP_X_MIN;
      }
      if (window.mainPinLocation.y > window.MAP_Y_MAX) {
        window.mainPinLocation.y = window.MAP_Y_MAX;
      }
      if (window.mainPinLocation.y < window.MAP_Y_MIN) {
        window.mainPinLocation.y = window.MAP_Y_MIN;
      }

      mainPin.style.left = window.mainPinLocation.x + 'px';
      mainPin.style.top = window.mainPinLocation.y + 'px';

      window.setMainPinLocation(window.mainPinLocation.x, window.mainPinLocation.y);
    };

    var mouseUpOnMainPinHandler = function (evt) {
      evt.preventDefault();
      window.setMainPinLocation(window.mainPinLocation.x, window.mainPinLocation.y);
      document.removeEventListener('mousemove', mouseMoveMainPinHandler);
      document.removeEventListener('mouseup', mouseUpOnMainPinHandler);
    };
    document.addEventListener('mousemove', mouseMoveMainPinHandler);
    document.addEventListener('mouseup', mouseUpOnMainPinHandler);
  });
})();
