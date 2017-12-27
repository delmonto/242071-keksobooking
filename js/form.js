'use strict';

(function () {
  var formFieldsets = document.querySelectorAll('fieldset'); // Поля формы
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var flatType = document.querySelector('#type');
  var flatPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var map = document.querySelector('.map'); // Карта
  var address = document.querySelector('#address');

  var MIN_PRICE = ['1000', '0', '5000', '10000'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];
  var ZERO_VALUE = '0';

  window.form = {
    // Включить / Выключить форму
    disableForm: function (enable) {
      for (var i = 0; i < formFieldsets.length; i++) {
        formFieldsets[i].disabled = enable;
      }
      document.querySelector('.notice__form').classList.toggle('notice__form--disabled', enable);
    },

    // Активации формы и карты
    layoutActivate: function () {
      map.classList.remove('map--faded');
      window.pin.addPinsToFragment(window.adsData);
      window.pin.pinElementContainer.appendChild(window.pin.fragmentPin);
      window.form.disableForm(false);
      setTimeout(window.updatePins, 0);
    }
  };

  // Функция делает массив из элементов селектора
  var valuesToArray = function (element) {
    var values = [];
    [].forEach.call(element.options, function (item) {
      values.push(item.value);
    });
    return values;
  };
  var flatTypeValues = valuesToArray(flatType);

  // Callback функция синхронизации времени заезда и выезда
  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncRoomsWithGuests = function (element, value) {
    syncValues(element, value);

    var currentValue = roomCapacity.value;

    Array.from(roomCapacity.options).forEach(function (item) {
      item.disabled = (item.value !== ZERO_VALUE) ? item.value > currentValue : item.value !== currentValue;
    });
  };


  // Callback функция синхронизации типа жилья и стоимости за ночь
  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
  };

  // Синхронизация полей
  var timeInSelectSync = function () {
    window.sync(timeInSelect, timeOutSelect, CHECK_IN_TIMES, CHECK_OUT_TIMES, syncValues);
  };

  var timeOutSelectSync = function () {
    window.sync(timeOutSelect, timeInSelect, CHECK_OUT_TIMES, CHECK_IN_TIMES, syncValues);
  };

  var flatTypeSync = function () {
    window.sync(flatType, flatPrice, flatTypeValues, MIN_PRICE, syncValueWithMin);
  };

  var roomNumberSelectSync = function () {
    window.sync(roomNumber, roomCapacity, ROOMS, GUESTS, syncRoomsWithGuests);
  };

  // Listener для полей, которые будут синхронизироваться
  timeInSelect.addEventListener('change', timeInSelectSync);
  timeOutSelect.addEventListener('change', timeOutSelectSync);
  flatType.addEventListener('change', flatTypeSync);
  roomNumber.addEventListener('change', roomNumberSelectSync);
  // roomCapacity.addEventListener('change', roomCapacitySelectSync);

  // Проверка заголовка объявления
  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
      title.style.border = '2px solid red';
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок объявления не должно превышать 100 символов');
      title.style.border = '2px solid red';
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
      title.style.border = '2px solid red';
    } else {
      title.setCustomValidity('');
      title.style.border = 'none';
    }
  });

  // Проверка адреса
  address.addEventListener('invalid', function () {
    if (window.form.address.validity.valueMissing) {
      window.form.address.setCustomValidity('Обязательное поле');
      window.form.address.style.border = '2px solid red';
    } else {
      window.form.address.setCustomValidity('');
      window.form.address.style.border = 'none';
    }
  });

  // Проверка цены за ночь
  price.addEventListener('invalid', function () {
    if (title.validity.rangeUnderflow) {
      title.setCustomValidity('Минимальное значение — 0');
      title.style.border = '2px solid red';
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальное значение — 1 000 000');
      price.style.border = '2px solid red';
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
      price.style.border = '2px solid red';
    } else {
      price.setCustomValidity('');
      price.style.border = 'none';
    }
  });

  function getDataSend() {
    form.reset();
    address.value = 'x: ' + (window.startCoords.x) + ', y: ' + (window.startCoords.y + 10);
  }

  var form = document.querySelector('.notice__form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), getDataSend, window.utils.showErrorMessage);
  });
}
)();
