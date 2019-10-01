'use strict';

(function () {
  var DICT_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var cardTemplate = document.querySelector('#card').content;

  /**
   * Нарисовать карточку.
   *
   * @param {object} card - данные
   * @return {Element} -элемент карточки
   */
  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var mapCard = cardElement.querySelector('.map__card');

    mapCard.querySelector('.popup__title').textContent = card.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    mapCard.querySelector('.popup__type').textContent = DICT_TYPES[card.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresElement = mapCard.querySelector('.popup__features');
    featuresElement.innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      featuresElement.insertAdjacentHTML('afterbegin', '<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>');
    }

    mapCard.querySelector('.popup__description').textContent = card.offer.description;

    var photosElement = mapCard.querySelector('.popup__photos');
    photosElement.querySelector('.popup__photo').remove();
    for (i = 0; i < card.offer.photos.length; i++) {
      photosElement.insertAdjacentHTML('afterbegin', '<img class="popup__photo" src="' + card.offer.photos[i] + '" width="45" height="40">');
    }

    mapCard.querySelector('.popup__avatar').src = card.author.avatar;
    return mapCard;
  };

  /**
   * Установка карточки маркера.
   */
  var setCard = function () {
    var mapCard = document.querySelector('.map__filters-container');
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(createCard(window.cards[0]));
    mapCard.before(fragmentCard);
  };
  // Для временного прохода eslint(пусть висит пока на странице)
  setCard();
})();
