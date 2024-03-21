const validationPrefix = "Validation error: ";

export const USER_EXCEPTIONS = {
  BIRTHDAY_REQUIRED: validationPrefix + "birthday is required",
  BIRTHDAY_INVALID: validationPrefix + "birthday is invalid",
  NAME_REQUIRED: validationPrefix + "name is required",
  AGE_INVALID: validationPrefix + "min age is 18",
  ID_REQUIRED:validationPrefix + 'id is required'
};
