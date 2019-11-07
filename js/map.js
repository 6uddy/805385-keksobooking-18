'use strict';

(function () {

  var MAP_X_MIN = 0;
  var MAP_X_MAX = 1200;

  var MAP_Y_MIN = 130;
  var MAP_Y_MAX = 630;

  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 60;
  var MAIN_PIN_BOTTOM = 20;
  var MAX_FILTER_RESULTS = 5;

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
    mapFilters.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
    window.pins.remove();
    var card = mapPins.querySelector('article');
    if (card) {
      card.remove();
    }
    mainPin.style.left = mainPinStartLocationLocation.x + 'px';
    mainPin.style.top = mainPinStartLocationLocation.y + 'px';
    setMainPinLocation(mainPinStartLocationLocation.x, mainPinStartLocationLocation.y);
  };

  window.addEventListener('load', function () {
    window.backend.download(onLoadDataHandler);
  });

  var onLoadDataHandler = function (data) {
    window.cards = data;
    document.querySelector('.map__filters').addEventListener('click', window.filters.filtrate(window.cards));
  };


  var mainPinActivateHandler = function () {
    map.classList.remove('map--faded');
    mapFilters.forEach(function (el) {
      el.removeAttribute('disabled');
    });
    if (window.cards.length > MAX_FILTER_RESULTS) {
      var copy = window.cards.slice(0, MAX_FILTER_RESULTS);
      window.pins.set(copy);
    } else {
      window.pins.set(window.cards);
    }
    window.form.activate();
    setMainPinLocation(mainPinStartLocationLocation.x, mainPinStartLocationLocation.y);
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
      if (mainPinLocation.x > MAP_X_MAX - MAIN_PIN_WIDTH / 2) {
        mainPinLocation.x = MAP_X_MAX - MAIN_PIN_WIDTH / 2;
      }
      if (mainPinLocation.x < MAP_X_MIN - MAIN_PIN_WIDTH / 2) {
        mainPinLocation.x = MAP_X_MIN - MAIN_PIN_WIDTH / 2;
      }
      if (mainPinLocation.y > MAP_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_BOTTOM) {
        mainPinLocation.y = MAP_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_BOTTOM;
      }
      if (mainPinLocation.y < MAP_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_BOTTOM) {
        mainPinLocation.y = MAP_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_BOTTOM;
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
