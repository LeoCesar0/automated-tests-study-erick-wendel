import { createServer } from "node:http";
import { createUser } from "./routes/createUser";
import { getUser } from "./routes/getUser";

export const usersDB = [];

const server = createServer(async (req, res) => {
  try {
    if (req.url === "/users" && req.method === "POST") {
      if (req.method === "POST") {
        return await createUser(req, res);
      }
    }

    if (req.url.startsWith("/users") && req.method === "GET") {
      return await getUser(req, res);
    }
  } catch (err) {
    const message = err.message || "";
    const isValidationError = message
      .toLowerCase()
      .includes("validation error");
    const code = isValidationError ? 422 : 500;
    const finalMessage = isValidationError ? message : "Internal Error";
    res.writeHead(code);
    return res.end(
      JSON.stringify({
        errorMessage: finalMessage,
      })
    );
  }

  res.writeHead(404);
  res.end("Not Found");
  return;
});

export default server;
