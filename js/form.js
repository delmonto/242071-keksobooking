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
  var address = document.querySelector('#address');
  var price = document.querySelector('#price');
  var map = document.querySelector('.map'); // Карта
  var pinElementContainer = document.querySelector('.map__pins'); // Тут будут отрисованы пины

  // Функция присваивает одно занчение другому
  function syncTime(value1, value2) {
    value1.selectedIndex = value2.selectedIndex;
  }

  // Включить / Выключить форму
  window.disableForm = function (enable) {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = enable;
    }
    document.querySelector('.notice__form').classList.toggle('notice__form--disabled', enable);
  };

  // Активации формы и карты
  window.layoutActivate = function () {
    map.classList.remove('map--faded');
    pinElementContainer.appendChild(window.fragmentPin);
    window.disableForm(false);
  };

  // Синхронизирую время въезда и выезда
  timeInSelect.addEventListener('change', function () {
    syncTime(timeOutSelect, timeInSelect);
  });

  timeOutSelect.addEventListener('change', function () {
    syncTime(timeInSelect, timeOutSelect);
  });

  // Синхронизиркю минимальную цену и тип жилья
  flatType.addEventListener('change', function () {
    if (flatType.selectedIndex === 0) {
      flatPrice.min = '1000';
    }
    if (flatType.selectedIndex === 1) {
      flatPrice.min = '0';
    }
    if (flatType.selectedIndex === 2) {
      flatPrice.min = '5000';
    }
    if (flatType.selectedIndex === 3) {
      flatPrice.min = '10000';
    }
  });

  // Синхронизирую количество комнат и количество гостей
  roomNumber.addEventListener('change', function () {
    if (roomNumber.selectedIndex === 0) {
      roomCapacity.selectedIndex = 2;
    }
    if (roomNumber.selectedIndex === 1) {
      roomCapacity.selectedIndex = 1;
    }
    if (roomNumber.selectedIndex === 2) {
      roomCapacity.selectedIndex = 0;
    }
    if (roomNumber.selectedIndex === 3) {
      roomCapacity.selectedIndex = 3;
    }
  });

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
    if (address.validity.valueMissing) {
      address.setCustomValidity('Обязательное поле');
      address.style.border = '2px solid red';
    } else {
      address.setCustomValidity('');
      address.style.border = 'none';
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
}
)();
