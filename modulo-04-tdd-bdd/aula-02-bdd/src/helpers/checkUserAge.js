import { USER_EXCEPTIONS } from "../static/exceptions.js";

export const checkUserAge = (age) => {
  if (age < 18) {
    throw new Error(USER_EXCEPTIONS.AGE_INVALID);
  }
  if (age >= 18 && age <= 25) {
    return "young-adult";
  }
  if (age >= 26 && age <= 49) {
    return "adult";
  }
  return "senior";
};
