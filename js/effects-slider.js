const uploadPreviewImg = document.querySelector('.img-upload__preview');
const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');


effectLevel.classList.add('hidden'); /*Сброс слайдера для оригинала*/

const effects = {                   /*Параметры слайдера для кажлого фильтра*/
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};

noUiSlider.create(effectLevelSlider, {        /*Поключение noUiSlider*/
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const resetEffects = () => {                                            /*Cброс значений*/
  effectLevelSlider.disabled = true;
  effectLevel.classList.add('hidden');
  uploadPreviewImg.className = 'img-upload__preview';
  effectLevelValue.value = '';
  uploadPreviewImg.style.filter = '';
};

effectLevelSlider.noUiSlider.on('update', () => {                            /*Уровень фильтров*/

  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const selectedFilter = document.querySelector('input[name="effect"]:checked');

  if (selectedFilter && selectedFilter.value !== 'none') {
    const { filter, unit } = effects[selectedFilter.value];
    uploadPreviewImg.style.filter = `${filter}(${sliderValue}${unit})`;
  }
});

const updateEffects = (selectedFilter) => {                                 /*Функция актуализации эффекта*/
  effectLevelSlider.noUiSlider.updateOptions(selectedFilter.options);
};

const onEffectsListChange = (evt) => {                                       /*Смена фильтров*/

  const selectedFilter = evt.target.value;
  if (!(selectedFilter === 'none')) {
    effectLevelSlider.removeAttribute('disabled');
    imgUploadEffect.classList.remove('hidden');
    uploadPreviewImg.className = 'img-upload__preview';
    uploadPreviewImg.classList.add(`effects__preview--${selectedFilter}`);
    effectLevelSlider.noUiSlider.updateOptions(effects[selectedFilter].options);
    updateEffects(effects[selectedFilter]);
  } else {
    resetEffects();
  }
};

effectsList.addEventListener('change', onEffectsListChange);

export {resetEffects};
