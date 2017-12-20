'use strict';

(function () {
  var DOWNLOAD_URL = 'https://1510.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        window.backend.errorCheck(evt, onLoad, onError);
      });

      xhr.timeout = TIMEOUT;

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
      });

      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        window.backend.errorCheck(evt, onLoad, onError);
      });

      xhr.timeout = TIMEOUT;

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
      });

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    },
    errorCheck: function (evt, onLoad, onError) {
      var error;
      switch (evt.target.status) {
        case 200:
          onLoad(evt.target.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + evt.target.status + ' ' + evt.target.statusText;
      }
      return onError(error);
    }
  };

})();
