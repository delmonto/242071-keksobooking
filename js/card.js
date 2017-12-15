'use strict';

(function () {
  // Шаблон для объявления
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var adTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var adElementContainer = document.querySelector('.map'); // Тут будут отрисованы объявления
  var clickedElement = null;

  // Заполнение шаблона объявления данными
  function fillAds(ad) {
    var adElement = adTemplate.cloneNode(true);
    adElement.querySelector('.popup__avatar').src = ad.author.avatar; // Аватар
    adElement.querySelector('h3').textContent = ad.offer.title; // Заголовок объявления
    adElement.querySelector('p small').textContent = ad.offer.address; // Адрес
    adElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#8381;/ночь'; // Цена
    // Тип жилья
    if (ad.offer.type === 'flat') {
      adElement.querySelector('h4').textContent = 'Квартира';
    } else if (ad.offer.type === 'bungalo') {
      adElement.querySelector('h4').textContent = 'Бунгало';
    } else {
      adElement.querySelector('h4').textContent = 'Дом';
    }
    adElement.querySelector('h4 + p').innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей'; // Количество гостей и комнат
    adElement.querySelector('p:nth-child(8)').innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout; // Время заезда и выезда
    // Иконки доступных удобств. Очищаю всех потомков .popup__features
    adElement.querySelector('.popup__features').removeChild(adElement.querySelector('.popup__features li'));
    while (adElement.querySelector('.popup__features').lastChild) {
      adElement.querySelector('.popup__features').removeChild(adElement.querySelector('.popup__features').lastChild);
    }
    // Вставляю новые строки <li>, содержащие информацию о доступных удобствах
    for (var i = 0; i < window.featuresRandom.length; i++) {
      var yyy = '<li class="feature feature--' + window.featuresRandom[i] + '"></li>';
      adElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', yyy);
    }
    // Описание
    adElement.querySelector('ul + p').innerHTML = ad.offer.description;
    return adElement;
  }

  // Открыть объявление
  window.openPin = function (evt) {
    if (clickedElement) {
      closePin();
    }
    clickedElement = evt.currentTarget;
    var pinId = clickedElement.dataset.pinId;
    adElementContainer.appendChild(fillAds(window.ads[pinId]));
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
  function closePin() {
    clickedElement.classList.remove('map__pin--active');
    var closeButton = document.querySelector('.popup__close');
    closeButton.removeEventListener('click', closePin);
    var adElement = adElementContainer.querySelector('.popup');
    adElementContainer.removeChild(adElement);
    clickedElement = null;
    document.removeEventListener('keydown', onEscPress);
  }

  // Обработчик закрытия объявления по нажатию на esc
  function onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePin();
    }
  }
})();
