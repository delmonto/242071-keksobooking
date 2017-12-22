'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var adElementContainer = document.querySelector('.map'); // Тут будут отрисованы объявления
  var clickedElement = null;

  // Открыть объявление
  window.showCard = function (evt) {
    if (clickedElement) {
      closePin();
    }
    clickedElement = evt.currentTarget;
    var pinId = clickedElement.dataset.pinId;
    adElementContainer.appendChild(window.fillAds(window.adsData[pinId]));
    clickedElement.classList.add('map__pin--active');
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', closePin);
    closeButton.addEventListener('keydown', function (evt2) {
      if (evt2.keyCode === ENTER_KEYCODE) {
        closePin();
      }
    });
    document.addEventListener('keydown', onEscPress);
  };
  // Закрыть объявление
  var closePin = function () {
    clickedElement.classList.remove('map__pin--active');
    var closeButton = document.querySelector('.popup__close');
    closeButton.removeEventListener('click', closePin);
    var adElement = adElementContainer.querySelector('.popup');
    adElementContainer.removeChild(adElement);
    clickedElement = null;
    document.removeEventListener('keydown', onEscPress);
  };

  // Обработчик закрытия объявления по нажатию на esc
  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePin();
    }
  };
})();
