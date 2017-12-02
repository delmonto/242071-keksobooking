'use strict';

// Функция рандомного значения в пределах от min до max
var randomValue = function (min, max) {
  var rand = Math.random() * (max - min) + min;
  return rand.toFixed(0);
};

// Функция для сортировки массива случайным образом
var compareRandom = function () {
  return Math.random() - 0.5;
};

var obj = [];

// Массивы с данными
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Сортировка массивов случайным образом
titles.sort(compareRandom);
avatars.sort(compareRandom);
var featuresRandom = features.sort(compareRandom).splice(randomValue(0, 3), randomValue(3, 5));

for (var i = 0; i < 8; i++) {
  // Объект с рандомным значением x и y
  var randomLocation = {
    x: randomValue(300, 900),
    y: randomValue(100, 500)
  };
  // Заполнение объекта
  var objTemp = {
    author: {
      avatar: avatars[i]
    },
    offer: {
      title: titles[i],
      address: randomLocation.x + ', ' + randomLocation.y,
      price: randomValue(1000, 1000000),
      type: types[randomValue(0, 2)],
      rooms: randomValue(1, 5),
      guests: randomValue(1, 10),
      checkin: times[randomValue(0, 2)],
      checkout: times[randomValue(0, 2)],
      features: featuresRandom,
      description: '',
      photos: []
    },
    location: {
      x: randomLocation.x,
      y: randomLocation.y
    }
  };
  obj.push(objTemp);
}

// Удалить класс map--faded
document.querySelector('.map').classList.remove('map--faded');

// Тут будут отрисованы метки
var pinElementContainer = document.querySelector('.map__pins');

// Тут будут отрисованы DOM элементы
var cardElementContainer = document.querySelector('.map');

// Шаблон для данных
var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

var fragmentCard = document.createDocumentFragment();

// Функция генерирования меток на карте
var pinTemplateEdit = function (pin) {
  var pinElement = '<button style="left:' + (pin.location.x - 20) + 'px; top:' + (pin.location.y - 40) + 'px;" class="map__pin"><img src="' + pin.author.avatar + '" width="40" height="40" draggable="false"></button>';
  return pinElement;
};

// Функция генерирования объявления
var cardTemplateEdit = function (card) {

  var cardElement = cardTemplate.cloneNode(true);
  // Заголовок объявления
  cardElement.querySelector('h3').textContent = card.offer.title;
  // Адрес
  cardElement.querySelector('p small').textContent = card.offer.address;
  // Цена
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + '&#8381;/ночь';

  // Тип жилья
  if (card.offer.type === 'flat') {
    cardElement.querySelector('h4').textContent = 'Квартира';
  } else if (card.offer.type === 'bungalo') {
    cardElement.querySelector('h4').textContent = 'Бунгало';
  } else {
    cardElement.querySelector('h4').textContent = 'Дом';
  }

  // Количество гостей и комнат
  cardElement.querySelector('h4 + p').innerHTML = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

  // Время заезда и выезда
  cardElement.querySelector('p:nth-child(8)').innerHTML = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  // Все доступные удобства в квартире

  // Чистим всех потомков .popup__features
  cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__features li'));
  while (cardElement.querySelector('.popup__features').lastChild) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__features').lastChild);
  }

  // Вставляем новые строки <li> исходя из элементов массива featuresRandom
  for (var j = 0; j < featuresRandom.length; j++) {
    var yyy = '<li class="feature feature--' + featuresRandom[j] + '"></li>';
    cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', yyy);
  }

  cardElement.querySelector('ul + p').innerHTML = card.offer.description;
  return cardElement;
};

for (var j = 0; j < obj.length; j++) {
  fragmentCard.appendChild(cardTemplateEdit(obj[j]));
  pinElementContainer.insertAdjacentHTML('beforeend', pinTemplateEdit(obj[j]));
}

cardElementContainer.insertBefore(fragmentCard, document.querySelector('.map__filters-container'));
