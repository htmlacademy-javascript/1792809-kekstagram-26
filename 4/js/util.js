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

export {getRandomNum};
