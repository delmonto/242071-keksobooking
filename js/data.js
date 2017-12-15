'use strict';

(function () {
// Данные для объявлений
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  window.featuresRandom = FEATURES.sort(compareRandom).splice(randomValue(0, 3), randomValue(3, 5));

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
  window.generateAdsInfo = function () {
    var adsList = [];
    TITLES.sort(compareRandom);
    for (var i = 0; i < 8; i++) {
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
          features: window.featuresRandom,
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
  };
})();
