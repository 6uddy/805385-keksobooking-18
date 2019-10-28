'use strict';

(function () {
  var DICT_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var create = function (card) {
    var cardElement = document.querySelector('#card').content.cloneNode(true);
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

  var closeCardPopup = function () {
    var pins = document.querySelector('.map__pins');
    var articles = pins.querySelector('article');
    if (articles) {
      pins.removeChild(articles);
    }
  };

  var showCardClickHandler = function (evt) {
    var targetPin = evt.target;
    var num = targetPin.firstChild ? targetPin.value : targetPin.parentElement.value;
    var fragment = document.createDocumentFragment();
    var pins = document.querySelector('.map__pins');
    closeCardPopup();
    fragment.appendChild(create(window.cards[num]));
    pins.appendChild(fragment);
    var closeButton = document.querySelector('.map__pins').querySelector('.popup__close');
    closeButton.addEventListener('click', closeCardPopup);
    closeButton.addEventListener('keydown', function (evtEnter) {
      window.utils.isEntered(evtEnter, closeCardPopup);
    });
    document.addEventListener('keydown', function (evtEsc) {
      window.utils.isEscaped(evtEsc, closeCardPopup);
    });
  };

  window.card = {
    showCardClickHandler: showCardClickHandler,
  };
})();

