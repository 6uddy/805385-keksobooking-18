'use strict';

(function () {


  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;


  window.isEntered = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.isEsced = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

})();
