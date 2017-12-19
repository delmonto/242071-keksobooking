'use strict';

(function () {
  window.data = {
    generateAdsInfo: function () {
      var adsList = [];
      TITLES.sort(window.utils.compareRandom);
      for (var i = 0; i < 8; i++) {
        var LOCATION_X = window.utils.randomValue(300, 900);
        var LOCATION_Y = window.utils.randomValue(100, 500);
        var adsElement = {
          author: {
            avatar: window.utils.getAvatarLink(i + 1)
          },
          offer: {
            title: TITLES[i],
            address: LOCATION_X + ', ' + LOCATION_Y,
            price: window.utils.randomValue(1000, 1000000),
            type: TYPES[window.utils.randomValue(0, 2)],
            rooms: window.utils.randomValue(1, 5),
            guests: window.utils.randomValue(1, 10),
            checkin: window.data.CHECK_IN_TIMES[window.utils.randomValue(0, 2)],
            checkout: window.data.CHECK_OUT_TIMES[window.utils.randomValue(0, 2)],
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
    },
    // Данные для объявлений
    MIN_PRICE: ['1000', '0', '5000', '10000'],
    CHECK_IN_TIMES: ['12:00', '13:00', '14:00'],
    CHECK_OUT_TIMES: ['12:00', '13:00', '14:00'],
  };

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  window.featuresRandom = FEATURES.sort(window.utils.compareRandom).splice(window.utils.randomValue(0, 3), window.utils.randomValue(3, 5));
})();
