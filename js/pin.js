'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main'); // Большой пин с кексом
  window.fragmentPin = document.createDocumentFragment(); // Фрагент для пинов
  var pinHeight = window.mainPin.offsetHeight;
  window.pinElementContainer = document.querySelector('.map__pins'); // Тут будут отрисованы пины

  // Шаблон для пина
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

  var formFilter = document.querySelector('.map__filters-container');
  //  Функция обновляет список пинов, после применения фильтра
  var updatePins = function () {
    window.updateTimeout = 0;
    // Функция опеределяет в каком диапазоне находится цена
    var priceToRange = function (price) {
      if (housingPrice.value === null) {
        return true;
      } else if (housingPrice.value === 'low') {
        return price < 10000;
      } else if (housingPrice.value === 'high') {
        return price > 50000;
      }
      return price >= 10000 && price <= 50000;
    };

    var checkedFeatures = document.querySelectorAll('[name=features]:checked');

    // Фильтрация массива по условиям
    var filteredPins = window.adsData.filter(function (it) {
      return it.offer.type === housingType.value || housingType.value === 'any';
    }).filter(function (it) {
      return priceToRange(it.offer.price) || housingPrice.value === 'any';
    }).filter(function (it) {
      return it.offer.rooms + '' === housingRooms.value || housingRooms.value === 'any';
    }).filter(function (it) {
      return it.offer.guests + '' === housingGuests.value || housingGuests.value === 'any';
    }).filter(function (it) {
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (it.offer.features.indexOf(checkedFeatures[i].value) === -1) {
          return 0;
        }
      }
      return 1;
    });
    for (var i = 0; i < window.mapPins.length; i++) {
      window.mapPins[i].style.display = 'none';
    }

    for (var j = 0; j < filteredPins.length; j++) {
      window.mapPins[window.adsData.indexOf(filteredPins[j])].style.display = '';
    }
  };

  var debounce = function () {
    if (window.updateTimeout) {
      return;
    }
    window.updateTimeout = setTimeout(updatePins, 500);
  };

  var housingType = formFilter.querySelector('#housing-type');
  housingType.addEventListener('change', debounce);

  var housingPrice = formFilter.querySelector('#housing-price');
  housingPrice.addEventListener('change', debounce);

  var housingRooms = formFilter.querySelector('#housing-rooms');
  housingRooms.addEventListener('change', debounce);

  var housingGuests = formFilter.querySelector('#housing-guests');
  housingGuests.addEventListener('change', debounce);

  var filterWifi = formFilter.querySelectorAll('[name=features]');
  for (var i = 0; i < filterWifi.length; i++) {
    filterWifi[i].addEventListener('change', debounce);
  }

  // Добавление всех пинов во фрагмент
  window.addPinsToFragment = function (obj) {
    for (var j = 0; j < obj.length; j++) {
      window.fragmentPin.appendChild(createPinTemplate(obj[j], j));
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

      window.address.value = 'x: ' + (currentCoords.x) + ', y: ' + (currentCoords.y + 10 + Math.round(pinHeight / 2));
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
