import {getLengthString, isEscape, openErrorLoadMessage, openSuccessLoadMessage} from './util.js';
import {catchStartPhotoSize, onBiggerButtonClick, onSmallerButtonClick} from './scale-slider.js';
import {resetEffects} from './effects-slider.js';
import {sendData} from './api.js';

const MAX_AMOUNT_HASHTAGS = 5;
const MAX_AMOUNT_COMMENT = 140;
const uploadPhotoUploadForm = document.querySelector('.img-upload__form');
const loadUserPhoto = uploadPhotoUploadForm.querySelector('#upload-file');
const photoEditor = uploadPhotoUploadForm.querySelector('.img-upload__overlay');
const closePhotoUploadForm = photoEditor.querySelector('#upload-cancel');
const textHashtags = uploadPhotoUploadForm.querySelector('.text__hashtags');
const textDescription = uploadPhotoUploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadPhotoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper_invalid',
  successClass: 'img-upload__field-wrapper_valid',
  errorTextParent:'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const removeHashtags = (value) => {
  const hashtagsArray = value.split(' ');
  const hashtags = hashtagsArray.filter((hashtag) => hashtag !== '');
  return hashtags;
};

const validateContentHashtag = (value) => {
  const hashtags = removeHashtags(value);
  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};
const validateContentHashtagError = 'Хэштег должен начинаться с # и иметь кол-во символов от 1 до 20';

const validateQuantityHashtag = (value) => {
  const hashtags = removeHashtags(value);
  if (hashtags.length > MAX_AMOUNT_HASHTAGS) {
    return false;
  }
  return true;
};
const validateQuantityHashtagError = 'Максимум 5 хэштегов';

const validateRepeatsHashtag = (value) => {
  const hashtags = removeHashtags(value);
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
};
const validateRepeatsHashtagError = 'Такой хэштег уже существует';

const validateQuantitySymbols  = (description) => {
  const valid = getLengthString(description, MAX_AMOUNT_COMMENT);
  return valid;
};
const validateQuantitySymbolsError = 'Длина комментария максимум 140 символов';

pristine.addValidator(textHashtags, validateContentHashtag, validateContentHashtagError);
pristine.addValidator(textHashtags, validateQuantityHashtag, validateQuantityHashtagError);
pristine.addValidator(textHashtags, validateRepeatsHashtag, validateRepeatsHashtagError);
pristine.addValidator(textDescription, validateQuantitySymbols, validateQuantitySymbolsError);

const onTextInputNodeKeydown = (evt) => {
  evt.stopPropagation();
};

const resetTextFields = () => {
  const errorTextNodes = uploadPhotoUploadForm.querySelectorAll('.input__error');
  if (errorTextNodes.length > 0) {
    errorTextNodes.forEach((textNode) => {textNode.textContent = '';});
  }

  textHashtags.value = '';
  textHashtags.value = '';
};

const closeEditPhotoModal = () => {
  document.body.classList.remove('modal-open');
  photoEditor.classList.add('hidden');

  resetEffects();
  resetTextFields();
  onBiggerButtonClick();

  textHashtags.removeEventListener('keydown', onTextInputNodeKeydown);
  textDescription.removeEventListener('keydown', onTextInputNodeKeydown);
  closePhotoUploadForm.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick () {
  closeEditPhotoModal();
  catchStartPhotoSize();
  resetEffects();
}

const onUploadFileChange = () => {
  document.body.classList.add('modal-open');
  photoEditor.classList.remove('hidden');

  resetEffects();
  onSmallerButtonClick();

  textHashtags.addEventListener('keydown', onTextInputNodeKeydown);
  textDescription.addEventListener('keydown', onTextInputNodeKeydown);
  closePhotoUploadForm.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  const openedErrorLoadMessage = document.querySelector('.error');
  const openedSuccessLoadMessage = document.querySelector('.success');
  if (isEscape(evt) && !openedErrorLoadMessage && !openedSuccessLoadMessage) {
    evt.preventDefault();
    closeEditPhotoModal();
  }
}

const onUploadFileNodeChange = () => {
  onUploadFileChange();
};

loadUserPhoto.addEventListener('change', onUploadFileNodeChange);

const onSuccessSubmit = () => {
  closeEditPhotoModal();
  openSuccessLoadMessage();
};

const onErrorSubmit = () => {
  openErrorLoadMessage();
};

uploadPhotoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(
      () => onSuccessSubmit(),
      () => onErrorSubmit(),
      new FormData(evt.target),
    );
  }
});

