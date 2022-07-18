import {getRandomNum} from './util.js';

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

const PUBLICATION_COUNT = 25;
const COMMENT_COUNT = 13;


const createComments = (id) => ({
  id: id + 1,
  avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
  message: PROFILE_COMMENTS[getRandomNum(0, PROFILE_COMMENTS.length-1)],
  name: PROFILE_NAMES[getRandomNum(0, PROFILE_NAMES.length-1)]
});

const createPost = (id) => ({
  id: id + 1,
  url: `photos/${id + 1}.jpg`,
  description: DESCRIPTION_PHOTOS[getRandomNum(0, DESCRIPTION_PHOTOS.length-1)],
  likes: getRandomNum(15, 200),
  comments: Array.from({ length: COMMENT_COUNT}, (element, index) => createComments(index)),
});
const createPhotos = () =>
  Array.from({ length: PUBLICATION_COUNT }, (element, index) => createPost(index));
const posts = createPhotos();

export {posts};
