'use strict';

(function () {

  var MAX_FILTER_RESULTS = 5;

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

  var getFeaturesFilter = function (features) {
    var checkedFeatures = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'));
    return Array.prototype.slice.call(checkedFeatures).every(function (item) {
      return features.indexOf(item.value) >= 0;
    });
  };

  var filtrate = function () {
    return window.cards.filter(function (value) {
      var typeValue = Filters.TYPE.value;
      var roomsValue = Filters.ROOMS.value;
      var capacityValue = Filters.CAPACITY.value;
      var priceValue = Filters.PRICE.value;

      var isTypeCompared = typeValue === 'any' ? true : value.offer.type === typeValue;
      var isRoomsCompared = roomsValue === 'any' ? true : value.offer.rooms === +roomsValue;
      var isCapacityCompared = capacityValue === 'any' ? true : value.offer.guests === +capacityValue;
      var isPriceCompared = priceValue === 'any' ? true : getPriceFilter(priceValue, value.offer.price);
      var isFeaturesMatched = getFeaturesFilter(value.offer.features);
      return isTypeCompared && isRoomsCompared && isCapacityCompared && isPriceCompared && isFeaturesMatched;
    }).slice(0, MAX_FILTER_RESULTS);
  };

  var handleFormChange = function () {
    window.pins.remove();
    window.card.closePopup();
    var func = function () {
      window.pins.set(filtrate());
    };
    window.utils.debounce(func);
  };

  filterForm.addEventListener('change', handleFormChange);

  var reset = function () {
    filterForm.reset();
  };

  window.filters = {
    filtrate: filtrate,
    reset: reset,
  };
})();
