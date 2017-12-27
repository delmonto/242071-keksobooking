'use strict';

(function () {
  var layoutBody = document.querySelector('body');
  var address = document.querySelector('#address');

  var pinCoordX = window.pin.mainPin.offsetLeft;
  var pinCoordY = window.pin.mainPin.offsetTop;
  var pinHeight = window.pin.mainPin.offsetHeight;

  var limitTopY = 100;
  var limitBottomY = 500;
  var limitLeftX = layoutBody.offsetLeft;
  var limitRightX = layoutBody.offsetLeft + layoutBody.offsetWidth;

  // Присваиваю полю адреса начальные коорднаты
  address.value = 'x: ' + (pinCoordX) + ', y: ' + (pinCoordY + 10 + Math.round(pinHeight / 2));

  window.pin.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Определение текущих координат
    window.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Функция определения координат смещения
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftCoords = {
        x: window.startCoords.x - moveEvt.clientX,
        y: window.startCoords.y - moveEvt.clientY
      };

      window.startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: window.pin.mainPin.offsetLeft - shiftCoords.x,
        y: window.pin.mainPin.offsetTop - shiftCoords.y
      };

      if (currentCoords.y > limitBottomY) {
        currentCoords.y = limitBottomY;
      } else if (currentCoords.y < limitTopY) {
        currentCoords.y = limitTopY;
      } else {
        window.pin.mainPin.style.top = currentCoords.y + 'px';
      }

      if (currentCoords.x > limitRightX) {
        currentCoords.x = limitRightX;
      } else if (currentCoords.x < limitLeftX) {
        currentCoords.x = limitLeftX;
      } else {
        window.pin.mainPin.style.left = currentCoords.x + 'px';
      }

      address.value = 'x: ' + (currentCoords.x) + ', y: ' + (currentCoords.y + 10 + Math.round(pinHeight / 2));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
