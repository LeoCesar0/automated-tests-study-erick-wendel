import { AfterAll, Then, When } from "@cucumber/cucumber";
import assert from "node:assert";
import { USER_EXCEPTIONS } from "../src/static/exceptions.js";

let _context = {};

AfterAll(function () {
  this.context = _context;
});

When(
  "I create a young user with the following details:",
  async function (dataTable) {
    const [data] = dataTable.hashes();

    let a;

    const response = await this.createUser(data);

    assert.strictEqual(response.status, 422);

    _context.createdUserResult = await response.json();
    assert.ok(_context.createdUserResult.errorMessage);
  }
);

Then(
  "I should receive an error message that the user must be at least 18 years old",
  async function () {
    assert.equal(
      _context.createdUserResult.errorMessage,
      USER_EXCEPTIONS.AGE_INVALID
    );
  }
);
