'use strict';

var CARDS_COUNT = 8;

var MAP_X_MIN = 0;
var MAP_X_MAX = 1200;

var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;

var ENTER_KEYCODE = 13;

var MAIN_PIN_WIDTH = 60;
var MAIN_PIN_HEIGHT = 60;
var MAIN_PIN_BOTTOM = 30;

var generatedCards = generateCards(CARDS_COUNT);

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var mapFilters = map.querySelectorAll('.map__filter');


var mainPinActivateHandler = function () {
  map.classList.remove('map--faded');
  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
  setPins();
  activateNoticeForm();
  setMainPinLocation();
};

var isEntered = function (evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
};

window.addEventListener('load', function () {
  noticeFormAddress.readOnly = true;
  setMainPinLocation();
});

mainPin.addEventListener('mousedown', mainPinActivateHandler);
mainPin.addEventListener('keydown', function (evt) {
  isEntered(evt, mainPinActivateHandler);
});
