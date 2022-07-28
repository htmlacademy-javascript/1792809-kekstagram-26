import {getLengthString, isEscape, openErrorLoadMessage, openSuccessLoadMessage} from './util.js';
import {catchStartPhotoSize} from './scale-slider.js';
import {resetEffects, loadEditPhotoFuncs, unloadEditPhotoFuncs} from './effects-slider.js';
import {sendData} from './api.js';

const MAX_AMOUNT_HASHTAGS = 5;
const MAX_AMOUNT_COMMENT = 140;
const uploadPhotoForm = document.querySelector('.img-upload__form');
const loadUserPhoto = uploadPhotoForm.querySelector('#upload-file');
const photoEditor = uploadPhotoForm.querySelector('.img-upload__overlay');
const closePhotoUploadForm = photoEditor.querySelector('#upload-cancel');
const textHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const textDescription = uploadPhotoForm.querySelector('.text__description');

const pristine = new Pristine(uploadPhotoForm, {
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

const validateQuantityHashtag = (value) => {
  const hashtags = removeHashtags(value);
  return hashtags.length <= MAX_AMOUNT_HASHTAGS;
};

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

const validateQuantitySymbols  = (description) => {
  const valid = getLengthString(description, MAX_AMOUNT_COMMENT);
  return valid;
};

pristine.addValidator(textHashtags, validateContentHashtag, 'Хэштег должен начинаться с # и иметь кол-во символов от 1 до 20');
pristine.addValidator(textHashtags, validateQuantityHashtag, `Максимум ${MAX_AMOUNT_HASHTAGS} хэштегов`);
pristine.addValidator(textHashtags, validateRepeatsHashtag, 'Такой хэштег уже существует');
pristine.addValidator(textDescription, validateQuantitySymbols, `Длина комментария максимум ${MAX_AMOUNT_COMMENT} символов`);

const onTextInputNodeKeydown = (evt) => {
  evt.stopPropagation();
};

const resetTextFields = () => {
  const errorTextNodes = uploadPhotoForm.querySelectorAll('.input__error');
  if (errorTextNodes.length > 0) {
    errorTextNodes.forEach((textNode) => {textNode.textContent = '';});
  }

  textHashtags.value = '';
  textDescription.value = '';
};

const closeEditPhotoModal = () => {
  document.body.classList.remove('modal-open');
  photoEditor.classList.add('hidden');

  resetEffects();
  resetTextFields();
  unloadEditPhotoFuncs();

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
  loadEditPhotoFuncs();

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

uploadPhotoForm.addEventListener('submit', (evt) => {
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

