'use strict';

(function () {
  window.ads = window.data.generateAdsInfo();
  // window.addPinsToFragment(window.ads);
  window.form.disableForm(true);

  var renderLoadedPins = function (data) {
    window.addPinsToFragment(data);
  };
  window.backend.load(renderLoadedPins, window.utils.showErrorMessage);


  window.mainPin.addEventListener('mouseup', function () {
    window.form.layoutActivate();
    // Добавляю все пины в массив
    var mapPins = document.querySelectorAll('.map__pin');
    // Определяю, на какой пин был клик
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', window.showCard);
      mapPins[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === 70) {
          window.showCard(evt);
        }
      });
    }
  });
}
)();
