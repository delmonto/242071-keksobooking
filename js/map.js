'use strict';

(function () {
  window.form.disableForm(true);

  var renderLoadedPins = function (data) {
    window.adsData = data;
  };
  window.backend.load(renderLoadedPins, window.utils.showErrorMessage);

  window.mainPin.addEventListener('mouseup', function () {
    window.form.layoutActivate();
    // Добавляю все пины в массив
    window.mapPins = document.querySelectorAll('.map__pin');
    // Определяю, на какой пин был клик
    for (var i = 1; i < window.mapPins.length; i++) {
      window.mapPins[i].addEventListener('click', window.showCard);
      window.mapPins[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === 70) {
          window.showCard(evt);
        }
      });
    }
  });
}
)();
