import { Given, AfterAll } from "@cucumber/cucumber";
import server from "../src/api.js";
import sinon from "sinon";

const awaitForServerStatus = async (server) => {
  return new Promise((resolve, reject) => {
    server.once("listening", () => resolve());
    server.once("error", (err) => reject(err));
  });
};

let _testServer;

AfterAll(done => {
  sinon.restore()
  server.closeAllConnections()
  _testServer.close(done)
})

Given("I have a running server", async function () {

  if(_testServer) return;

  _testServer = server.listen();
  await awaitForServerStatus(_testServer);
  const info = server.address();
  this.testServer = _testServer;
  this.testServerAddress = `http://localhost:${info.port}`;
});

Given("The current date is {string}", async function (date) {
  sinon.restore();
  const clock = sinon.useFakeTimers(new Date(date).getTime());
  this.clock = clock;
});
