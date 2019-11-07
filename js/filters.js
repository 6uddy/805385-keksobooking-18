'use strict';

(function () {

  var PRICE_MIDDLE = 10000;
  var PRICE_HIGH = 50000;

  var filterForm = document.querySelector('.map__filters');
  var Filters = {
    TYPE: filterForm.querySelector('#housing-type'),
    PRICE: filterForm.querySelector('#housing-price'),
    ROOMS: filterForm.querySelector('#housing-rooms'),
    CAPACITY: filterForm.querySelector('#housing-guests'),
    FEATURES: filterForm.querySelector('#housing-features'),
  };

  var enabledFilters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    capacity: 'any',
    features: []
  };

  var changeTypeHandler = function (evt) {
    enabledFilters.type = evt.target.value;
    window.pins.remove();
    window.card.closeCardPopup();
    var func = function () {
      window.pins.set(filtrate());
    };
    window.utils.debounce(func);
  };

  var getPriceFilter = function (value, price) {
    switch (value) {
      case 'low':
        return (price < PRICE_MIDDLE);
      case 'middle':
        return ((price >= PRICE_MIDDLE) && (price <= PRICE_HIGH));
      case 'high':
        return (price > PRICE_HIGH);
      default:
        return true;
    }
  };

  var changePriceHandler = function (evt) {
    enabledFilters.price = evt.target.value;
    window.pins.remove();
    window.card.closeCardPopup();
    var func = function () {
      window.pins.set(filtrate());
    };
    window.utils.debounce(func);
  };

  var getRoomsFilter = function (value, rooms) {
    switch (value) {
      case '1':
        return (rooms === 1);
      case '2':
        return (rooms === 2);
      case '3':
        return (rooms === 3);
      default:
        return true;
    }
  };

  var changeRoomsHandler = function (evt) {
    enabledFilters.rooms = evt.target.value;
    window.pins.remove();
    window.card.closeCardPopup();
    var func = function () {
      window.pins.set(filtrate());
    };
    window.utils.debounce(func);
  };

  var getGuestsFilter = function (value, guests) {
    switch (value) {
      case '1':
        return (guests === 1);
      case '2':
        return (guests === 2);
      default:
        return true;
    }
  };

  var changeCapacityHandler = function (evt) {
    enabledFilters.capacity = evt.target.value;
    window.pins.remove();
    window.card.closeCardPopup();
    var func = function () {
      window.pins.set(filtrate());
    };
    window.utils.debounce(func);
  };

  var getFeaturesFilter = function (value) {
    if (enabledFilters.features.length === 0) {
      return true;
    } else {
      var count = 0;
      var offerFeatures = value.offer.features;
      enabledFilters.features.forEach(function (el) {
        if (offerFeatures.indexOf(el) >= 0) {
          count++;
        }
      });
      return (count === enabledFilters.features.length);
    }
  };

  var checkFeatureHandler = function (evt) {
    if (evt.target.classList.contains('map__checkbox')) {
      var target = evt.target;
      var feature = target.value;
      var n = enabledFilters.features.indexOf(feature);
      if (target.checked) {
        enabledFilters.features.push(feature);
      } else {
        enabledFilters.features.splice(n, 1);
      }
    }
    window.pins.remove();
    window.card.closeCardPopup();
    var func = function () {
      window.pins.set(filtrate());
    };
    window.utils.debounce(func);
  };

  var filtrate = function () {
    window.results = window.cards.filter(function (value) {
      var result = (((enabledFilters.type === 'any') || (value.offer.type === enabledFilters.type)) &&
        ((enabledFilters.price === 'any') || (getPriceFilter(enabledFilters.price, value.offer.price))) &&
        ((enabledFilters.rooms === 'any') || (getRoomsFilter(enabledFilters.rooms, value.offer.rooms))) &&
        ((enabledFilters.capacity === 'any') || (getGuestsFilter(enabledFilters.capacity, value.offer.guests)))) &&
        ((enabledFilters.features === []) || (getFeaturesFilter(value)));
      return result;
    });
    if (window.results.length > 5) {
      window.results.length = 5;
    }
    return window.results;
  };

  Filters.FEATURES.addEventListener('click', checkFeatureHandler);
  Filters.TYPE.addEventListener('change', changeTypeHandler);
  Filters.PRICE.addEventListener('change', changePriceHandler);
  Filters.ROOMS.addEventListener('change', changeRoomsHandler);
  Filters.CAPACITY.addEventListener('change', changeCapacityHandler);

  var reset = function () {
    filterForm.reset();
  };

  window.filters = {
    filtrate: filtrate,
    reset: reset,
  };
})();
