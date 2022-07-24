import {uploadComments, openFullImg, showFullImg, showComments} from './draw-full-image.js';

let photosData;

const сontainerAllImages = document.querySelector('.pictures');
const stemplateImage = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarPhotos = (similarPhotos) => {
  photosData = similarPhotos;

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

export {renderSimilarPhotos};


