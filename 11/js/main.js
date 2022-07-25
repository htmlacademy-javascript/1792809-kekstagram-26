import {renderSimilarPhotos, setDefaultFilter, setRandomFilter, setDiscussedFilter, getFixedNumberImg, compareComments} from './draw-thumbnails.js';
import './upload-form.js';
import {getData} from './api.js';
import {openErrorLoadMessage, debounce} from './util.js';

const RANDOM_IMG_NUMBER = 10;

const filtersWindow = document.querySelector('.img-filters');
filtersWindow.classList.remove('img-filters--inactive');

getData(
  (photos) => {
    renderSimilarPhotos(photos.slice());
    setDefaultFilter(debounce(
      () => renderSimilarPhotos(photos.slice()),
    ));
    setRandomFilter(debounce(
      () => renderSimilarPhotos(getFixedNumberImg(photos.slice(), RANDOM_IMG_NUMBER)),
    ));
    setDiscussedFilter(debounce(
      () => renderSimilarPhotos(photos.slice().sort(compareComments)),
    ));
  },
  () => openErrorLoadMessage()
);
