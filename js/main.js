import {renderSimilarPhotos} from './draw-thumbnails.js';
import './upload-form.js';
import {getData} from './api.js';
import {openErrorGetDataMessage} from './util.js';

getData(
  (photos) => renderSimilarPhotos(photos),
  () => openErrorGetDataMessage()
);


/* import './draw-full-image.js';
import './upload-form.js';
import './scale-slider.js';
import './effects-slider.js'; */
