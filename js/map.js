'use strict';

(function () {

  var MAP_X_MIN = 0;
  var MAP_X_MAX = 1135;

  var MAP_Y_MIN = 5;
  var MAP_Y_MAX = 625;

  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 60;
  var MAIN_PIN_BOTTOM = 30;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelectorAll('.map__filter');
  var mapPins = document.querySelector('.map__pins');

  var mainPinStartLocationLocation = {
    x: 570,
    y: 375,
  };

  var mainPinLocation = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'disabled');
    }
    window.pins.remove();
    var card = mapPins.querySelector('article');
    if (card) {
      card.remove();
    }
    mainPin.style.left = mainPinStartLocationLocation.x + 'px';
    mainPin.style.top = mainPinStartLocationLocation.y + 'px';
    setMainPinLocation(mainPinStartLocationLocation.x, mainPinStartLocationLocation.y);
  };

  var mainPinActivateHandler = function () {
    window.backend.download(function (data) {
      window.cards = data;
      document.querySelector('.map__filters').addEventListener('click', window.filters.filtrate(window.cards));
      map.classList.remove('map--faded');
      for (var i = 0; i < mapFilters.length; i++) {
        mapFilters[i].removeAttribute('disabled');
      }
      if (window.cards.length > 5) {
        var copy = window.cards.slice(0, 5);
        window.pins.set(copy);
      } else {
        window.pins.set(window.cards);
      }
      window.form.activate();
      setMainPinLocation(mainPinStartLocationLocation.x, mainPinStartLocationLocation.y);
    });
  };

  window.addEventListener('load', function () {
    document.querySelector('.ad-form').querySelector('#address').readOnly = true;
    setMainPinLocation(mainPinStartLocationLocation.x, mainPinStartLocationLocation.y);
  });

  mainPin.addEventListener('mousedown', mainPinActivateHandler);
  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEntered(evt, mainPinActivateHandler);
  });


  var setMainPinLocation = function (x, y) {
    var mainPinX = Math.floor(x + MAIN_PIN_WIDTH / 2);
    if (document.querySelector('.ad-form').classList.contains('ad-form--disabled')) {
      mainPinY = Math.floor(y + MAIN_PIN_HEIGHT / 2);
    } else {
      var mainPinY = Math.floor(y + MAIN_PIN_HEIGHT + MAIN_PIN_BOTTOM);
    }

    document.querySelector('.ad-form').querySelector('#address').value = mainPinX + ', ' + mainPinY;
  };

  mainPin.querySelector('img').setAttribute('draggable', 'true');

  mainPin.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();

    var startPinLocation = {
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY,
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

      mainPinLocation = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y,
      };
      if (mainPinLocation.x > MAP_X_MAX) {
        mainPinLocation.x = MAP_X_MAX;
      }
      if (mainPinLocation.x < MAP_X_MIN) {
        mainPinLocation.x = MAP_X_MIN;
      }
      if (mainPinLocation.y > MAP_Y_MAX) {
        mainPinLocation.y = MAP_Y_MAX;
      }
      if (mainPinLocation.y < MAP_Y_MIN) {
        mainPinLocation.y = MAP_Y_MIN;
      }

      mainPin.style.left = mainPinLocation.x + 'px';
      mainPin.style.top = mainPinLocation.y + 'px';

      setMainPinLocation(mainPinLocation.x, mainPinLocation.y);
    };

    var mouseUpOnMainPinHandler = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      setMainPinLocation(mainPinLocation.x, mainPinLocation.y);
      document.removeEventListener('mousemove', mouseMoveMainPinHandler);
      document.removeEventListener('mouseup', mouseUpOnMainPinHandler);
    };
    document.addEventListener('mousemove', mouseMoveMainPinHandler);
    document.addEventListener('mouseup', mouseUpOnMainPinHandler);
  });

  window.map = {
    deactivate: deactivate
  };
})();
