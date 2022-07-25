const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      throw new Error('Максимальное значение должно быть больше минимального!');
    }
  } else {
    throw new Error('Значения интервала должны быть больше нуля!');
  }
};

const getLengthString = (text, maxLength) => text.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomNum(0, elements.length - 1)];

const isEscape = (evt) => evt.key === 'Escape';

const photoEditNode = document.querySelector('.img-upload__overlay');

const successLoadMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const openSuccessLoadMessage = () => {
  const successLoadMessage = successLoadMessageTemplate.cloneNode(true);
  const successLoadButton = successLoadMessage.querySelector('.success__button');

  document.body.append(successLoadMessage);
  successLoadButton.addEventListener('click', onSuccessLoadButtonClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
};

const closeSuccessLoadMessage = () => {
  const successLoadMessage = document.querySelector('.success');
  const successLoadButton = successLoadMessage.querySelector('.success__button');

  successLoadButton.removeEventListener('click', onSuccessLoadButtonClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessDocumentClick);
  successLoadMessage.remove();
};

function onSuccessLoadButtonClick () {
  closeSuccessLoadMessage();
}

function onSuccessMessageEscKeydown (evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeSuccessLoadMessage();
  }
}

function onSuccessDocumentClick (evt) {
  if (evt.target.matches('.success')) {
    closeSuccessLoadMessage();
  }
}

const errorLoadMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const openErrorLoadMessage = () => {
  const errorLoadMessage = errorLoadMessageTemplate.cloneNode(true);
  const errorLoadButton = errorLoadMessage.querySelector('.error__button');

  photoEditNode.classList.add('hidden');
  document.body.append(errorLoadMessage);
  errorLoadButton.addEventListener('click', onErrorLoadButtonClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorDocumentClick);
};

const closeErrorLoadMessage = () => {
  const errorLoadMessage = document.querySelector('.error');
  const errorLoadButton = errorLoadMessage.querySelector('.error__button');

  errorLoadButton.removeEventListener('click', onErrorLoadButtonClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorDocumentClick);
  errorLoadMessage.remove();
  photoEditNode.classList.remove('hidden');
};

function onErrorLoadButtonClick () {
  closeErrorLoadMessage();
}

function onErrorMessageEscKeydown (evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeErrorLoadMessage();
  }
}

function onErrorDocumentClick (evt) {
  if (evt.target.matches('.error')) {
    closeErrorLoadMessage();
  }
}

const onErrorGetDataButtonClick = () => {
  location.reload();
};

const openErrorGetDataMessage = () => {
  const errorGetDataMessage = errorLoadMessageTemplate.cloneNode(true);
  const errorGetDataTitle = errorGetDataMessage.querySelector('.error__title');
  const errorGetDataButton = errorGetDataMessage.querySelector('.error__button');

  errorGetDataTitle.textContent = 'Ошибка загрузки данных с сервера!';
  errorGetDataButton.textContent = 'Попробовать еще раз!';
  errorGetDataButton.addEventListener('click', onErrorGetDataButtonClick);

  document.body.append(errorGetDataMessage);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {debounce, getRandomNum, getRandomArrayElement, getLengthString, isEscape, openErrorLoadMessage, openSuccessLoadMessage, openErrorGetDataMessage};


