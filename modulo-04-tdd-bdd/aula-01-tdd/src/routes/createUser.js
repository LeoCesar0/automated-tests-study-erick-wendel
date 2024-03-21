import { once } from "node:events";
import { checkUserAge } from "../helpers/checkUserAge";
import { randomUUID } from "node:crypto";
import { USER_EXCEPTIONS } from "../static/exceptions";
import { usersDB } from "../api";

export const createUser = async (req, res) => {
  const data = await once(req, "data");
  const userPayload = JSON.parse(data.toString());

  if (!userPayload.birthday) {
    throw new Error(USER_EXCEPTIONS.BIRTHDAY_REQUIRED);
  }
  if (!userPayload.name) {
    throw new Error(USER_EXCEPTIONS.NAME_REQUIRED);
  }
  const birthdayDate = new Date(userPayload.birthday);

  if (isNaN(birthdayDate.getTime())) {
    throw new Error(USER_EXCEPTIONS.BIRTHDAY_INVALID);
  }

  const age = new Date().getFullYear() - birthdayDate.getFullYear();
  const userId = randomUUID();

  const category = checkUserAge(age);

  usersDB.push({
    id: userId,
    name: userPayload.name,
    category: category,
  });
  res.writeHead(201, {
    "Content-Type": "application/json",
  });
  return res.end(JSON.stringify({ id: userId }));
};
