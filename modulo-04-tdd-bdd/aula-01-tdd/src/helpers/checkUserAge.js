import { USER_EXCEPTIONS } from "../static/exceptions";

export const checkUserAge = (age) => {
  if (age < 18) {
    throw new Error(USER_EXCEPTIONS.AGE_INVALID);
  }
  if (age >= 18 && age <= 29) {
    return "young-adult";
  }
  if (age >= 30 && age <= 49) {
    return "adult";
  }
  return "senior";
};
