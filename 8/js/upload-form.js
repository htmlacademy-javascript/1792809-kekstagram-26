import {isEscape} from './util.js';

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
  return hashtags.length <= MAX_AMOUNT_HASHTAGS;
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
  if (description.length > MAX_AMOUNT_COMMENT) {
    return false;
  }
  return true;
};

const validateQuantitySymbolsError = 'Длина комментария максимум 140 символов';
pristine.addValidator(textHashtags, validateContentHashtag, validateContentHashtagError);
pristine.addValidator(textHashtags, validateQuantityHashtag, validateQuantityHashtagError);
pristine.addValidator(textHashtags, validateRepeatsHashtag, validateRepeatsHashtagError);
pristine.addValidator(textDescription, validateQuantitySymbols, validateQuantitySymbolsError);
uploadPhotoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    onCancelButtonClick();
  }
};

const onTextInputNodeKeydown = (evt) => {
  evt.stopPropagation();
};

const onSubmitUploadFileForm = (evt) => {
  if (!pristine.validate()){
    evt.preventDefault();
  }
};

const closeEditPhotoModal = () => {
  document.body.classList.remove('modal-open');
  photoEditor.classList.add('hidden');
  loadUserPhoto.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  textHashtags.removeEventListener('keydown', onTextInputNodeKeydown);
  textDescription.removeEventListener('keydown', onTextInputNodeKeydown);
  closePhotoUploadForm.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadFileChange = () => {
  document.body.classList.add('modal-open');
  photoEditor.classList.remove('hidden');
  textHashtags.addEventListener('keydown', onTextInputNodeKeydown);
  textDescription.addEventListener('keydown', onTextInputNodeKeydown);
  uploadPhotoUploadForm.addEventListener('submit', onSubmitUploadFileForm);
  closePhotoUploadForm.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick () {
  closeEditPhotoModal();
}

loadUserPhoto.addEventListener('change', onUploadFileChange);

