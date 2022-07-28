const uploadPreviewImg = document.querySelector('.img-upload__preview  img');
const effectLevelValue = document.querySelector('.effect-level__value');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomScaleLabel = document.querySelector('.scale__control--value');
const effectsFieldsetNode = document.querySelector('.img-upload__effects');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;
const STEP_ZOOM_VALUE = 25;
const DEFAULT_ZOOM_VALUE = 100;

const effects = {
  none: {
    filter: '',
    unit: '',
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

let scale;
let selectedEffect;

const resetEffects = () => {
  document.querySelector('#effect-none').checked = true;
  scale = DEFAULT_ZOOM_VALUE;
  selectedEffect = 'none';
  zoomScaleLabel.value = '100 %';
  uploadPreviewImg.style.transform = 'scale(1)';
  uploadPreviewImg.className = '';
  uploadPreviewImg.classList.add('effects__preview--none');
  uploadPreviewImg.style.filter = '';
  effectLevelSlider.style.visibility = 'hidden';
};

resetEffects();

const renderScalingPhoto = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scale > MIN_ZOOM_VALUE) {
    scale -= STEP_ZOOM_VALUE;
  }
  if (evt.target.matches('.scale__control--bigger') && scale < MAX_ZOOM_VALUE) {
    scale += STEP_ZOOM_VALUE;
  }
  zoomScaleLabel.value = `${scale} %`;

  const scaleDecimal = scale / 100;
  uploadPreviewImg.style.transform = `scale(${scaleDecimal})`;
};

const onZoomButtonClick = (evt) => {
  renderScalingPhoto(evt);
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const onNoUiSliderUpdate = () => {
  const selectedFilterType = effects[selectedEffect].filter;
  const selectedFilterMeasureUnit = effects[selectedEffect].unit;
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  uploadPreviewImg.style.filter = `${selectedFilterType}(${effectLevelValue.value}${selectedFilterMeasureUnit})`;
};

effectLevelSlider.noUiSlider.on('update', onNoUiSliderUpdate);

const onEffectsListChange = (evt) => {
  const selectedFilter = evt.target.value;
  uploadPreviewImg.className = '';
  uploadPreviewImg.classList.add(`effects__preview--${selectedFilter}`);
  if (selectedFilter === 'none') {
    effectLevelSlider.style.visibility = 'hidden';
    uploadPreviewImg.style.filter = '';
  } else {
    effectLevelSlider.style.visibility = 'visible';
    selectedEffect = selectedFilter;
    effectLevelSlider.noUiSlider.updateOptions(effects[selectedFilter]);
  }
};

const onEffectsFieldsetNode = (evt) => {
  const clickedEffectRadio = evt.target.closest('.effects__radio');
  if (clickedEffectRadio) {
    onEffectsListChange(evt);
  }
};

const loadEditPhotoFuncs = () => {
  resetEffects();
  zoomOutButton.addEventListener('click', onZoomButtonClick);
  zoomInButton.addEventListener('click', onZoomButtonClick);
  effectsFieldsetNode.addEventListener('change', onEffectsFieldsetNode);
};

const unloadEditPhotoFuncs = () => {
  resetEffects();
  zoomOutButton.removeEventListener('click', onZoomButtonClick);
  zoomInButton.removeEventListener('click', onZoomButtonClick);
  effectsFieldsetNode.removeEventListener('change', onEffectsFieldsetNode);
};

export {resetEffects, loadEditPhotoFuncs, unloadEditPhotoFuncs};
