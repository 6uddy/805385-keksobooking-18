'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;

  var loader = document.createElement('script');
  loader.src = 'https://js.dump.academy/keksobooking/data';

  var uploader = document.createElement('script');
  uploader.src = 'https://js.dump.academy/keksobooking';

  window.addEventListener('load', function () {
    download(onLoadDataHandler, window.errorHandler);
  });

  var onLoadDataHandler = function (data) {
    window.cards = data;
  };

  window.errorHandler = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElement);
  };

  window.successShow = function () {
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    document.addEventListener('click', function () {
      document.querySelector('main').querySelector('.success').remove();
    });
  };

  var download = function (onLoad, onError) {
    var URL = loader.src;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();
    xhr.timeout = 10000;

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
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError('Ошибка ответа от сервера ' + xhr.timeout / 1000 + ' с');
    });
  };


  window.upload = function (data, onLoad, onError) {
    var URL = uploader.src;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    xhr.send(data);
    xhr.timeout = 10000;

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
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError('Ошибка ответа от сервера ' + xhr.timeout / 1000 + ' с');
    });
  };
})();
