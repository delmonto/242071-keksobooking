'use strict';

(function () {
  // Шаблон для объявления

  var adTemplate = document.querySelector('template').content.querySelector('article.map__card');

  // Заполнение шаблона объявления данными
  window.fillAds = function (ad) {
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
  };

})();
