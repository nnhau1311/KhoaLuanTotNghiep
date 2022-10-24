/* eslint-disable prettier/prettier */
// const formatDate = 'YYYY-MM-DDTHH:MM:SS';
const stringIsEmpty = (string: String | string) => {
  if (objectIsNull(string) || string === '') {
    return true;
  } else {
    return false;
  }
};
const objectIsNull = (object: any) => {
  if (object === null || object === undefined || object === '(null)') {
    return true;
  } else {
    return false;
  }
};
const arrayIsEmpty = (array: any): boolean => {
  if (objectIsNull(array) || array.length === 0) {
    return true;
  } else {
    return false;
  }
};

export { stringIsEmpty, arrayIsEmpty, objectIsNull };
