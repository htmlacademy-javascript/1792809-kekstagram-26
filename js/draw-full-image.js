import {posts} from './data.js';

const fullImg = document.querySelector('.big-picture');                         //секция для просмотра больших фоток
const imgContainer = document.querySelectorAll('.picture');                     //контейнер всех фоток

const bigPhoto = fullImg.querySelector('.big-picture__img');                    //фото
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

const showWindow = () => {                                                      //добавляем класс, чтобы контейнер с фото не прокручивался при скролле
  document.body.classList.add('modal-open');
};

const closeWindow = () => {                                                    //убираем его
  document.body.classList.remove('modal-open');
};

const showFullImg = (Index) => {                                                //заполняем данными по конкретной фотографии
  bigPhoto.src = posts[Index].url;
  bigPhotoLikes.textContent = posts[Index].likes;
  bigPhotoCommentsCount.textContent = posts[Index].comments.length;
  bigPhotoDescription.textContent = posts[Index].description;
  fullImg.classList.remove('hidden');
};

const templateСomments = (Index) => {                                             // функция для создания social__comments
  const commentsContainerFragment = document.createDocumentFragment();           //  шаблон для social__comments
};
