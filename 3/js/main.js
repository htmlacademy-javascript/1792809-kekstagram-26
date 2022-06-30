function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      throw new Error('Максимальное значение должно быть больше минимального!');
    }
  } else {
    throw new Error('Значения интервала должны быть больше нуля!');
  }
}

function getlengthString(line, length) {
  return line.length <= length;
}

const PROFILE_NAMES = [
  'Варвара',
  'Джейк',
  'Костик',
  'Нестер',
  'Эвелина',
  'Женя',
  'Глеб',
  'Иринка'
];

const PROFILE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_PHOTOS = [
  'Веселимся',
  'Занимаемся спортом',
  'Идем в кино',
  'Играем в приставку',
  'Это было невероятно',
  'Грустный вечер(('
];

const createComment = () => ({
  id: getRandomNum(100, 999),
  avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
  message: PROFILE_COMMENTS[getRandomNum(0, PROFILE_COMMENTS.length-1)],
  name: PROFILE_NAMES[getRandomNum(0, PROFILE_NAMES.length-1)]
});

const createPost = () => ({
  id: getRandomNum(1, 25),
  url: `photos/${getRandomNum(1, 25)}.jpg`,
  description: DESCRIPTION_PHOTOS[getRandomNum(0, DESCRIPTION_PHOTOS.length-1)],
  likes: getRandomNum(15, 200),
  comments: Array.from({length: 6}, createComment),
});

const post = Array.from({length: 25}, createPost);
console.log(post);


