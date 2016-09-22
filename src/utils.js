export const range = (start, end) => {
  let length = Math.max(end - start, 0);
  let result = [];

  while (length--) {
    result[length] = start + length;
  }

  return result;
};

export const chunk = (array, size) => {
  let length = array.length;
  let index = 0;
  let resIndex = -1;
  let result = [];

  while (index < length) {
    result[++resIndex] = array.slice(index, (index += size));
  }

  return result;
};