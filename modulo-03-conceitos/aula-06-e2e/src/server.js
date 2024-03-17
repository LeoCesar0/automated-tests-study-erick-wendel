import { once } from "node:events";
import http from "node:http";
import { Person } from "./Person.js";

export const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/persons") {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  try {
    const buffer = await once(req, "data");
    const json = buffer.toString();
    const data = JSON.parse(json);
    const result = Person.process(data);

    return res.end(JSON.stringify(result));
  } catch (err) {
    if (err?.message?.includes("required")) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          validationError: err.message,
        })
      );
      return;
    }

    res.writeHead(500);
    res.end("Internal Server Error");
    return;
  }
});
