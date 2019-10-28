'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  var createPin = function (card) {
    var pinElement = document.querySelector('#pin').content.cloneNode(true);
    var pinIcon = pinElement.querySelector('.map__pin');
    pinIcon.value = window.cards.indexOf(card);

    pinIcon.style.left = card.location.x + 'px';
    pinIcon.style.top = card.location.y + 'px';

    pinIcon.querySelector('img').src = card.author.avatar;
    pinIcon.querySelector('img').alt = card.offer.title;
    pinIcon.addEventListener('click', window.card.showCardClickHandler);
    return pinIcon;
  };

  var set = function (array) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragmentPins.appendChild(createPin(array[i]));
    }
    mapPins.appendChild(fragmentPins);
  };

  var remove = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  window.pins = {
    set: set,
    remove: remove
  };
})();