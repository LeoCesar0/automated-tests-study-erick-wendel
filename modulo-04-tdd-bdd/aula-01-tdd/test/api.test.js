import { it, expect, describe, beforeAll, afterAll, jest } from "@jest/globals";
import server from "../src/api";
import { USER_EXCEPTIONS } from "../src/static/exceptions";

const awaitForServerStatus = async (server) => {
  return new Promise((resolve, reject) => {
    server.once("listening", () => resolve());
    server.once("error", (err) => reject(err));
  });
};

describe("Api E2E Test Suite", () => {
  let _serverAddress = "";
  let _server;

  beforeAll(async () => {
    _server = server.listen();
    await awaitForServerStatus(_server);
    const info = server.address();
    _serverAddress = `http://localhost:${info.port}`;
  });

  afterAll((done) => {
    _server.closeAllConnections();
    _server.close(done);
  });

  const createUser = async (payload) => {
    return fetch(`${_serverAddress}/users`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const getUserById = async (id) => {
    const result = await fetch(`${_serverAddress}/users/${id}`);
    return result.json();
  };

  // --------------------------
  // ERRORS
  // --------------------------

  it("should throw an error if the user is under 18 years old", async () => {
    const payload = {
      name: "Fulano de Tal",
      birthDay: "2010-05-01",
    };
    const result = await createUser(payload);

    expect(result.status).toBe(422);
    const data = await result.json();

    expect(data.errorMessage).toBe(USER_EXCEPTIONS.AGE_INVALID);
  });

  // --------------------------
  // SUCCESS
  // --------------------------

  it("should create a user with category young-adult for users aged between 18-29", async () => {
    const expectedCategory = "young-adult";
    jest.useFakeTimers({
      now: new Date("2024-03-21T00:00:00-03:00"),
    });
    const payload = {
      name: "Fulano de Tal",
      birthDay: "2000-05-01",
    };
    const result = await createUser(payload);
    const data = await result.json();
    expect(result.status).toBe(201);
    expect(data.id).toBeTruthy();

    const user = await getUserById(data.id);
    expect(user.id).toBe(data.id);
    expect(user.name).toBe(payload.name);
    expect(user.category).toBe(expectedCategory);
  });

  it("should create a user with category adult for users aged between 30-49", async () => {
    const expectedCategory = "adult";
    jest.useFakeTimers({
      now: new Date("2024-03-21T00:00:00-03:00"),
    });
    const payload = {
      name: "Fulano de Tal",
      birthDay: "1985-05-01",
    };
    const result = await createUser(payload);
    const data = await result.json();
    expect(result.status).toBe(201);
    expect(data.id).toBeTruthy();

    const user = await getUserById(data.id);
    expect(user.id).toBe(data.id);
    expect(user.name).toBe(payload.name);
    expect(user.category).toBe(expectedCategory);
  });
  it("should create a user with category senior for users aged 50+", async () => {
    const expectedCategory = "senior";
    jest.useFakeTimers({
      now: new Date("2024-03-21T00:00:00-03:00"),
    });
    const payload = {
      name: "Fulano de Tal",
      birthDay: "1950-05-01",
    };
    const result = await createUser(payload);
    const data = await result.json();
    expect(result.status).toBe(201);
    expect(data.id).toBeTruthy();

    const user = await getUserById(data.id);
    expect(user.id).toBe(data.id);
    expect(user.name).toBe(payload.name);
    expect(user.category).toBe(expectedCategory);
  });
});
