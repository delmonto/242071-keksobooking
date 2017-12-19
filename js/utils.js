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

    showErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
