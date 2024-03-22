import {
  AfterAll,
  Then,
  When,
} from "@cucumber/cucumber";
import assert from "node:assert";

let _context = {};

AfterAll(function () {
  this.context = _context;
});

When(
  "I create a new user with the following details:",
  async function (dataTable) {
    const [data] = dataTable.hashes();

    const response = await this.createUser(data);

    assert.strictEqual(response.status, 201);

    _context.createdUserResult = await response.json();

    assert.ok(_context.createdUserResult.id);
  }
);

Then("I request the API with the user's ID", async function () {
  const user = await this.getUserById(_context.createdUserResult.id);
  _context.createdUser = user;
});

Then(
  "I should receive a JSON response with the user's details",
  async function () {
    const expectedKeys = ["id", "name", "category", "birthDay"];
    assert.deepStrictEqual(
      expectedKeys.sort(),
      Object.keys(_context.createdUser).sort()
    );
  }
);

Then(`The user's category should be {string}`, async function (category) {
  assert.strictEqual(_context.createdUser.category, category);
});
