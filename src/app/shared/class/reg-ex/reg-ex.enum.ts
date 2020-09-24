export const RegEx = {
  IS_EMAIL: /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/,
  IS_PHONE_NUMBER: /^\+[0-9]{10,13}$/,
  HAS_SPECIAL_CARACTER: /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\"|\;|\:|\s/,
  HAS_NUMBER: /\d/,
  IS_VALID_IMAGE: /^(.*\.(?!(jpg|png|jpeg)$))?[^.]*$/i,
};
