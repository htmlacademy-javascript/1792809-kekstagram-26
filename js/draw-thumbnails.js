import {uploadComments, openFullImg, showFullImg, showComments} from './draw-full-image.js';
import {getRandomArrayElement} from './util.js';

let photosData;

const сontainerAllImages = document.querySelector('.pictures');
const stemplateImage = document.querySelector('#picture').content.querySelector('.picture');

const imgFilterForm = document.querySelector('.img-filters__form');
const filterDefault = imgFilterForm.querySelector('#filter-default');
const filterRandom = imgFilterForm.querySelector('#filter-random');
const filterDiscussed = imgFilterForm.querySelector('#filter-discussed');

const compareComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;

  return rankB - rankA;
};

const getFixedNumberImg = (photos, photosCount) => {
  const randomPhotos = [];
  for (let i = 0; i < photosCount; i++) {
    let newRandomPhoto = getRandomArrayElement(photos);
    while (randomPhotos.includes(newRandomPhoto)) {
      newRandomPhoto = getRandomArrayElement(photos);
    }
    randomPhotos.push(newRandomPhoto);
  }

  return randomPhotos;
};

const setNewFilter = (newSelectedFilter) => {
  const oldSelectedFilter = imgFilterForm.querySelector('.img-filters__button--active');
  oldSelectedFilter.classList.remove('img-filters__button--active');
  newSelectedFilter.classList.add('img-filters__button--active');
};

const setDefaultFilter = (cb) => {
  filterDefault.addEventListener('click', (evt) => {
    setNewFilter(evt.target);
    cb();
  });
};

const setRandomFilter = (cb) => {
  filterRandom.addEventListener('click', (evt) => {
    setNewFilter(evt.target);
    cb();
  });
};

const setDiscussedFilter = (cb) => {
  filterDiscussed.addEventListener('click', (evt) => {
    setNewFilter(evt.target);
    cb();
  });
};

const renderSimilarPhotos = (similarPhotos) => {
  photosData = similarPhotos;

  const allPhotosNodes = сontainerAllImages.querySelectorAll('.picture');
  if (allPhotosNodes.length !== 0) {
    allPhotosNodes.forEach ((photoNode) => {
      photoNode.remove();
    });
  }

  const similarPostsFragment  = document.createDocumentFragment();

  similarPhotos.forEach(({url, likes, comments}) => {
    const otherUserPhoto = stemplateImage.cloneNode(true);
    otherUserPhoto.querySelector('.picture__img').src = url;
    otherUserPhoto.querySelector('.picture__likes').textContent = likes;
    otherUserPhoto.querySelector('.picture__comments').textContent = comments.length;
    similarPostsFragment.append(otherUserPhoto);
  });

  сontainerAllImages.append(similarPostsFragment);

  сontainerAllImages.addEventListener('click', onPhotoMiniatureClick);
};

const openFullSize = (photoMiniature) => {
  const clickedPhotoNode = photoMiniature.closest('.picture');
  if (clickedPhotoNode) {
    const clickedPhotoIndex = photosData.findIndex( (photo) => clickedPhotoNode.children[0].src.endsWith(photo.url));
    openFullImg();
    showFullImg(photosData, clickedPhotoIndex);
    showComments();
    uploadComments(photosData, clickedPhotoIndex);
  }
};

function onPhotoMiniatureClick (evt) {
  openFullSize(evt.target);
}

export {renderSimilarPhotos, setDefaultFilter, setRandomFilter, setDiscussedFilter, getFixedNumberImg, compareComments};


