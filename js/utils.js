'use strict';

(function () {
  window.utils = {

    // Случайное значение в пределах от min до max
    randomValue: function (min, max) {
      var rand = Math.random() * (max - min) + min;
      return rand.toFixed(0);
    },

    // Сортирует массив случайным образом
    compareRandom: function () {
      return Math.random() - 0.5;
    },

    // Возвращает ссылку на аватар
    getAvatarLink: function (indexNumber) {
      var avatarLink = 'img/avatars/user0' + indexNumber + '.png';
      return avatarLink;
    },
    // Фотографии квартир
    getPhotosList: function (element) {
      return '<li><img src="' + element + '" width="' + 40 + '"></li>';
    },

    getFeaturesList: function (element) {
      return '<li class="feature feature--' + element + '"></li>';
    },

    showErrorMessage: function (errorMessage) {
      var errorNotification = document.createElement('div');
      errorNotification.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #FF5722;';
      errorNotification.style.position = 'fixed';
      errorNotification.style.margin = '10px';
      errorNotification.style.borderRadius = '5px';
      errorNotification.style.left = 0;
      errorNotification.style.right = 0;
      errorNotification.style.bottom = 0;
      errorNotification.style.fontSize = '18px';
      errorNotification.style.color = 'White';
      errorNotification.style.lineHeight = '48px';
      errorNotification.style.letterSpacing = '1px';
      errorNotification.style.textTransform = 'uppercase';
      errorNotification.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorNotification);
    }

  };
})();
