'use strict';

(function () {
  // Шаблон для пина
  window.fragmentPin = document.createDocumentFragment(); // Фрагент для пинов

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
}
)();
