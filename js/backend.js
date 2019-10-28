'use strict';

(function () {

  var TIMEOUT = 10000;

  var loader = document.createElement('script');
  loader.src = 'https://js.dump.academy/keksobooking/data';

  var uploader = document.createElement('script');
  uploader.src = 'https://js.dump.academy/keksobooking';

  var errorHandler = function (message) {
    var errorElement = document.querySelector('#error').content.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElement);
  };

  window.backend = {
    download: function (onLoad) {
      var URL = loader.src;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);
      xhr.send();
      xhr.timeout = TIMEOUT;

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Некорректный запрос';
            break;
          case 401:
            error = 'Ошибка авторизации';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;
          default:
            error = 'Ошибка: ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          errorHandler(error);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Ошибка соединения');
      });

      xhr.timeout = 10000;
      xhr.addEventListener('timeout', function () {
        errorHandler('Ошибка ответа от сервера ' + xhr.timeout / 1000 + ' с');
      });
    },


    upload: function (data, onLoad) {
      var URL = uploader.src;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL);
      xhr.send(data);
      xhr.timeout = TIMEOUT;

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Некорректный запрос';
            break;
          case 401:
            error = 'Ошибка авторизации';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;
          default:
            error = 'Ошибка: ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          errorHandler(error);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Ошибка соединения');
      });

      xhr.timeout = 10000;
      xhr.addEventListener('timeout', function () {
        errorHandler('Ошибка ответа от сервера ' + xhr.timeout / 1000 + ' с');
      });
    },
  };
})();
