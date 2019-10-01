'use strict';

var noticeForm = document.querySelector('.ad-form');
var noticeFormFields = noticeForm.querySelectorAll('fieldset');
var noticeFormTitle = noticeForm.querySelector('#title');
var noticeFormPrice = noticeForm.querySelector('#price');
var noticeFormType = noticeForm.querySelector('#type');
var noticeFormAddress = noticeForm.querySelector('#address');
var noticeFormCheckin = noticeForm.querySelector('#timein');
var noticeFormCheckout = noticeForm.querySelector('#timeout');
var noticeFormRooms = noticeForm.querySelector('#room_number');
var noticeFormCapacities = noticeForm.querySelector('#capacity');

var activateNoticeForm = function () {
  noticeForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < noticeFormFields.length; i++) {
    noticeFormFields[i].removeAttribute('disabled');
  }
};

var setMainPinLocation = function () {
  var mainPinX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  if (noticeForm.classList.contains('ad-form--disabled')) {
    mainPinY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  } else {
    var mainPinY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_BOTTOM);
  }

  noticeFormAddress.value = mainPinX + ', ' + mainPinY;
};

var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;

noticeFormTitle.setAttribute('required', 'true');
noticeFormTitle.setAttribute('minlength', TITLE_MIN_LENGTH);
noticeFormTitle.setAttribute('maxlength', TITLE_MAX_LENGTH);


var PRICE_MAX_VALUE = 1000000;

noticeFormPrice.setAttribute('required', 'true');
noticeFormPrice.setAttribute('max', PRICE_MAX_VALUE);


noticeFormCapacities.querySelectorAll('option')[2].setAttribute('selected', 'true');

var noGuestsCheck = function () {
  if (noticeFormCapacities.value == 0 && noticeFormRooms.value != 100) {
    noticeFormCapacities.setCustomValidity('Данное значение доступен только для 100 комнат');
  } else {
    noticeFormCapacities.setCustomValidity('');
  }
  if (noticeFormRooms.value == 100 && noticeFormCapacities.value != 0) {
    noticeFormRooms.setCustomValidity('Данное количество комнат предназначего не для гостей');
  } else {
    noticeFormRooms.setCustomValidity('');
  }
};

var capacityCheck = function () {
  if (noticeFormRooms.value < noticeFormCapacities.value) {
    noticeFormCapacities.setCustomValidity('Количество мест должно быть не больше количества комнат');
  } else {
    noticeFormCapacities.setCustomValidity('');
    noticeFormRooms.setCustomValidity('');
  }
};

var roomsCapacitiesChangeHandler = function () {
  if (noticeFormRooms.value == 100 || noticeFormCapacities.value == 0) {
    noGuestsCheck();
  } else {
    capacityCheck();
  }
};

noticeFormRooms.addEventListener('change', roomsCapacitiesChangeHandler);
noticeFormCapacities.addEventListener('change', roomsCapacitiesChangeHandler);
