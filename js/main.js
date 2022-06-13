function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}

getRandomInt(0, 20)

function getlengthString(line, length) {
  if (line.length <= 0 || line.length > length) {
    return 'false';
  } else {
    return 'true';
  }
}

getlengthString('Добрейший вечерочек!', 20)
