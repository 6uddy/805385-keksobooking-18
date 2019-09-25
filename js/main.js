'use strict';

// constants

var CARDS_COUNT = 8;

var CARD_TITLES = [
  'Большой дворец ',
  'Маленький дворец',
  'Большая квартира',
  'Маленькая квартира',
  'Большой дом',
  'Маленький дом',
  'Большое бунгало',
  'Маленькие бунгало'];

var CARD_DESCRIPTIONS = [
  'Описпние №1',
  'Описпние №2',
  'Описпние №3',
  'Описпние №4',
  'Описпние №5',
  'Описпние №6',
  'Описпние №7',
  'Описпние №8'];

var CARD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

var CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'];


var CARD_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'];

var CARD_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var PRICE_MIN = 1000;
var PRICE_MAX = 10000;


var MAP_X_MIN = 0;
var MAP_X_MAX = 1200;

var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;


var ROOM_MAX = 5;
var GUESTS_MAX = 10;

// generation

/**
 * Вернуть слуйчайно целое число в диапазоне.
 *
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 *
 * @return {number} - случайное целое число из диапазона
 */
var getRandomIntBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Сортирует случайным образом входной массива и возвращает его часть.
 *
 * @param {Array}  array - входной массив
 * @return {Array} - выходной массив
 */
var getRandomSubArray = function (array) {
  array.sort(function () {
    return Math.random() - 0.5;
  });
  return array.slice(0, getRandomIntBetween(1, array.length));
};

/**
 * Возвращает адрес аватара.
 *
 * @param {number} id
 * @return {string} - путь до аватара
 */
var getAvatar = function (id) {
  return 'img/avatars/user0' + (id + 1) + '.png';
};

/**
 * Генерация моков.
 *
 * @param {number} count - количество генерируемых карточек.
 *
 * @return {Array}
 */
var generateCards = function (count) {
  var cards = [];
  for (var i = 0; i < count; i++) {
    var locationX = getRandomIntBetween(MAP_X_MIN, MAP_X_MAX);
    var locationY = getRandomIntBetween(MAP_Y_MIN, MAP_Y_MAX);
    cards.push({
      author: {
        avatar: getAvatar(i),
      },
      offer: {
        title: CARD_TITLES[i],
        address: locationX + ', ' + locationY,
        price: getRandomIntBetween(PRICE_MIN, PRICE_MAX),
        type: CARD_TYPES[getRandomIntBetween(0, CARD_TYPES.length - 1)],
        rooms: getRandomIntBetween(1, ROOM_MAX),
        guests: getRandomIntBetween(1, GUESTS_MAX),
        checkin: CHECKIN_TIME[getRandomIntBetween(0, CHECKIN_TIME.length - 1)],
        checkout: CHECKIN_TIME[getRandomIntBetween(0, CHECKIN_TIME.length - 1)],
        features: getRandomSubArray(CARD_FEATURES),
        description: CARD_DESCRIPTIONS[i],
        photos: CARD_PHOTOS.sort(function () {
          return Math.random() - 0.5;
        }),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    });
  }
  return cards;
};

var pinTemplate = document.querySelector('#pin').content;

var cardTemplate = document.querySelector('#card').content;

// render

/**
 * Переключить карту в активное состояние (временное решение).
 */
var showMap = function () {
  var mapBlock = document.querySelector('.map');
  mapBlock.classList.remove('map--faded');
};

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
  return pinIcon;
};


var convertTypeToRus = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
};

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
  mapCard.querySelector('.popup__type').textContent = convertTypeToRus(card.offer.type);
  mapCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var featuresElement = mapCard.querySelector('.popup__features');
  // Костыль 1?
  featuresElement.innerHTML = '';
  for (var i = 0; i < card.offer.features.length; i++) {
    featuresElement.insertAdjacentHTML('afterbegin', '<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>');
  }

  mapCard.querySelector('.popup__description').textContent = card.offer.description;

  var photosElement = mapCard.querySelector('.popup__photos');
  // Костыль 2?
  photosElement.querySelector('.popup__photo').remove();
  for (i = 0; i < card.offer.photos.length; i++) {
    photosElement.insertAdjacentHTML('afterbegin', '<img class="popup__photo" src="' + card.offer.photos[i] + '" width="45" height="40">');
  }

  mapCard.querySelector('.popup__avatar').src = card.author.avatar;
  return mapCard;
};

var generatedCards = generateCards(CARDS_COUNT);

/**
 * Установка маркеров на карту.
 */
var setPins = function () {
  var fragmentPins = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  for (var i = 0; i < generatedCards.length; i++) {
    fragmentPins.appendChild(createPin(generatedCards[i]));
  }
  mapPins.appendChild(fragmentPins);
};

/**
 * Установка карточки маркера.
 */
var setCard = function () {
  var mapCard = document.querySelector('.map__filters-container');
  var fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(createCard(generatedCards[0]));
  mapCard.before(fragmentCard);
};

// execution

showMap();
setPins();
setCard();
