'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main'); // Большой пин с кексом

  window.ads = window.generateAdsInfo();
  window.addPinsToFragment(window.ads);
  window.disableForm(true);

  mainPin.addEventListener('mouseup', function () {
    window.layoutActivate();
    // Добавляю все пины в массив
    var mapPins = document.querySelectorAll('.map__pin');
    // Определяю, на какой пин был клик
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', window.openPin);
      mapPins[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === 70) {
          window.openPin(evt);
        }
      });
    }
  });
}
)();
