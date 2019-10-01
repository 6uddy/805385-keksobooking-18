'use strict';

(function () {

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

  var ROOM_MAX = 5;
  var GUESTS_MAX = 10;

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
   * @return {Array}
   */
  window.generateCards = function () {
    var cards = [];
    for (var i = 0; i < CARDS_COUNT; i++) {
      var locationX = getRandomIntBetween(window.MAP_X_MIN, window.MAP_X_MAX);
      var locationY = getRandomIntBetween(window.MAP_Y_MIN, window.MAP_Y_MAX);
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

})();
