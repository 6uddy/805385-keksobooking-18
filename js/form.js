'use strict';

(function () {
  window.noticeForm = document.querySelector('.ad-form');
  window.noticeFormAddress = window.noticeForm.querySelector('#address');

  var noticeFormFields = window.noticeForm.querySelectorAll('fieldset');
  var noticeFormTitle = window.noticeForm.querySelector('#title');
  var noticeFormPrice = window.noticeForm.querySelector('#price');
  var noticeFormType = window.noticeForm.querySelector('#type');
  var noticeFormCheckin = window.noticeForm.querySelector('#timein');
  var noticeFormCheckout = window.noticeForm.querySelector('#timeout');
  var noticeFormRooms = window.noticeForm.querySelector('#room_number');
  var noticeFormCapacities = window.noticeForm.querySelector('#capacity');

  window.activateNoticeForm = function () {
    window.noticeForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < noticeFormFields.length; i++) {
      noticeFormFields[i].removeAttribute('disabled');
    }
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
    if (Number(noticeFormCapacities.value) === 0 && Number(noticeFormRooms.value) !== 100) {
      noticeFormCapacities.setCustomValidity('Данное значение доступен только для 100 комнат');
    } else {
      noticeFormCapacities.setCustomValidity('');
    }
    if (Number(noticeFormRooms.value) === 100 && Number(noticeFormCapacities.value) !== 0) {
      noticeFormRooms.setCustomValidity('Данное количество комнат предназначего не для гостей');
    } else {
      noticeFormRooms.setCustomValidity('');
    }
  };

  var capacityCheck = function () {
    if (Number(noticeFormRooms.value) < Number(noticeFormCapacities.value)) {
      noticeFormCapacities.setCustomValidity('Количество мест должно быть не больше количества комнат');
    } else {
      noticeFormCapacities.setCustomValidity('');
      noticeFormRooms.setCustomValidity('');
    }
  };

  var roomsCapacitiesChangeHandler = function () {
    if (Number(noticeFormRooms.value) === 100 || Number(noticeFormCapacities.value) === 0) {
      noGuestsCheck();
    } else {
      capacityCheck();
    }
  };

  noticeFormRooms.addEventListener('change', roomsCapacitiesChangeHandler);
  noticeFormCapacities.addEventListener('change', roomsCapacitiesChangeHandler);


  var MAX_PRICE = 1000000;

  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  var priceHandler = function () {
    if (noticeFormType.selectedIndex === 0) {
      noticeFormPrice.setAttribute('min', BUNGALO_MIN_PRICE);
    }
    if (noticeFormType.selectedIndex === 1) {
      noticeFormPrice.setAttribute('min', FLAT_MIN_PRICE);
    }
    if (noticeFormType.selectedIndex === 2) {
      noticeFormPrice.setAttribute('min', HOUSE_MIN_PRICE);
    }
    if (noticeFormType.selectedIndex === 3) {
      noticeFormPrice.setAttribute('min', PALACE_MIN_PRICE);
    }
  };

  noticeFormPrice.setAttribute('required', 'true');
  noticeFormPrice.setAttribute('max', MAX_PRICE);
  noticeFormPrice.addEventListener('input', priceHandler);
  noticeFormPrice.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value > MAX_PRICE) {
      target.setCustomValidity('Максимально цена: ' + MAX_PRICE);
    } else {
      target.setCustomValidity('');
    }
  });

  noticeFormType.addEventListener('input', priceHandler);

  noticeFormCheckin.addEventListener('change', function (evt) {
    noticeFormCheckout.value = evt.target.value;
  });
  noticeFormCheckout.addEventListener('change', function (evt) {
    noticeFormCheckin.value = evt.target.value;
  });
})();