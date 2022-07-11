import {posts} from './data.js';

const сontainerAllImages = document.querySelector('.pictures');                              /* создаем контейнер из разметки для генерации туда фоток */
const stemplateImage = document.querySelector('#picture').content.querySelector('.picture'); /* создаем шаблон фотки */

const generateElementsPosts = posts;                                                         /* берем генерацию фоток из даты */

const similarPostsFragment  = document.createDocumentFragment();                             /* создаем 'фрагмент-контейнер' для всех готовых обьектов */

generateElementsPosts.forEach((object) => {                                                  /* проходим по всем элементам из генерации*/
  const postElement = stemplateImage.cloneNode(true);                                        /* делаем клон шаблона */
  postElement.querySelector('.picture__img').src = object.url;                               /* присваеиваем фотке путь */
  postElement.querySelector('.picture__likes').textContent = object.likes;                   /* присваиваем лайкам случайное кол-во */
  postElement.querySelector('.picture__comments').textContent = object.comments.length;      /* присваиваем из массива комментарий */
  similarPostsFragment.appendChild(postElement);                                             /* вставляем все готовые элементы в фрагмент */
});

сontainerAllImages.appendChild(similarPostsFragment);                                        /* вставляем в котейнер из разметки обьекты фрагмента */


