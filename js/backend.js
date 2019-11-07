'use strict';

(function () {

  var TIMEOUT = 10000;

  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var errorTemplate = document.querySelector('#error').content;

  var errorHandler = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElement);
  };

  var requestHandler = function (onLoad, xhr) {
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

    xhr.addEventListener('timeout', function () {
      errorHandler('Ошибка ответа от сервера ' + xhr.timeout / 1000 + ' с');
    });
  }

  window.backend = {
    download: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
      requestHandler(onLoad, xhr);
    },

    upload: function (data, onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
      requestHandler(onLoad, xhr);
    }
  };
})();
