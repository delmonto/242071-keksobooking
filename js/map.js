'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Данные для объявлений
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Шаблон для объявления
var featuresRandom = FEATURES.sort(compareRandom).splice(randomValue(0, 3), randomValue(3, 5));
var adTemplate = document.querySelector('template').content.querySelector('article.map__card');
var cardElementContainer = document.querySelector('.map'); // Тут будут отрисованы объявления
var pinElementContainer = document.querySelector('.map__pins'); // Тут будут отрисованы пины
var fragmentPin = document.createDocumentFragment();

//
var formFieldsets = document.querySelectorAll('fieldset'); // Поля формы
var mainPin = document.querySelector('.map__pin--main'); // Большой пин с кексом
var map = document.querySelector('.map'); // Карта
var clickedElement = null;
var i = 0;

var ads = generateAdsInfo();
addPinsToFragment(ads);
disableForm(true);

mainPin.addEventListener('mouseup', function () {
  layoutActivate();
  // Добавляю все пины в массив
  var mapPins = document.querySelectorAll('.map__pin');
  // Определяю, на какой пин был клик
  for (i = 1; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', openPin);
    mapPins[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === 70) {
        openPin(evt);
      }
    });
  }
});

//  ---------------------Функции---------------------

// Случайное значение в пределах от min до max
function randomValue(min, max) {
  var rand = Math.random() * (max - min) + min;
  return rand.toFixed(0);
}

// Сортирует массив случайным образом
function compareRandom() {
  return Math.random() - 0.5;
}

// Возвращает ссылку на аватар
function getAvatarLink(indexNumber) {
  var avatarLink = 'img/avatars/user0' + indexNumber + '.png';
  return avatarLink;
}

//  Генерирует массив объявлений
function generateAdsInfo() {
  var adsList = [];
  TITLES.sort(compareRandom);
  for (i = 0; i < 8; i++) {
    var LOCATION_X = randomValue(300, 900);
    var LOCATION_Y = randomValue(100, 500);
    var adsElement = {
      author: {
        avatar: getAvatarLink(i + 1)
      },
      offer: {
        title: TITLES[i],
        address: LOCATION_X + ', ' + LOCATION_Y,
        price: randomValue(1000, 1000000),
        type: TYPES[randomValue(0, 2)],
        rooms: randomValue(1, 5),
        guests: randomValue(1, 10),
        checkin: CHECK_IN_TIMES[randomValue(0, 2)],
        checkout: CHECK_OUT_TIMES[randomValue(0, 2)],
        features: featuresRandom,
        description: '',
        photos: []
      },
      location: {
        x: LOCATION_X,
        y: LOCATION_Y
      }
    };
    adsList.push(adsElement);
  }
  return adsList;
}

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
  for (i = 0; i < featuresRandom.length; i++) {
    var yyy = '<li class="feature feature--' + featuresRandom[i] + '"></li>';
    adElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', yyy);
  }
  // Описание
  adElement.querySelector('ul + p').innerHTML = ad.offer.description;
  return adElement;
}

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

function addPinsToFragment(adsList) {
  for (var j = 0; j < adsList.length; j++) {
    fragmentPin.appendChild(createPinTemplate(adsList[j], j));
  }
}

// Включить / Выключить форму
function disableForm(enable) {
  for (i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = enable;
  }
  document.querySelector('.notice__form').classList.toggle('notice__form--disabled', enable);
}

// Активации формы и карты
function layoutActivate() {
  map.classList.remove('map--faded');
  pinElementContainer.appendChild(fragmentPin);
  disableForm(false);
}

// Обработчик закрытия объявления по нажатию на esc
function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePin();
  }
}

// Открыть объявление
function openPin(evt) {
  if (clickedElement) {
    closePin();
  }
  clickedElement = evt.currentTarget;
  var pinId = clickedElement.dataset.pinId;
  cardElementContainer.appendChild(fillAds(ads[pinId]));
  clickedElement.classList.add('map__pin--active');
  var closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', closePin);
  closeButton.addEventListener('keydown', function (evt2) {
    if (evt2.keyCode === ENTER_KEYCODE) {
      closePin();
    }
  });
  document.addEventListener('keydown', onEscPress);
}

// Закрыть объявление
function closePin() {
  clickedElement.classList.remove('map__pin--active');
  var closeButton = document.querySelector('.popup__close');
  closeButton.removeEventListener('click', closePin);
  var adElement = cardElementContainer.querySelector('.popup');
  cardElementContainer.removeChild(adElement);
  clickedElement = null;
  document.removeEventListener('keydown', onEscPress);
}
