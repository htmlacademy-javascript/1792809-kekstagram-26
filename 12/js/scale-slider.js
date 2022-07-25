const imgPreview = document.querySelector('.img-upload__preview');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');

const imgStartSize = 100;
const STEP = 25;

let currentPhotoSize = imgStartSize;  /*Дать слайдеру начальное значения в 100% без эффектов*/

const catchStartPhotoSize = () => {
  imgPreview.style.transform = '';
  controlValue.value = `${imgStartSize}%`;
};

const onSmallerButtonClick = () => {            /*Увеличение изображения*/
  if (currentPhotoSize > STEP) {
    currentPhotoSize = currentPhotoSize - STEP;
    controlValue.value = `${currentPhotoSize}%`;
    imgPreview.style.transform = `scale(${currentPhotoSize / 100})`;
  }
};

const onBiggerButtonClick = () => {                  /*Уменьшение изображения*/
  if (currentPhotoSize < 100) {
    currentPhotoSize = currentPhotoSize + STEP;
    controlValue.value = `${currentPhotoSize}%`;
    imgPreview.style.transform = `scale(${currentPhotoSize / 100})`;
  }
};

controlSmaller.addEventListener('click', onSmallerButtonClick);          /*обработчики на увеличение и уменьшение изображения*/
controlBigger.addEventListener('click', onBiggerButtonClick);

export {catchStartPhotoSize};
