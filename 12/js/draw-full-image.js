import {isEscape} from './util.js';

const fullImg = document.querySelector('.big-picture');
/* const imgContainer = document.querySelector('.pictures'); */

const bigPhoto = fullImg.querySelector('.big-picture__img img');
const bigPhotoLikes = fullImg.querySelector('.likes-count');
const bigPhotoCommentsCount = fullImg.querySelector('.comments-count');
const bigPhotoComments = fullImg.querySelector('.social__comments');
const bigPhotoDescription = fullImg.querySelector('.social__caption');

const cancelButton = fullImg.querySelector('.big-picture__cancel');

const bigPhotoCountVisible = fullImg.querySelector('.comments-visual-count');
const VISIBLE_NUMBER_COMMENT = 5;

const commentsCount = fullImg.querySelector('.social__comment-count');
const commentsLoader = fullImg.querySelector('.comments-loader');

const showComments = () => {
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const hideComments = () => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const showFullImg = (posts, index) => {
  bigPhoto.src = posts[index].url;
  bigPhotoLikes.textContent = posts[index].likes;
  bigPhotoComments.textContent = posts[index].comments.length;
  bigPhotoDescription.textContent = posts[index].description;
};

const setNumberVisibleComments = () => {
  const commentsHidden = bigPhotoComments.querySelectorAll('.hidden').length;
  const commentsTotalCount = bigPhotoComments.querySelectorAll('.social__comment').length;
  const commentsVisualCount = commentsTotalCount - commentsHidden;
  bigPhotoCommentsCount.textContent = commentsTotalCount;
  bigPhotoCountVisible.textContent = commentsVisualCount;
};

const uploadComments = (posts, index) => {
  const commentsContainerFragment = document.createDocumentFragment();
  const commentsTotal = posts[index].comments;
  const commentsTotalCount = commentsTotal.length;

  if (commentsTotalCount !== 0) {
    if (commentsTotalCount <= VISIBLE_NUMBER_COMMENT) {
      hideComments();
    }

    commentsTotal.forEach(({avatar, name, message}, commentIndex) => {
      const comment = document.createElement('li');
      const commentPhoto = document.createElement('img');
      const commentText = document.createElement('p');

      comment.classList.add('social__comment');
      commentPhoto.classList.add('social__picture');
      commentPhoto.src = avatar;
      commentPhoto.alt = name;
      commentPhoto.width = 35;
      commentPhoto.height = 35;
      comment.append(commentPhoto);
      commentText.classList.add('social__text');
      commentText.textContent = message;
      comment.append(commentText);

      if (commentIndex >= VISIBLE_NUMBER_COMMENT) {
        comment.classList.add('hidden');
      }

      commentsContainerFragment.append(comment);
    });
  } else {
    hideComments();
  }
  bigPhotoComments.textContent = '';
  bigPhotoComments.append(commentsContainerFragment);
  setNumberVisibleComments();
};

const openFullImg = () => {
  document.body.classList.add('modal-open');
  fullImg.classList.remove('hidden');
  commentsLoader.addEventListener('click', onButtonLoadingNextComments);
  cancelButton.addEventListener('click', onCancelButton);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const closeFullImg = () => {
  document.body.classList.remove('modal-open');
  fullImg.classList.add('hidden');
  commentsLoader.removeEventListener('click', onButtonLoadingNextComments);
  cancelButton.removeEventListener('click', onCancelButton);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const showNextComments = () => {
  const commentsHideNodes = bigPhotoComments.querySelectorAll('.hidden');
  const commentsHideCount = commentsHideNodes.length;

  if (commentsHideCount > VISIBLE_NUMBER_COMMENT) {
    for (let i = 0; i < VISIBLE_NUMBER_COMMENT; i++) {
      commentsHideNodes[i].classList.remove('hidden');
    }
  } else {
    if (commentsHideCount !== 0) {
      for (let i = 0; i < commentsHideCount; i++) {
        commentsHideNodes[i].classList.remove('hidden');
      }
      commentsLoader.classList.add('hidden');
    }
  }
  setNumberVisibleComments();
};

function onButtonLoadingNextComments () {
  showNextComments();
}

function onCancelButton () {
  closeFullImg();
}

function onDocumentKeyDown (evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeFullImg();
  }
}

export {uploadComments, openFullImg, showFullImg, showComments};

