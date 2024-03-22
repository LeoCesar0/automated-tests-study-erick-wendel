const validationPrefix = "Validation error: ";

export const USER_EXCEPTIONS = {
  BIRTHDAY_REQUIRED: validationPrefix + "birthDay is required",
  BIRTHDAY_INVALID: validationPrefix + "birthDay is invalid",
  NAME_REQUIRED: validationPrefix + "name is required",
  AGE_INVALID: validationPrefix + "min age is 18",
  ID_REQUIRED:validationPrefix + 'id is required'
};
