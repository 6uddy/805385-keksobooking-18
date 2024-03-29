'use strict';

(function () {
  var FILE_EXT = ['gif', 'jpg', 'jpeg', 'png'];

  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var fileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var dropZone = document.querySelector('.ad-form-header__upload .ad-form-header__drop-zone');

  var previewAvatar = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_EXT.some(function (ext) {
      return fileName.endsWith(ext);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    previewAvatar(file);
  });


  dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  dropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    return false;
  });

  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    previewAvatar(file);
  });

  var clear = function () {
    preview.src = DEFAULT_AVATAR_SRC;
  };

  window.avatar = {
    clear: clear
  };
})();
