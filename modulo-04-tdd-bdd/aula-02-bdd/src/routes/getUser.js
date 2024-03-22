import { usersDB } from "../api.js";
import { USER_EXCEPTIONS } from "../static/exceptions.js";

export const getUser = async (req, res) => {
  const url = req.url;
  const [, , id] = url.split("/");

  if (!id) {
    throw new Error(USER_EXCEPTIONS.ID_REQUIRED);
  }

  const user = usersDB.find((user) => user.id === id);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  return res.end(JSON.stringify(user));
};
