'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main'); // Большой пин с кексом
  // Шаблон для пина
  window.fragmentPin = document.createDocumentFragment(); // Фрагент для пинов
  var pinHeight = window.mainPin.offsetHeight;

  function createPinTemplate(pin, pinId) {
    var newPin = document.createElement('button');
    newPin.style.left = (pin.location.x - 20) + 'px';
    newPin.style.top = (pin.location.y - 40) + 'px';
    newPin.classList.add('map__pin');
    var img = document.createElement('img');
    img.src = pin.author.avatar;
    img.width = '40';
    img.height = '40';
    img.draggable = false;
    newPin.appendChild(img);
    newPin.dataset.pinId = pinId;
    return newPin;
  }

  // Добавление всех пинов во фрагмент
  window.addPinsToFragment = function (adsList) {
    for (var j = 0; j < adsList.length; j++) {
      window.fragmentPin.appendChild(createPinTemplate(adsList[j], j));
    }
  };

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Определение текущих координат
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Функция определения координат смещения
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // Координаты смещения
      var shiftCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // Конечные координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // Текущие координаты пина
      var currentCoords = {
        x: window.mainPin.offsetLeft - shiftCoords.x,
        y: window.mainPin.offsetTop - shiftCoords.y
      };

      window.mainPin.style.left = currentCoords.x + 'px';

      if (currentCoords.y >= 100 && currentCoords.y <= 500) {
        window.mainPin.style.top = currentCoords.y + 'px';
      }

      window.address.placeholder = 'x: ' + (currentCoords.x) + ', y: ' + (currentCoords.y + 10 + Math.round(pinHeight / 2));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
)();
