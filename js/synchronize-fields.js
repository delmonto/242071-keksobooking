'use strict';

(function () {
  window.sync = function (element1, element2, arr1, arr2, cb) {
    var index = arr1.indexOf(element1.value);
    var value = arr2[index];
    cb(element2, value);
  };
})();
