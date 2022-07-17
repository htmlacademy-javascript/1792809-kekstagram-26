import {posts} from './data.js';

const fullImg = document.querySelector('.big-picture');                         //секция для просмотра больших фоток
const imgContainer = document.querySelectorAll('.picture');                     //контейнер всех фоток

const bigPhoto = fullImg.querySelector('.big-picture__img img');               //фото
const bigPhotoLikes = fullImg.querySelector('.likes-count');                   //лайки
const bigPhotoCommentsCount = fullImg.querySelector('.comments-count');        //кол-во комментариев
const bigPhotoComments = fullImg.querySelector('.social__comments');           //комментарии к фото
const bigPhotoDescription = fullImg.querySelector('.social__caption');         //описание к фото

const cancelButton = fullImg.querySelector('.big-picture__cancel');             //кнопка закрыть

const commentsCount = fullImg.querySelector('.social__comment-count');          //блок, коментарии к фото
const commentsLoader = fullImg.querySelector('.comments-loader');               //Кнопка для загрузки новой порции комментариев

const hiddenElements = () => {                                                  //скрываем их
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

const escape = (event) => event.key === 'Escape';

function onDocumentKeyDown (event) {
  if (escape(event)) {
    event.preventDefault();
    closeFullImg();
  }
}

function onMiniImgClick (photoIndex) {
  openFullImg(photoIndex);
}

imgContainer.forEach((photo, index) => {
  photo.addEventListener('click', onMiniImgClick.bind(null, index));
});

