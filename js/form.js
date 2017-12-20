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
  var pinElementContainer = document.querySelector('.map__pins'); // Тут будут отрисованы пины
  window.address = document.querySelector('#address');

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
      pinElementContainer.appendChild(window.fragmentPin);
      window.form.disableForm(false);
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
  var roomNumberValues = valuesToArray(roomNumber);
  var roomCapacityValues = valuesToArray(roomCapacity);

  // Callback функция синхронизации времени заезда и выезда
  var syncValues = function (element, value) {
    element.value = value;
  };

  // Callback функция синхронизации типа жилья и стоимости за ночь
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Синхронизация полей
  var timeInSelectSync = function () {
    window.sync(timeInSelect, timeOutSelect, window.data.CHECK_IN_TIMES, window.data.CHECK_OUT_TIMES, syncValues);
  };

  var timeOutSelectSync = function () {
    window.sync(timeOutSelect, timeInSelect, window.data.CHECK_OUT_TIMES, window.data.CHECK_IN_TIMES, syncValues);
  };

  var flatTypeSync = function () {
    window.sync(flatType, flatPrice, flatTypeValues, window.data.MIN_PRICE, syncValueWithMin);
  };

  var roomNumberSelectSync = function () {
    window.sync(roomNumber, roomCapacity, roomNumberValues, roomCapacityValues, syncValues);
  };

  var roomCapacitySelectSync = function () {
    window.sync(roomCapacity, roomNumber, roomCapacityValues, roomNumberValues, syncValues);
  };

  // Listener для полей, которые будут синхронизироваться
  timeInSelect.addEventListener('change', timeInSelectSync);
  timeOutSelect.addEventListener('change', timeOutSelectSync);
  flatType.addEventListener('change', flatTypeSync);
  roomNumber.addEventListener('change', roomNumberSelectSync);
  roomCapacity.addEventListener('change', roomCapacitySelectSync);

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
  window.address.addEventListener('invalid', function () {
    if (window.address.validity.valueMissing) {
      window.address.setCustomValidity('Обязательное поле');
      window.address.style.border = '2px solid red';
    } else {
      window.address.setCustomValidity('');
      window.address.style.border = 'none';
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
  }

  var form = document.querySelector('.notice__form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), getDataSend, window.utils.showErrorMessage);
  });
}
)();
