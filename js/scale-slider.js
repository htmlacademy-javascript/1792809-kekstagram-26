const imgPreview = document.querySelector('.img-upload__preview img');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');

const imgStartSize = 100;
const STEP = 25;

let currentPhotoSize = imgStartSize;

const catchStartPhotoSize = () => {
  imgPreview.style.transform = '';
  controlValue.value = `${imgStartSize}%`;
};

const onSmallerButtonClick = () => {
  if (currentPhotoSize > STEP) {
    currentPhotoSize = currentPhotoSize - STEP;
    controlValue.value = `${currentPhotoSize}%`;
    imgPreview.style.transform = `scale(${currentPhotoSize / 100})`;
  }
};

const onBiggerButtonClick = () => {
  if (currentPhotoSize < 100) {
    currentPhotoSize = currentPhotoSize + STEP;
    controlValue.value = `${currentPhotoSize}%`;
    imgPreview.style.transform = `scale(${currentPhotoSize / 100})`;
  }
};

controlSmaller.addEventListener('click', onSmallerButtonClick);
controlBigger.addEventListener('click', onBiggerButtonClick);

export {catchStartPhotoSize};

