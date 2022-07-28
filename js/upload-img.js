const TYPES_FILES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadPreview = document.querySelector('.img-upload__preview img');
const selectFile = document.querySelector('.img-upload__input');

selectFile.addEventListener('change', () => {
  const file = selectFile.files[0];
  const fileName = file.name.toLowerCase();

  const conformity = TYPES_FILES.some((it) => fileName.endsWith(it));

  if (conformity) {
    uploadPreview.src = URL.createObjectURL(file);
  }
});


