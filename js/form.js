'use strict';

(function () {

  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;

  var PRICE_MAX_VALUE = 1000000;

  var MAX_PRICE = 1000000;

  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var MIN_ROOMS = 0;
  var MAX_ROOMS = 100;

  var successTemplate = document.querySelector('#success').content;

  var noticeForm = document.querySelector('.ad-form');
  var noticeFormAddress = noticeForm.querySelector('#address');

  var noticeFormFields = noticeForm.querySelectorAll('fieldset');
  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormPrice = noticeForm.querySelector('#price');
  var noticeFormType = noticeForm.querySelector('#type');
  var noticeFormCheckin = noticeForm.querySelector('#timein');
  var noticeFormCheckout = noticeForm.querySelector('#timeout');
  var noticeFormRooms = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var resetButton = document.querySelector('.ad-form__reset');


  var activate = function () {
    noticeForm.classList.remove('ad-form--disabled');
    noticeFormFields.forEach(function (el) {
      el.removeAttribute('disabled');
    });
  };

  var deactivate = function () {
    noticeForm.reset();
    noticeForm.classList.add('ad-form--disabled');
    noticeFormFields.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  };

  noticeFormTitle.setAttribute('required', 'true');
  noticeFormTitle.setAttribute('minlength', TITLE_MIN_LENGTH);
  noticeFormTitle.setAttribute('maxlength', TITLE_MAX_LENGTH);

  noticeFormPrice.setAttribute('required', 'true');
  noticeFormPrice.setAttribute('max', PRICE_MAX_VALUE);

  noticeFormCapacities.querySelectorAll('option')[2].setAttribute('selected', 'true');

  var noGuestsCheck = function () {
    if (Number(noticeFormCapacities.value) === MIN_ROOMS && Number(noticeFormRooms.value) !== MAX_ROOMS) {
      noticeFormCapacities.setCustomValidity('Данное значение доступен только для 100 комнат');
    } else {
      noticeFormCapacities.setCustomValidity('');
    }
    if (Number(noticeFormRooms.value) === MAX_ROOMS && Number(noticeFormCapacities.value) !== MIN_ROOMS) {
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
    if (Number(noticeFormRooms.value) === MAX_ROOMS || Number(noticeFormCapacities.value) === MIN_ROOMS) {
      noGuestsCheck();
    } else {
      capacityCheck();
    }
  };

  noticeFormRooms.addEventListener('change', roomsCapacitiesChangeHandler);
  noticeFormCapacities.addEventListener('change', roomsCapacitiesChangeHandler);


  var priceHandler = function () {
    switch (noticeFormType.value) {
      case 'flat':
        noticeFormPrice.setAttribute('min', FLAT_MIN_PRICE);
        break;
      case 'house':
        noticeFormPrice.setAttribute('min', HOUSE_MIN_PRICE);
        break;
      case 'palace':
        noticeFormPrice.setAttribute('min', PALACE_MIN_PRICE);
        break;
      case 'bungalo':
        noticeFormPrice.setAttribute('min', BUNGALO_MIN_PRICE);
        break;
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

  resetButton.addEventListener('click', function () {
    deactivate();
    window.map.deactivate();
    window.filters.reset();
    window.avatar.clear();
    window.photos.clear();
  });

  var successShow = function () {
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    document.addEventListener('click', removeSuccess);

    document.addEventListener('keydown', function (evtEsc) {
      window.utils.isEscaped(evtEsc, removeSuccess);
    });
  };

  var removeSuccess = function () {
    var element = document.querySelector('main').querySelector('.success');
    if (element) {
      element.remove();
    }
  };

  var successHandler = function () {
    deactivate();
    window.map.deactivate();
    window.filters.reset();
    window.avatar.clear();
    window.photos.clear();
    successShow();
  };

  noticeForm.addEventListener('submit', function (evt) {
    noticeFormAddress.removeAttribute('disabled');
    window.backend.upload(new FormData(noticeForm), successHandler);
    evt.preventDefault();
  });

  window.addEventListener('load', function () {
    deactivate();
  });

  window.form = {
    activate: activate
  };
})();
