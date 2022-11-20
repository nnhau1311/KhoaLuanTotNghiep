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
const validateEmail = (mail: string) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(mail);
};
const validateFullName = (name: string) => {
  const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
  return pattern.test(name);
};
export {
  stringIsEmpty,
  arrayIsEmpty,
  objectIsNull,
  validateEmail,
  validateFullName,
};
