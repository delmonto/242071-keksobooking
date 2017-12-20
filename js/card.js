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
    // Списки удобств
    adElement.querySelector('.popup__features').innerHTML = '';
    adElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', ad.offer.features.map(window.utils.getFeaturesList).join(' '));
    // Описание
    adElement.querySelector('ul + p').innerHTML = ad.offer.description;
    // Фото квартир
    adElement.querySelector('.popup__pictures').innerHTML = '';
    adElement.querySelector('.popup__pictures').insertAdjacentHTML('beforeend', ad.offer.photos.map(window.utils.getPhotosList).join(' '));
    return adElement;
  };

})();
