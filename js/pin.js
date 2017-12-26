'use strict';

(function () {

  window.pin = {
    address: document.querySelector('#address'),
    mainPin: document.querySelector('.map__pin--main'),
    fragmentPin: document.createDocumentFragment(), // Фрагент для пинов
    pinElementContainer: document.querySelector('.map__pins'), // Тут будут отрисованы пины

    // Добавление всех пинов во фрагмент
    addPinsToFragment: function (obj) {
      for (var j = 0; j < obj.length; j++) {
        window.pin.fragmentPin.appendChild(createPinTemplate(obj[j], j));
      }
    }
  };

  var lastTimeout;
  var debounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.updatePins();
    }, 500);
  };

  // Шаблон для пина
  var createPinTemplate = function (pin, pinId) {
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
  };

  var formFilter = document.querySelector('.map__filters-container');
  //  Функция обновляет список пинов, после применения фильтра
  window.updatePins = function () {
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
    var filteredPins = window.adsData.filter(function (ad) {
      return ad.offer.type === housingType.value || housingType.value === 'any';
    }).filter(function (ad) {
      return priceToRange(ad.offer.price) || housingPrice.value === 'any';
    }).filter(function (ad) {
      return ad.offer.rooms + '' === housingRooms.value || housingRooms.value === 'any';
    }).filter(function (ad) {
      return ad.offer.guests + '' === housingGuests.value || housingGuests.value === 'any';
    }).filter(function (ad) {
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (ad.offer.features.indexOf(checkedFeatures[i].value) === -1) {
          return 0;
        }
      }
      return 1;
    }).slice(0, 6);

    for (var i = 0; i < window.mapPins.length; i++) {
      window.mapPins[i].style.display = 'none';
    }

    for (var j = 0; j < filteredPins.length; j++) {
      window.mapPins[window.adsData.indexOf(filteredPins[j])].style.display = '';
    }

  };

  var housingType = formFilter.querySelector('#housing-type');
  housingType.addEventListener('change', debounce);

  var housingPrice = formFilter.querySelector('#housing-price');
  housingPrice.addEventListener('change', debounce);

  var housingRooms = formFilter.querySelector('#housing-rooms');
  housingRooms.addEventListener('change', debounce);

  var housingGuests = formFilter.querySelector('#housing-guests');
  housingGuests.addEventListener('change', debounce);

  var housingFeatures = formFilter.querySelectorAll('[name=features]');
  for (var i = 0; i < housingFeatures.length; i++) {
    housingFeatures[i].addEventListener('change', debounce);
  }
}
)();
