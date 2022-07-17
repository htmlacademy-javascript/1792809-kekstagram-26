import {posts} from './data.js';
import {escape} from './util.js';

const fullImg = document.querySelector('.big-picture');
const imgContainer = document.querySelectorAll('.picture');

const bigPhoto = fullImg.querySelector('.big-picture__img img');
const bigPhotoLikes = fullImg.querySelector('.likes-count');
const bigPhotoCommentsCount = fullImg.querySelector('.comments-count');
const bigPhotoComments = fullImg.querySelector('.social__comments');
const bigPhotoDescription = fullImg.querySelector('.social__caption');

const cancelButton = fullImg.querySelector('.big-picture__cancel');

const commentsCount = fullImg.querySelector('.social__comment-count');
const commentsLoader = fullImg.querySelector('.comments-loader');

const hiddenElements = () => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};
hiddenElements();

const showFullImg = (index) => {
  bigPhoto.src = posts[index].url;
  bigPhotoLikes.textContent = posts[index].likes;
  bigPhotoCommentsCount.textContent = posts[index].comments.length;
  bigPhotoDescription.textContent = posts[index].description;
};

const templateСomments = (index) => {
  const commentsContainerFragment = document.createDocumentFragment();

  posts[index].comments.forEach(({avatar, name, message}) => {
    const comment = document.createElement('li');
    const commentAvatar = document.createElement('img');
    const commentText = document.createElement('p');

    comment.classList.add('social__comment');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    comment.append(commentAvatar);
    commentText.classList.add('social__text');
    commentText.textContent = message;
    comment.append(commentText);
    commentsContainerFragment.append(comment);
  });
  bigPhotoComments.textContent = '';
  bigPhotoComments.append(commentsContainerFragment);
};

const openFullImg = (photoIndex) => {
  document.body.classList.add('modal-open');
  fullImg.classList.remove('hidden');

  showFullImg(photoIndex);
  templateСomments(photoIndex);

  cancelButton.addEventListener('click', onCancelButton);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const closeFullImg = () => {
  document.body.classList.remove('modal-open');
  fullImg.classList.add('hidden');

  cancelButton.removeEventListener('click', onCancelButton);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onCancelButton () {
  closeFullImg();
}

function onDocumentKeyDown (evt) {
  if (escape(evt)) {
    evt.preventDefault();
    closeFullImg();
  }
}

function onMiniImgClick (photoIndex) {
  openFullImg(photoIndex);
}

imgContainer.forEach((photo, index) => {
  photo.addEventListener('click', onMiniImgClick.bind(null, index));
});

