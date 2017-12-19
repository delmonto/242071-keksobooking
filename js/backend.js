'use strict';

(function () {
  var DOWNLOAD_URL = 'https://1510.dump.academy/keksobooking/data';
  // var UPLOAD_URL = 'https://1510.dump.academy/keksobooking/';
  var TIMEOUT = 5000;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
      });

      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
    },
    // save: function (data, onLoad, onError) {
    // }
  };

})();
