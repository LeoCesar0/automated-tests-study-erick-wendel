import server from "./api";

/* global process */
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    const addressInfo = server.address();
    console.log(`Server is listening on ${addressInfo.address}:${PORT}`);
  });
}

export default server;
