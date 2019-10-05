'use strict';

(function () {
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

    pinIcon.style.left = card.location.x + 'px';
    pinIcon.style.top = card.location.y + 'px';

    pinIcon.querySelector('img').src = card.author.avatar;
    pinIcon.querySelector('img').alt = card.offer.title;
    pinIcon.addEventListener('click', window.showCardPopupOnClickHandler);
    return pinIcon;
  };

  /**
   * Установка маркеров на карту.
   */
  window.setPins = function () {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < window.cards.length; i++) {
      fragmentPins.appendChild(createPin(window.cards[i]));
    }
    window.mapPins.appendChild(fragmentPins);
  };
})();
