'use strict';

(function () {
  window.buttonId = 0;

  window.mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;

  /**
   * Создать элементы маркеров карты.
   *
   * @param {object} card - данные
   *
   * @return {Element} элемент маркера
   */
  var createPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinIcon = pinElement.querySelector('.map__pin');
    pinIcon.value = window.cards.indexOf(card);

    pinIcon.style.left = card.location.x + 'px';
    pinIcon.style.top = card.location.y + 'px';

    pinIcon.querySelector('img').src = card.author.avatar;
    pinIcon.querySelector('img').alt = card.offer.title;
    pinIcon.addEventListener('click', window.showCardPopupOnClickHandler);
    return pinIcon;
  };

  window.setPins = function (array) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragmentPins.appendChild(createPin(array[i]));
    }
    window.mapPins.appendChild(fragmentPins);
  };

  window.deletePins = function () {
    var pins = window.mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };
})();
