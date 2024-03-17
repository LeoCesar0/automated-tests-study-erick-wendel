import { server } from "./server.js";

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    const info = server.address();
    console.log(`Server is running on ${info.address}:${PORT}`);
  });
}

export default server;


/*
    curl -i -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"Leo César","cpf":"123.123.123-12"}' \
    http://localhost:3000/persons
*/
