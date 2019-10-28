'use strict';

(function () {
  var FILE_EXT = ['gif', 'jpg', 'jpeg', 'png'];

  var container = document.querySelector('.ad-form__photo-container');
  var dropZone = container.querySelector('.ad-form__drop-zone');
  var photoChooser = container.querySelector('input[type=file]');
  photoChooser.setAttribute('multiple', 'true');

  var block = document.createElement('div');
  block.classList.add("ad-form__image-container")
  container.appendChild(block);
  var fragment = document.createDocumentFragment();

  var uploadPhoto = function (file) {
    var fileName = file.name.toLowerCase();
    var img = document.createElement('img');
    var matches = FILE_EXT.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        img.classList.add('ad-form__photo');
        img.draggable = true;
        img.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
    return img;
  };

  var photosChangeHandler = function () {
    var files = photoChooser.files;
    for (var i = 0; i < files.length; i++) {
      fragment.appendChild(uploadPhoto(files[i]));
    }
    block.appendChild(fragment);
  };
  photoChooser.addEventListener('change', photosChangeHandler);

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
    var files = evt.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      fragment.appendChild(uploadPhoto(files[i]));
    }
    block.appendChild(fragment);
  });


  var clear = function () {
    var element = container.querySelector('.ad-form__image-container');
    if (element) {
      element.remove();
    }
  };

  window.photos = {
    clear: clear
  };
})();
