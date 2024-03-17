import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { PERSON_EXCEPTIONS } from "../src/expections";

const awaitForServerStatus = async (server) => {
  return new Promise((resolve, reject) => {
    server.once("listening", () => resolve());
    server.once("error", (err) => reject(err));
  });
};

describe("E2E Test Suite", () => {
  describe("E2E Tests in a non-test environment", () => {
    let _testServer;
    let _testServerAddress;

    afterAll((done) => {
      _testServer.close(done);
    }, 10000);

    it("should start server in a 4000 port", async () => {
      const PORT = 4000;
      process.env.NODE_ENV = "production";
      process.env.PORT = PORT;

      jest.spyOn(console, "log");

      const { default: server } = await import("../src/index");

      _testServer = server;
      await awaitForServerStatus(_testServer);
      const addressInfo = server.address();

      expect(addressInfo.port).toBe(PORT);

      expect(console.log).toHaveBeenCalledWith(
        `Server is running on ${addressInfo.address}:${PORT}`
      );
    });
  });

  describe("E2E Tests for server", () => {
    let _testServer;
    let _testServerAddress;

    beforeAll(async () => {
      process.env.NODE_ENV = "test";
      const { default: server } = await import("../src/index");
      _testServer = server.listen();

      await awaitForServerStatus(server);
      const serverInfo = server.address();
      _testServerAddress = `http://localhost:${serverInfo.port}`;
    });

    afterAll((done) => {
      _testServer.close(done);
    }, 10000);

    it("should start server", () => {
      expect(_testServer).toBeTruthy();
    });

    it("should return 404 on unsupported routes", async () => {
      const response = await fetch(`${_testServerAddress}/random-route`, {
        method: "POST",
      });

      expect(response.status).toBe(404);
    });

    it("should return 400 on invalid payload", async () => {
      const invalidPerson = {
        name: "Fulano de tal",
      };
      const response = await fetch(`${_testServerAddress}/persons`, {
        method: "POST",
        body: JSON.stringify(invalidPerson),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.validationError).toEqual(PERSON_EXCEPTIONS.CPF_NOT_PROVIDED);
    });

    it("should return 200 on a valid payload", async () => {
      const invalidPerson = {
        name: "Xuxa da Silva",
        cpf: "100.100.103-300",
      };
      const response = await fetch(`${_testServerAddress}/persons`, {
        method: "POST",
        body: JSON.stringify(invalidPerson),
      });
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.lastName).toEqual("da Silva");
    });
  });
});
