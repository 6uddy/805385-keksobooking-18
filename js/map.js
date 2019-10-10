'use strict';

(function () {

  window.MAP_X_MIN = 0;
  window.MAP_X_MAX = 1200;

  window.MAP_Y_MIN = 130;
  window.MAP_Y_MAX = 630;

  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 60;
  var MAIN_PIN_BOTTOM = 30;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelectorAll('.map__filter');

  window.mainPinStartLocationLocation = {
    x: 570,
    y: 375,
  };

  window.mainPinLocation = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  window.mapDeactivateHandler = function () {
    map.classList.add('map--faded');
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'disabled');
    }
    window.deletePins();
  };

  window.mainPinActivateHandler = function () {
    map.classList.remove('map--faded');
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
    window.setPins();
    window.activateNoticeForm();
    window.setMainPinLocation(window.mainPinStartLocationLocation.x, window.mainPinStartLocationLocation.y);
  };

  window.addEventListener('load', function () {
    window.noticeFormAddress.readOnly = true;
    window.setMainPinLocation(window.mainPinStartLocationLocation.x, window.mainPinStartLocationLocation.y);
  });

  mainPin.addEventListener('mousedown', window.mainPinActivateHandler);
  mainPin.addEventListener('keydown', function (evt) {
    window.isEntered(evt, window.mainPinActivateHandler);
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

  mainPin.addEventListener('mousedown', function (mouseDownEvnt) {
    mouseDownEvnt.preventDefault();

    var startPinLocation = {
      x: mouseDownEvnt.clientX,
      y: mouseDownEvnt.clientY,
    };

    var mouseMoveMainPinHandler = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift = {
        x: startPinLocation.x - mouseMoveEvt.clientX,
        y: startPinLocation.y - mouseMoveEvt.clientY,
      };

      startPinLocation = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY,
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

    var mouseUpOnMainPinHandler = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      window.setMainPinLocation(window.mainPinLocation.x, window.mainPinLocation.y);
      document.removeEventListener('mousemove', mouseMoveMainPinHandler);
      document.removeEventListener('mouseup', mouseUpOnMainPinHandler);
    };
    document.addEventListener('mousemove', mouseMoveMainPinHandler);
    document.addEventListener('mouseup', mouseUpOnMainPinHandler);
  });
})();
