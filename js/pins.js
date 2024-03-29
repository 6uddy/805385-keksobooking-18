'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content;

  var mapPins = document.querySelector('.map__pins');

  var createPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinIcon = pinElement.querySelector('.map__pin');
    pinIcon.value = window.cards.indexOf(card);

    pinIcon.style.left = card.location.x + 'px';
    pinIcon.style.top = card.location.y + 'px';

    pinIcon.querySelector('img').src = card.author.avatar;
    pinIcon.querySelector('img').alt = card.offer.title;
    pinIcon.addEventListener('click', window.card.showOnClick);
    return pinIcon;
  };

  var set = function (array) {
    var fragmentPins = document.createDocumentFragment();
    array.forEach(function (el) {
      fragmentPins.appendChild(createPin(el));
    });
    mapPins.appendChild(fragmentPins);
  };

  var remove = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (el) {
      if (!el.classList.contains('map__pin--main')) {
        el.remove();
      }
    });
  };

  window.pins = {
    set: set,
    remove: remove
  };
})();
