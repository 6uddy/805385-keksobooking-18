'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var filterForm = document.querySelector('.map__filters');
  var Filters = {
    TYPE: filterForm.querySelector('#housing-type'),
    PRICE: filterForm.querySelector('#housing-price'),
    ROOMS: filterForm.querySelector('#housing-rooms'),
    CAPACITY: filterForm.querySelector('#housing-guests'),
    FEATURES: filterForm.querySelector('#housing-features')
  };

  var enabledFilters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    capacity: 'any',
    features: []
  };

  var lastTimeout;

  var debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };

  window.filtrate = function (array) {
    var changeTypeHandler = function (evt) {
      enabledFilters.type = evt.target.value;
      window.deletePins();
      var func = function () {
        window.setPins(toFiltrate());
      };
      debounce(func);
    };

    var getPriceFilter = function (value, price) {
      switch (value) {
        case 'low':
          return (price < 10000);
        case 'middle':
          return ((price >= 10000) && (price <= 50000));
        case 'high':
          return (price > 50000);
        default:
          return true;
      }
    };

    var changePriceHandler = function (evt) {
      enabledFilters.price = evt.target.value;
      window.deletePins();
      var func = function () {
        window.setPins(toFiltrate());
      };
      debounce(func);
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
      window.deletePins();
      var func = function () {
        window.setPins(toFiltrate());
      };
      debounce(func);
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
      window.deletePins();
      var func = function () {
        window.setPins(toFiltrate());
      };
      debounce(func);
    };

    var getFeaturesFilter = function (value) {
      if (enabledFilters.features.length === 0) {
        return true;
      } else {
        var count = 0;
        var offerFeatures = value.offer.features;
        for (var i = 0; i < enabledFilters.features.length; i++) {
          if (offerFeatures.indexOf(enabledFilters.features[i]) >= 0) {
            count++;
          }
        }
        return (count === enabledFilters.features.length);
      }
    };

    var checkFeatureHandler = function (evt) {
      var target = evt.target;
      var feature = target.value;
      var n = enabledFilters.features.indexOf(feature);
      if (target.checked) {
        enabledFilters.features.push(feature);
      } else {
        enabledFilters.features.splice(n, 1);
      }
      window.deletePins();
      var func = function () {
        window.setPins(toFiltrate());
      };
      debounce(func);
    };

    var toFiltrate = function () {
      window.results = array.filter(function (value) {
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
  };

  window.resetFilters = function () {
    Filters.TYPE.querySelector('option').selected = true;
    Filters.PRICE.querySelector('option').selected = true;
    Filters.ROOMS.querySelector('option').selected = true;
    Filters.CAPACITY.querySelector('option').selected = true;
    var checkboxes = Filters.FEATURES.querySelectorAll('input');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };
})();